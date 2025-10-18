import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { CodeDiffViewer } from "@/components/code-diff-viewer";
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
import {
  buildSvgoConfig,
  calculateCompressionRate,
  compressSvg,
  formatBytes,
} from "@/lib/svgo";
import { useSvgStore } from "@/store/svg-store";

export const Route = createFileRoute("/optimize")({
  component: OptimizeComponent,
});

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
  const [prettifiedOriginal, setPrettifiedOriginal] = useState("");
  const [prettifiedCompressed, setPrettifiedCompressed] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [hasAutoSwitchedTab, setHasAutoSwitchedTab] = useState(false);

  const handleFileUpload = useCallback(
    async (file: File) => {
      const content = await readFileAsText(file);
      setOriginalSvg(content, file.name);
      setHasAutoSwitchedTab(false);
      toast.success("SVG file uploaded successfully!");
    },
    [setOriginalSvg]
  );

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

    document.addEventListener("dragenter", handleDragEnter);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("dragenter", handleDragEnter);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
      document.removeEventListener("paste", handlePaste);
    };
  }, [setOriginalSvg]);

  useEffect(() => {
    const prettify = async () => {
      if (globalSettings.prettifyMarkup && originalSvg) {
        const prettified = await prettifySvg(originalSvg);
        setPrettifiedOriginal(prettified);
      } else {
        setPrettifiedOriginal(originalSvg);
      }
    };
    prettify();
  }, [originalSvg, globalSettings.prettifyMarkup]);

  useEffect(() => {
    const prettify = async () => {
      if (globalSettings.prettifyMarkup && compressedSvg) {
        const prettified = await prettifySvg(compressedSvg);
        setPrettifiedCompressed(prettified);
      } else {
        setPrettifiedCompressed(compressedSvg);
      }
    };
    prettify();
  }, [compressedSvg, globalSettings.prettifyMarkup]);

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

  useEffect(() => {
    if (compressedSvg && !hasAutoSwitchedTab) {
      setActiveTab("optimized");
      setHasAutoSwitchedTab(true);
    }
  }, [compressedSvg, hasAutoSwitchedTab]);

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
                onClick={handleCopy}
                type="button"
                variant="outline"
              >
                <span className="i-hugeicons-copy-01 mr-2 size-4" />
                Copy
              </Button>
              <Button
                disabled={!compressedSvg}
                onClick={handleDownload}
                type="button"
              >
                <span className="i-hugeicons-download-01 mr-2 size-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

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
