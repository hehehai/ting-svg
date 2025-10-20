import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
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

type BackgroundStyle =
  | "transparent-light"
  | "transparent-dark"
  | "solid-light"
  | "solid-dark";

const BACKGROUND_STYLES: Record<
  BackgroundStyle,
  { label: string; className: string; icon: string }
> = {
  "transparent-light": {
    label: "Transparent Light",
    className:
      "bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%,transparent_75%,#f0f0f0_75%,#f0f0f0),linear-gradient(45deg,#f0f0f0_25%,transparent_25%,transparent_75%,#f0f0f0_75%,#f0f0f0)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]",
    icon: "i-hugeicons-grid",
  },
  "transparent-dark": {
    label: "Transparent Dark",
    className:
      "bg-[linear-gradient(45deg,#333_25%,transparent_25%,transparent_75%,#333_75%,#333),linear-gradient(45deg,#333_25%,transparent_25%,transparent_75%,#333_75%,#333)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] bg-gray-900",
    icon: "i-hugeicons-grid",
  },
  "solid-light": {
    label: "Solid Light",
    className: "bg-white",
    icon: "i-hugeicons-sun-03",
  },
  "solid-dark": {
    label: "Solid Dark",
    className: "bg-gray-900",
    icon: "i-hugeicons-moon-02",
  },
};

export function SvgPreview({ svg, title, className }: SvgPreviewProps) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [backgroundStyle, setBackgroundStyle] =
    useLocalStorage<BackgroundStyle>(
      "svg-preview-background",
      "transparent-light"
    );

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const handleZoomReset = () => {
    setZoom(DEFAULT_ZOOM);
  };

  const cycleBackground = () => {
    const styles: BackgroundStyle[] = [
      "transparent-light",
      "transparent-dark",
      "solid-light",
      "solid-dark",
    ];
    const currentIndex = styles.indexOf(backgroundStyle);
    const nextIndex = (currentIndex + 1) % styles.length;
    setBackgroundStyle(styles[nextIndex]);
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
            onClick={cycleBackground}
            size="sm"
            title={BACKGROUND_STYLES[backgroundStyle].label}
            type="button"
            variant="outline"
          >
            <i
              className={cn(BACKGROUND_STYLES[backgroundStyle].icon, "size-4")}
            />
          </Button>
          <div className="mx-1 h-4 w-px bg-border" />
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
      <div
        className={cn(
          "flex-1 overflow-auto p-4",
          BACKGROUND_STYLES[backgroundStyle].className
        )}
      >
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
