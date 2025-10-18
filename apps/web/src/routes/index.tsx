import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadBox } from "@/components/upload-box";
import {
  extractSvgFromBase64,
  isSvgContent,
  readFileAsText,
} from "@/lib/file-utils";
import { useSvgStore } from "@/store/svg-store";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  const { setOriginalSvg } = useSvgStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback(
    async (file: File) => {
      const content = await readFileAsText(file);
      setOriginalSvg(content, file.name);
      await navigate({ to: "/optimize" });
    },
    [setOriginalSvg, navigate]
  );

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (e.target === document.body) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) {
        return;
      }

      for (const item of items) {
        if (item.type === "text/plain") {
          item.getAsString((text) => {
            if (isSvgContent(text)) {
              setOriginalSvg(text, "pasted.svg");
              navigate({ to: "/optimize" });
            } else {
              const extracted = extractSvgFromBase64(text);
              if (extracted) {
                setOriginalSvg(extracted, "pasted.svg");
                navigate({ to: "/optimize" });
              }
            }
          });
        }
      }
    };

    document.addEventListener("dragenter", handleDragEnter);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("dragenter", handleDragEnter);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
      document.removeEventListener("paste", handlePaste);
    };
  }, [setOriginalSvg, navigate]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 font-bold text-5xl tracking-tight">
          Optimize Your SVG Files
        </h1>
        <p className="mb-8 text-muted-foreground text-xl">
          Fast, secure, and client-side SVG compression with real-time preview
        </p>
        <UploadBox
          className="mx-auto max-w-2xl"
          isHighlighted={isDragging}
          onUpload={handleFileUpload}
        />
      </section>

      <section>
        <h2 className="mb-8 text-center font-bold text-3xl">Features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <span className="i-hugeicons-flash size-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground text-sm">
                Optimize your SVG files in milliseconds with powerful SVGO
                engine running entirely in your browser
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <span className="i-hugeicons-security-lock size-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">100% Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground text-sm">
                No server uploads required. All processing happens locally in
                your browser, keeping your files private
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <span className="i-hugeicons-view size-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Real-time Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground text-sm">
                See the results instantly with side-by-side comparison and code
                diff viewer
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
