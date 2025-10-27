import { DiffEditor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

type CodeDiffViewerProps = {
  original: string;
  modified: string;
  language?: string;
};

// Debounce delay for content updates (in milliseconds)
const DEBOUNCE_DELAY = 150;

export function CodeDiffViewer({
  original,
  modified,
  language = "html",
}: CodeDiffViewerProps) {
  const { theme, systemTheme } = useTheme();
  const [debouncedContent, setDebouncedContent] = useState({
    original,
    modified,
  });
  const updateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<editor.IStandaloneDiffEditor | null>(null);

  // Calculate resolved theme (handle "system" theme)
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  // Debounce content updates
  useEffect(() => {
    if (updateTimerRef.current) {
      clearTimeout(updateTimerRef.current);
    }

    updateTimerRef.current = setTimeout(() => {
      setDebouncedContent({ original, modified });
    }, DEBOUNCE_DELAY);

    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current);
      }
    };
  }, [original, modified]);

  // Handle editor mount
  const handleEditorDidMount = (
    editorInstance: editor.IStandaloneDiffEditor
  ) => {
    editorRef.current = editorInstance;
  };

  // Cleanup on unmount
  useEffect(
    () => () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    },
    []
  );

  return (
    <div className="h-full overflow-hidden rounded-lg border">
      <DiffEditor
        language={language}
        modified={debouncedContent.modified}
        onMount={handleEditorDidMount}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 12,
          lineNumbers: "on",
          renderSideBySide: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        original={debouncedContent.original}
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
      />
    </div>
  );
}
