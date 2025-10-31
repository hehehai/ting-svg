import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { Locales } from "intlayer";
import { useCallback, useEffect, useState } from "react";
import { useIntlayer } from "react-intlayer";
import { toast } from "sonner";
import { LocalizedLink } from "@/components/intlayer/localized-link";
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

export const Route = createFileRoute("/{-$locale}/")({
  loader: async ({ params }) => {
    const latestPosts = getLatestBlogPosts(
      LATEST_POSTS_COUNT,
      params.locale as Locales,
      "desc"
    );
    return { latestPosts };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  const { latestPosts } = Route.useLoaderData();
  const { setOriginalSvg } = useSvgStore();
  const [isDragging, setIsDragging] = useState(false);
  const { hero, features, blog, messages } = useIntlayer("home");

  const handleFileUpload = useCallback(
    async (file: File) => {
      const content = await readFileAsText(file);
      setOriginalSvg(content, file.name);
      await navigate({ to: "/{-$locale}/optimize" });
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
              navigate({ to: "/{-$locale}/optimize" });
            } else {
              const extracted = extractSvgFromBase64(text);
              if (extracted) {
                setOriginalSvg(extracted, "pasted.svg");
                navigate({ to: "/{-$locale}/optimize" });
              } else {
                toast.error(messages.invalidSvgContent);
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
  }, [setOriginalSvg, navigate, messages.invalidSvgContent]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <section className="mb-12 text-center md:mb-16">
        <h1 className="mb-4 font-bold text-3xl tracking-tight md:text-5xl">
          {hero.title}
        </h1>
        <p className="mb-6 text-base text-muted-foreground md:mb-8 md:text-xl">
          {hero.subtitle}
        </p>
        <UploadBox
          className="mx-auto max-w-2xl"
          isHighlighted={isDragging}
          onUpload={handleFileUpload}
        />
      </section>

      <section>
        <h2 className="mb-6 text-center font-bold text-2xl md:mb-8 md:text-3xl">
          {features.title}
        </h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Card>
            <CardHeader>
              <div className="mb-2 flex justify-center">
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                  <span className="i-hugeicons-flash size-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">
                {features.fast.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground text-sm">
                {features.fast.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex justify-center">
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                  <span className="i-hugeicons-security-lock size-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">
                {features.secure.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground text-sm">
                {features.secure.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex justify-center">
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                  <span className="i-hugeicons-view size-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">
                {features.preview.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground text-sm">
                {features.preview.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="mt-12 md:mt-16">
          <div className="mb-6 flex items-center justify-between md:mb-8">
            <h2 className="font-bold text-2xl md:text-3xl">{blog.title}</h2>
            <LocalizedLink
              className="text-primary text-sm hover:underline md:text-base"
              to="/blog"
            >
              {blog.viewAll} →
            </LocalizedLink>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {latestPosts.map((post) => (
              <Card
                className="overflow-hidden p-0 transition-shadow hover:shadow-lg"
                key={post.slug}
              >
                <LocalizedLink
                  className="block"
                  params={{ slug: post.slug }}
                  to="/blog/$slug"
                >
                  {post.cover && (
                    <img
                      alt=""
                      className="h-48 w-full object-cover"
                      height={192}
                      src={post.cover}
                      width={800}
                    />
                  )}
                  <CardHeader className="pt-2">
                    <time className="text-muted-foreground text-sm">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <CardTitle className="mt-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 py-3">
                    <p className="text-muted-foreground text-sm">{post.desc}</p>
                  </CardContent>
                </LocalizedLink>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
