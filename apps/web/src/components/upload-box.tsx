import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useIntlayer } from "react-intlayer";
import { isSvgFile } from "@/lib/file-utils";
import { cn } from "@/lib/utils";

type UploadBoxProps = {
  onUpload: (file: File) => void;
  isHighlighted?: boolean;
  className?: string;
};

export function UploadBox({
  onUpload,
  isHighlighted = false,
  className,
}: UploadBoxProps) {
  const { upload } = useIntlayer("home");

  // 提供默认值，防止服务器端渲染错误
  const safeUpload = upload || {
    dragActive: "Drop your SVG file here",
    dragInactive: "Drag & drop your SVG file here",
    clickToBrowse: "or click to browse files",
    acceptsOnly: "Accepts .svg files only",
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && isSvgFile(file)) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/svg+xml": [".svg"],
    },
    multiple: false,
    noClick: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-all",
        isDragActive || isHighlighted
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-accent/50",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "flex items-center justify-center rounded-full p-4 transition-colors",
            isDragActive || isHighlighted ? "bg-primary/10" : "bg-accent"
          )}
        >
          <span className="i-hugeicons-upload-02 size-12 text-primary" />
        </div>
        <div className="space-y-2">
          <p className="font-medium text-lg">
            {isDragActive ? safeUpload.dragActive : safeUpload.dragInactive}
          </p>
          <p className="text-muted-foreground text-sm">
            {safeUpload.clickToBrowse}
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <span className="i-hugeicons-file-02 size-4" />
          <span>{safeUpload.acceptsOnly}</span>
        </div>
      </div>
    </div>
  );
}
