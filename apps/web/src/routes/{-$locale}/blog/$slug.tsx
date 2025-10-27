import { createFileRoute, notFound } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LocalizedLink } from "@/components/intlayer/localized-link";
import { getBlogPost } from "../../../lib/blog";
import { useBlogTranslation } from "../../../lib/blog-i18n";

export const Route = createFileRoute("/{-$locale}/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPost(params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) {
      return {};
    }

    const { post } = loaderData;
    const url = `https://tiny-svg.com/blog/${post.slug}`;
    const imageUrl = post.cover || "https://tiny-svg.com/og-image.png";

    // Use generic title/desc for SEO since we can't use hooks in head
    // The actual translated title will be shown in the page
    const title = post.slug.split("-").map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");

    return {
      meta: [
        { title: `${title} | Tiny SVG Blog` },
        { name: "description", content: "Learn about SVG optimization techniques and best practices" },
        {
          name: "keywords",
          content:
            "SVG optimization, SVG tutorial, web performance, SVG best practices",
        },
        // Open Graph
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:title", content: title },
        { property: "og:description", content: "Learn about SVG optimization techniques and best practices" },
        { property: "og:image", content: imageUrl },
        { property: "article:published_time", content: post.datetime },
        { property: "article:author", content: "Tiny SVG Team" },
        // Twitter
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: url },
        { property: "twitter:title", content: title },
        { property: "twitter:description", content: "Learn about SVG optimization techniques and best practices" },
        { property: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { post } = Route.useLoaderData();
  const { page } = useIntlayer("blog");
  const { translatePost, getPostContent } = useBlogTranslation();

  const translatedPost = translatePost(post);
  const markdownContent = getPostContent(post.slug);

  // Structured Data for blog post
  // Use slug-based title for structured data since translatedPost contains React components
  const title = post.slug.split("-").map((word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: "Learn about SVG optimization techniques and best practices",
    image: translatedPost.cover || "https://tiny-svg.com/og-image.png",
    datePublished: translatedPost.datetime,
    dateModified: translatedPost.datetime,
    author: {
      "@type": "Organization",
      name: "Tiny SVG Team",
      url: "https://tiny-svg.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Tiny SVG",
      logo: {
        "@type": "ImageObject",
        url: "https://tiny-svg.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tiny-svg.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Structured Data */}
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />

      <article className="mx-auto w-full max-w-full px-4 py-8 md:max-w-4xl md:py-12">
        {/* Cover Image */}
        {translatedPost.cover && (
          <div className="mb-8 overflow-hidden rounded-xl shadow-2xl md:mb-12 md:rounded-2xl">
            <img
              alt=""
              className="h-[200px] w-full object-cover md:h-[400px]"
              height={400}
              src={translatedPost.cover}
              width={1200}
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8 border-gray-200 border-b pb-6 md:mb-12 md:pb-8 dark:border-gray-800">
          <div className="mb-3 flex items-center gap-4 md:mb-4">
            <time className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 text-xs md:px-4 md:py-1.5 md:text-sm dark:bg-blue-900/30 dark:text-blue-300">
              <svg
                aria-hidden="true"
                className="size-3 md:size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <title>Calendar icon</title>
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(translatedPost.datetime).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
          </div>
          <h1 className="mb-4 font-bold text-3xl text-gray-900 leading-tight tracking-tight md:mb-6 md:text-5xl dark:text-gray-100">
            {translatedPost.title}
          </h1>
          <p className="text-base text-gray-600 leading-relaxed md:text-xl dark:text-gray-400">
            {translatedPost.desc}
          </p>
        </header>

        {/* Content */}
        <div className="blog-content prose prose-lg mx-auto w-full max-w-full overflow-x-hidden md:max-w-3xl dark:prose-invert">
          {markdownContent ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  {page.loadingContent}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mx-auto mt-12 w-full max-w-full border-gray-200 border-t pt-6 md:mt-16 md:max-w-3xl md:pt-8 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <LocalizedLink
              className="inline-flex items-center gap-2 text-gray-600 text-sm transition-colors hover:text-blue-600 md:text-base dark:text-gray-400 dark:hover:text-blue-400"
              to="/blog"
            >
              <svg
                aria-hidden="true"
                className="size-4 md:size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <title>Back arrow</title>
                <path d="M15 19l-7-7 7-7" />
              </svg>
              {page.backToAllPosts}
            </LocalizedLink>
          </div>
        </footer>
      </article>
    </div>
  );
}
