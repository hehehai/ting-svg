import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SvgPreviewProps = {
  svg: string;
  title: string;
  className?: string;
};

const DEFAULT_ZOOM = 100;
const MAX_ZOOM = 200;
const MIN_ZOOM = 10;
const ZOOM_STEP = 10;
const ZOOM_SCALE_DIVISOR = 100;

export function SvgPreview({ svg, title, className }: SvgPreviewProps) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const handleZoomReset = () => {
    setZoom(DEFAULT_ZOOM);
  };

  if (!svg) {
    return (
      <div className={cn("flex h-full flex-col", className)}>
        <div className="flex items-center justify-between border-b p-2">
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          No SVG to preview
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex items-center justify-between border-b bg-muted/30 p-2">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex items-center gap-1">
          <Button
            disabled={zoom <= MIN_ZOOM}
            onClick={handleZoomOut}
            size="sm"
            title="Zoom out"
            type="button"
            variant="outline"
          >
            <i className="i-hugeicons-zoom-out size-4" />
          </Button>
          <span className="min-w-12 px-2 text-center text-muted-foreground text-xs">
            {zoom}%
          </span>
          <Button
            disabled={zoom >= MAX_ZOOM}
            onClick={handleZoomIn}
            size="sm"
            title="Zoom in"
            type="button"
            variant="outline"
          >
            <i className="i-hugeicons-zoom-in size-4" />
          </Button>
          <Button
            onClick={handleZoomReset}
            size="sm"
            title="Reset zoom"
            type="button"
            variant="outline"
          >
            <i className="i-hugeicons-reset size-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-muted/30 p-4">
        <div className="flex min-h-full items-center justify-center">
          <div
            className="origin-center transition-transform"
            dangerouslySetInnerHTML={{ __html: svg }}
            style={{ transform: `scale(${zoom / ZOOM_SCALE_DIVISOR})` }}
          />
        </div>
      </div>
    </div>
  );
}
