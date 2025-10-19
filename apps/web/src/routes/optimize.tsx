import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CodeDiffViewer } from "@/components/code-diff-viewer";
import { CodeViewer } from "@/components/code-viewer";
import { ConfigPanel } from "@/components/config-panel";
import { SvgPreview } from "@/components/svg-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadBox } from "@/components/upload-box";
import {
  copyToClipboard,
  downloadSvg,
  extractSvgFromBase64,
  isSvgContent,
  prettifySvg,
  readFileAsText,
} from "@/lib/file-utils";
import type { SupportedLanguage } from "@/lib/prettify-code";
import {
  getComponentName,
  svgToFlutter,
  svgToReactJSX,
  svgToReactNative,
  svgToReactTSX,
  svgToSvelte,
  svgToVue,
} from "@/lib/svg-to-code";
import {
  buildSvgoConfig,
  calculateCompressionRate,
  compressSvg,
  formatBytes,
} from "@/lib/svgo";
import type { SvgoGlobalSettings, SvgoPluginConfig } from "@/lib/svgo-plugins";
import { useSvgStore } from "@/store/svg-store";

export const Route = createFileRoute("/optimize")({
  component: OptimizeComponent,
});

// Custom hook for drag and drop functionality
function useDragAndDrop() {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (e.target === document.body) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    document.addEventListener("dragenter", handleDragEnter);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragenter", handleDragEnter);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);

  return isDragging;
}

// Custom hook for paste functionality
function usePasteHandler(
  setOriginalSvg: (svg: string, name: string) => void,
  setHasAutoSwitchedTab: (value: boolean) => void
) {
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) {
        return;
      }

      for (const item of items) {
        if (item.type === "text/plain") {
          item.getAsString((text) => {
            if (isSvgContent(text)) {
              setOriginalSvg(text, "pasted.svg");
              setHasAutoSwitchedTab(false);
              toast.success("SVG pasted successfully!");
            } else {
              const extracted = extractSvgFromBase64(text);
              if (extracted) {
                setOriginalSvg(extracted, "pasted.svg");
                setHasAutoSwitchedTab(false);
                toast.success("SVG pasted successfully!");
              }
            }
          });
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [setOriginalSvg, setHasAutoSwitchedTab]);
}

// Custom hook for prettification
function usePrettifiedSvg(svg: string, shouldPrettify: boolean): string {
  const [prettified, setPrettified] = useState("");

  useEffect(() => {
    const prettify = async () => {
      if (shouldPrettify && svg) {
        const result = await prettifySvg(svg);
        setPrettified(result);
      } else {
        setPrettified(svg);
      }
    };
    prettify();
  }, [svg, shouldPrettify]);

  return prettified;
}

// Custom hook for code generation
function useCodeGeneration(
  activeTab: string,
  compressedSvg: string,
  fileName: string
) {
  const [generatedCodes, setGeneratedCodes] = useState<Map<string, string>>(
    new Map()
  );

  useEffect(() => {
    if (!(compressedSvg && activeTab)) {
      return;
    }

    const codeGenerators: Record<
      string,
      (svg: string, name?: string) => string
    > = {
      "react-jsx": svgToReactJSX,
      "react-tsx": svgToReactTSX,
      vue: svgToVue,
      svelte: svgToSvelte,
      "react-native": svgToReactNative,
      flutter: svgToFlutter,
    };

    if (activeTab in codeGenerators) {
      const generator = codeGenerators[activeTab];
      if (!generator) {
        return;
      }
      const code = generator(compressedSvg, fileName);
      setGeneratedCodes((prev) => new Map(prev).set(activeTab, code));
    }
  }, [activeTab, compressedSvg, fileName]);

  return generatedCodes;
}

