import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/svgo";

interface OptimizeHeaderProps {
  fileName: string;
  originalSize: number;
  compressedSize: number;
  compressionRate: number;
  compressedSvg: string;
  onCopy: () => void;
  onDownload: () => void;
}

export function OptimizeHeader({
  fileName,
  originalSize,
  compressedSize,
  compressionRate,
  compressedSvg,
  onCopy,
  onDownload,
}: OptimizeHeaderProps) {
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
