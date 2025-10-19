/**
 * Lazy-loaded wrapper for CodeViewer
 * Monaco Editor is heavy (~500KB), so we load it on-demand
 */

import { lazy, Suspense } from "react";

const CodeViewerComponent = lazy(() =>
  import("@/components/code-viewer").then((mod) => ({
    default: mod.CodeViewer,
  }))
);

type SupportedLanguage = "javascript" | "typescript" | "html" | "dart";

type CodeViewerProps = {
  code: string;
  language: SupportedLanguage;
  fileName: string;
};

export function CodeViewerLazy(props: CodeViewerProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <div className="text-muted-foreground">Loading editor...</div>
        </div>
      }
    >
      <CodeViewerComponent {...props} />
    </Suspense>
  );
}