// Custom hook for auto-compression
function useAutoCompress(
  originalSvg: string,
  plugins: SvgoPluginConfig[],
  globalSettings: SvgoGlobalSettings,
  setCompressedSvg: (svg: string) => void
) {
  const handleCompress = useCallback(() => {
    try {
      const config = buildSvgoConfig(plugins, globalSettings);
      const result = compressSvg(originalSvg, config);
      setCompressedSvg(result);
    } catch {
      toast.error("Failed to optimize SVG");
    }
  }, [originalSvg, plugins, globalSettings, setCompressedSvg]);

  useEffect(() => {
    if (originalSvg) {
      handleCompress();
    }
  }, [originalSvg, handleCompress]);
}

// Custom hook for auto tab switching
function useAutoTabSwitch(
  compressedSvg: string,
  setActiveTab: (tab: string) => void
) {
  const [hasAutoSwitchedTab, setHasAutoSwitchedTab] = useState(false);

  useEffect(() => {
    if (compressedSvg && !hasAutoSwitchedTab) {
      setActiveTab("optimized");
      setHasAutoSwitchedTab(true);
    }
  }, [compressedSvg, hasAutoSwitchedTab, setActiveTab]);

  return [hasAutoSwitchedTab, setHasAutoSwitchedTab] as const;
}

// Header component with stats and actions
function OptimizeHeader({
  fileName,
  originalSize,
  compressedSize,
  compressionRate,
  compressedSvg,
  onCopy,
  onDownload,
}: {
  fileName: string;
  originalSize: number;
  compressedSize: number;
  compressionRate: number;
  compressedSvg: string;
  onCopy: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="border-b bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Optimize SVG</h1>
          <p className="text-muted-foreground text-sm">{fileName}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right text-sm">
            <div className="text-muted-foreground">
              {formatBytes(originalSize)} → {formatBytes(compressedSize)}
            </div>
            {compressionRate > 0 && (
              <div className="font-medium text-primary">
                -{compressionRate.toFixed(1)}%
              </div>
            )}
          </div>
          <Button
            disabled={!compressedSvg}
            onClick={onCopy}
            type="button"
            variant="outline"
          >
            <span className="i-hugeicons-copy-01 mr-2 size-4" />
            Copy
          </Button>
          <Button disabled={!compressedSvg} onClick={onDownload} type="button">
            <span className="i-hugeicons-download-01 mr-2 size-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

// Code tab content component
function CodeTabContent({
  activeTab,
  generatedCodes,
  componentName,
}: {
  activeTab: string;
  generatedCodes: Map<string, string>;
  componentName: string;
}) {
  const codeTabConfig: Record<
    string,
    { ext: string; language: SupportedLanguage }
  > = {
    "react-jsx": { ext: "jsx", language: "javascript" },
    "react-tsx": { ext: "tsx", language: "typescript" },
    vue: { ext: "vue", language: "html" },
    svelte: { ext: "svelte", language: "html" },
    "react-native": { ext: "jsx", language: "javascript" },
    flutter: { ext: "dart", language: "dart" },
  };

  const config = codeTabConfig[activeTab as keyof typeof codeTabConfig];
  if (!config) {
    return null;
  }

  const code = generatedCodes.get(activeTab);
  if (!code) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Generating code...
      </div>
    );
  }

  return (
    <CodeViewer
      code={code}
      fileName={`${componentName}.${config.ext}`}
      language={config.language}
    />
  );
}

