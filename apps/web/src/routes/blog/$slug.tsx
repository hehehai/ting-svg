import { compile, run } from "@mdx-js/mdx";
import { createFileRoute, notFound } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "../../components/mdx-content";
import { getBlogPost } from "../../lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPost(params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  component: BlogDetailPage,
});

// Wrapper component to pass mdxComponents to the compiled MDX
function MdxWrapper({
  Component,
}: {
  Component: React.ComponentType<{ components?: Record<string, unknown> }>;
}) {
  return <Component components={mdxComponents} />;
}

function BlogDetailPage() {
  const { post } = Route.useLoaderData();
  const [MdxComponent, setMdxComponent] = useState<any>(null);

  useEffect(() => {
    const compileMdx = async () => {
      const compiled = await compile(post.content, {
        outputFormat: "function-body",
        development: false,
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark-dimmed",
              keepBackground: true,
              defaultLang: "plaintext",
            },
          ],
        ],
      });

      const mdxModule = await run(String(compiled), {
        ...runtime,
        baseUrl: import.meta.url,
      });

      setMdxComponent(() => mdxModule.default);
    };

    compileMdx();
  }, [post.content]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Cover Image */}
        {post.metadata.cover && (
          <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
            <img
              alt=""
              className="h-[400px] w-full object-cover"
              height={400}
              src={post.metadata.cover}
              width={1200}
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-12 border-gray-200 border-b pb-8 dark:border-gray-800">
          <div className="mb-4 flex items-center gap-4">
            <time className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 font-medium text-blue-700 text-sm dark:bg-blue-900/30 dark:text-blue-300">
              <svg
                aria-hidden="true"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.metadata.datetime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="mb-6 font-bold text-5xl text-gray-900 leading-tight tracking-tight dark:text-gray-100">
            {post.metadata.title}
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed dark:text-gray-400">
            {post.metadata.desc}
          </p>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-3xl">
          {MdxComponent ? (
            <MdxWrapper Component={MdxComponent} />
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  Loading content...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mx-auto mt-16 max-w-3xl border-gray-200 border-t pt-8 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <a
              className="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              href="/blog"
            >
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
}
