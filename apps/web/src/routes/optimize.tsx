import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { CodeDiffViewerLazy } from "@/components/lazy/code-diff-viewer-lazy";
import { ConfigPanelLazy } from "@/components/lazy/config-panel-lazy";
import { CodeTabContent } from "@/components/optimize/code-tab-content";
import { OptimizeHeader } from "@/components/optimize/optimize-header";
import { SvgPreview } from "@/components/svg-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadBox } from "@/components/upload-box";
import { useAutoCompress } from "@/hooks/use-auto-compress";
import { useAutoTabSwitch } from "@/hooks/use-auto-tab-switch";
import { useCodeGeneration } from "@/hooks/use-code-generation";
import { useDragAndDrop } from "@/hooks/use-drag-and-drop";
import { usePasteHandler } from "@/hooks/use-paste-handler";
import { usePrettifiedSvg } from "@/hooks/use-prettified-svg";
import { copyToClipboard, downloadSvg, readFileAsText } from "@/lib/file-utils";
import { getComponentName } from "@/lib/svg-to-code";
import { calculateCompressionRate } from "@/lib/svgo-config";
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
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);
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
  const { generatedCodes } = useCodeGeneration(
    activeTab,
    compressedSvg,
    fileName
  );

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
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Settings Toggle Button */}
        {!originalSvg && (
          <button
            className="flex items-center justify-between border-b px-4 py-3 transition-colors hover:bg-accent md:hidden"
            onClick={() => setIsMobileSettingsOpen(!isMobileSettingsOpen)}
            type="button"
          >
            <span className="font-semibold">Settings</span>
            <span
              className={`i-hugeicons-arrow-down-01 size-5 transition-transform ${isMobileSettingsOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}

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
                  <CodeDiffViewerLazy
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

      {/* Desktop Settings Panel */}
      <div className="hidden md:block">
        <ConfigPanelLazy
          className={isCollapsed ? "w-12 border-l p-2" : "w-80 border-l p-4"}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Mobile Settings Panel */}
      {isMobileSettingsOpen && (
        <div className="border-t md:hidden">
          <ConfigPanelLazy
            className="w-full p-4"
            isCollapsed={false}
            onToggleCollapse={() => setIsMobileSettingsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