function OptimizeComponent() {
  const {
    originalSvg,
    compressedSvg,
    fileName,
    plugins,
    globalSettings,
    setOriginalSvg,
    setCompressedSvg,
  } = useSvgStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("original");

  const [_hasAutoSwitchedTab, setHasAutoSwitchedTab] = useAutoTabSwitch(
    compressedSvg,
    setActiveTab
  );

  const handleFileUpload = useCallback(
    async (file: File) => {
      const content = await readFileAsText(file);
      setOriginalSvg(content, file.name);
      setHasAutoSwitchedTab(false);
      toast.success("SVG file uploaded successfully!");
    },
    [setOriginalSvg, setHasAutoSwitchedTab]
  );

  const isDragging = useDragAndDrop();
  usePasteHandler(setOriginalSvg, setHasAutoSwitchedTab);

  const prettifiedOriginal = usePrettifiedSvg(
    originalSvg,
    globalSettings.prettifyMarkup
  );
  const prettifiedCompressed = usePrettifiedSvg(
    compressedSvg,
    globalSettings.prettifyMarkup
  );

  useAutoCompress(originalSvg, plugins, globalSettings, setCompressedSvg);

  const componentName = useMemo(() => getComponentName(fileName), [fileName]);
  const generatedCodes = useCodeGeneration(activeTab, compressedSvg, fileName);

  const handleCopy = async () => {
    try {
      await copyToClipboard(compressedSvg);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDownload = () => {
    try {
      const newFileName = fileName.replace(".svg", ".optimized.svg");
      downloadSvg(compressedSvg, newFileName);
      toast.success("Downloaded successfully!");
    } catch {
      toast.error("Failed to download file");
    }
  };

  const originalSize = originalSvg ? new Blob([originalSvg]).size : 0;
  const compressedSize = compressedSvg ? new Blob([compressedSvg]).size : 0;
  const compressionRate = originalSvg
    ? calculateCompressionRate(originalSvg, compressedSvg)
    : 0;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex flex-1 flex-col overflow-hidden">
        <OptimizeHeader
          compressedSize={compressedSize}
          compressedSvg={compressedSvg}
          compressionRate={compressionRate}
          fileName={fileName}
          onCopy={handleCopy}
          onDownload={handleDownload}
          originalSize={originalSize}
        />

        <div className="flex-1 overflow-hidden p-4">
          {originalSvg ? (
            <Tabs
              className="flex h-full flex-col"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList>
                {globalSettings.showOriginal && (
                  <TabsTrigger value="original">Original</TabsTrigger>
                )}
                <TabsTrigger value="optimized">Optimized</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="react-jsx">React JSX</TabsTrigger>
                <TabsTrigger value="react-tsx">React TSX</TabsTrigger>
                <TabsTrigger value="vue">Vue</TabsTrigger>
                <TabsTrigger value="svelte">Svelte</TabsTrigger>
                <TabsTrigger value="react-native">React Native</TabsTrigger>
                <TabsTrigger value="flutter">Flutter</TabsTrigger>
              </TabsList>

              {globalSettings.showOriginal && (
                <TabsContent
                  className="mt-0 flex-1 data-[state=active]:flex"
                  value="original"
                >
                  <SvgPreview
                    className="flex-1"
                    svg={originalSvg}
                    title="Original SVG"
                  />
                </TabsContent>
              )}

              <TabsContent
                className="mt-0 flex-1 data-[state=active]:flex"
                value="optimized"
              >
                {compressedSvg ? (
                  <SvgPreview
                    className="flex-1"
                    svg={compressedSvg}
                    title="Optimized SVG"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Click "Compress SVG" to optimize
                  </div>
                )}
              </TabsContent>

              <TabsContent className="mt-0 flex-1 overflow-hidden" value="code">
                {compressedSvg ? (
                  <CodeDiffViewer
                    language="html"
                    modified={prettifiedCompressed}
                    original={prettifiedOriginal}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No optimized code yet
                  </div>
                )}
              </TabsContent>

              {[
                "react-jsx",
                "react-tsx",
                "vue",
                "svelte",
                "react-native",
                "flutter",
              ].map((tab) => (
                <TabsContent
                  className="mt-0 flex-1 overflow-hidden"
                  key={tab}
                  value={tab}
                >
                  <CodeTabContent
                    activeTab={tab}
                    componentName={componentName}
                    generatedCodes={generatedCodes}
                  />
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="flex h-full items-center justify-center">
              <UploadBox
                className="max-w-2xl"
                isHighlighted={isDragging}
                onUpload={handleFileUpload}
              />
            </div>
          )}
        </div>
      </div>

      <ConfigPanel
        className={isCollapsed ? "w-12 border-l p-2" : "w-80 border-l p-4"}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
    </div>
  );
}
