/**
 * Lazy-loaded wrapper for CodeDiffViewer
 * Monaco Editor is heavy (~500KB), so we load it on-demand
 */

import { lazy, Suspense } from "react";

const CodeDiffViewerComponent = lazy(() =>
  import("@/components/code-diff-viewer").then((mod) => ({
    default: mod.CodeDiffViewer,
  }))
);

type CodeDiffViewerProps = {
  original: string;
  modified: string;
  language?: string;
};

export function CodeDiffViewerLazy(props: CodeDiffViewerProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <div className="text-muted-foreground">Loading editor...</div>
        </div>
      }
    >
      <CodeDiffViewerComponent {...props} />
    </Suspense>
  );
}
