import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/file-utils";
import type { SupportedLanguage } from "@/lib/worker-utils/prettier-worker-client";
import { prettierWorkerClient } from "@/lib/worker-utils/prettier-worker-client";
import { useTheme } from "./theme-provider";

type CodeViewerProps = {
  code: string;
  language: SupportedLanguage;
  fileName: string;
};

export function CodeViewer({ code, language, fileName }: CodeViewerProps) {
  const { theme, systemTheme } = useTheme();
  const [displayCode, setDisplayCode] = useState(code);
  const [isPrettified, setIsPrettified] = useState(false);

  // Calculate resolved theme (handle "system" theme)
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  // Update displayCode when code prop changes
  useEffect(() => {
    setDisplayCode(code);
    setIsPrettified(false);
  }, [code]);

  const handlePrettify = async () => {
    try {
      const prettified = await prettierWorkerClient.format(
        displayCode,
        language
      );
      setDisplayCode(prettified);
      setIsPrettified(true);
      toast.success("Code formatted successfully!");
    } catch (_error) {
      toast.error("Failed to format code");
    }
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(displayCode);
      toast.success("Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([displayCode], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${fileName}`);
    } catch {
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="relative h-full">
      {/* Action buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          disabled={isPrettified}
          onClick={handlePrettify}
          size="sm"
          type="button"
          variant="outline"
        >
          <span className="i-hugeicons-magic-wand-01 mr-2 size-4" />
          Prettify
        </Button>
        <Button onClick={handleCopy} size="sm" type="button" variant="outline">
          <span className="i-hugeicons-copy-01 mr-2 size-4" />
          Copy
        </Button>
        <Button
          onClick={handleDownload}
          size="sm"
          type="button"
          variant="outline"
        >
          <span className="i-hugeicons-download-01 mr-2 size-4" />
          Download
        </Button>
      </div>

      {/* Monaco Editor */}
      <div className="h-full overflow-hidden rounded-lg border">
        <Editor
          language={language}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 12,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            wrappingIndent: "indent",
          }}
          theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
          value={displayCode}
        />
      </div>
    </div>
  );
}
