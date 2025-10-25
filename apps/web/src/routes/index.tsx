import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadBox } from "@/components/upload-box";
import { getLatestBlogPosts } from "@/lib/blog";
import {
  extractSvgFromBase64,
  isSvgContent,
  readFileAsText,
} from "@/lib/file-utils";
import { useSvgStore } from "@/store/svg-store";

const LATEST_POSTS_COUNT = 4;

export const Route = createFileRoute("/")({
  loader: async () => {
    const latestPosts = await getLatestBlogPosts(LATEST_POSTS_COUNT);
    return { latestPosts };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  const { latestPosts } = Route.useLoaderData();
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
              } else {
                toast.error(
                  "Invalid SVG content. Please paste valid SVG code."
                );
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
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <section className="mb-12 text-center md:mb-16">
        <h1 className="mb-4 font-bold text-3xl tracking-tight md:text-5xl">
          Optimize Your SVG Files
        </h1>
        <p className="mb-6 text-base text-muted-foreground md:mb-8 md:text-xl">
          Fast, secure, and client-side SVG compression with real-time preview
        </p>
        <UploadBox
          className="mx-auto max-w-2xl"
          isHighlighted={isDragging}
          onUpload={handleFileUpload}
        />
      </section>

      <section>
        <h2 className="mb-6 text-center font-bold text-2xl md:mb-8 md:text-3xl">
          Features
        </h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Card>
            <CardHeader>
              <div className="mb-2 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3 flex items-center justify-center">
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
                <div className="rounded-full bg-primary/10 p-3 flex items-center justify-center">
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
                <div className="rounded-full bg-primary/10 p-3 flex items-center justify-center">
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

      {latestPosts.length > 0 && (
        <section className="mt-12 md:mt-16">
          <div className="mb-6 flex items-center justify-between md:mb-8">
            <h2 className="font-bold text-2xl md:text-3xl">
              Latest Blog Posts
            </h2>
            <Link
              className="text-primary text-sm hover:underline md:text-base"
              to="/blog"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {latestPosts.map((post) => (
              <Card
                className="overflow-hidden transition-shadow hover:shadow-lg"
                key={post.slug}
              >
                <Link params={{ slug: post.slug }} to="/blog/$slug">
                  {post.metadata.cover && (
                    <img
                      alt=""
                      className="h-48 w-full object-cover"
                      height={192}
                      src={post.metadata.cover}
                      width={800}
                    />
                  )}
                  <CardHeader>
                    <time className="text-muted-foreground text-sm">
                      {new Date(post.metadata.datetime).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </time>
                    <CardTitle className="mt-2">
                      {post.metadata.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {post.metadata.desc}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
