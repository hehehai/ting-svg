/**
 * Lazy-loaded wrapper for ConfigPanel
 * Large component with many dependencies
 */

import { lazy, Suspense } from "react";

const ConfigPanelComponent = lazy(() =>
  import("@/components/config-panel").then((mod) => ({
    default: mod.ConfigPanel,
  }))
);

type ConfigPanelProps = {
  className?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function ConfigPanelLazy(props: ConfigPanelProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center border-l">
          <div className="text-muted-foreground">Loading config...</div>
        </div>
      }
    >
      <ConfigPanelComponent {...props} />
    </Suspense>
  );
}
