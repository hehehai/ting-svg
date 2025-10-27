import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "@/components/intlayer/localized-link";
import { getBlogPosts } from "../../../lib/blog";
import { useBlogTranslation } from "../../../lib/blog-i18n";

export const Route = createFileRoute("/{-$locale}/blog/")({
  loader: async () => {
    const posts = await getBlogPosts();
    return { posts };
  },
  head: () => ({
    meta: [
      { title: "Blog - SVG Optimization Tips & Tutorials | Tiny SVG" },
      {
        name: "description",
        content:
          "Learn SVG optimization techniques, best practices, and tips for web performance. Free tutorials on SVG compression, conversion, and advanced techniques.",
      },
      {
        name: "keywords",
        content:
          "SVG tutorial, SVG optimization, web performance, SVG best practices, SVG tips",
      },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tiny-svg.com/blog" },
      {
        property: "og:title",
        content: "Blog - SVG Optimization Tips & Tutorials",
      },
      {
        property: "og:description",
        content:
          "Learn SVG optimization techniques, best practices, and tips for web performance.",
      },
      { property: "og:image", content: "https://tiny-svg.com/og-image.png" },
      // Twitter
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:url", content: "https://tiny-svg.com/blog" },
      {
        property: "twitter:title",
        content: "Blog - SVG Optimization Tips & Tutorials",
      },
      {
        property: "twitter:description",
        content:
          "Learn SVG optimization techniques, best practices, and tips for web performance.",
      },
      {
        property: "twitter:image",
        content: "https://tiny-svg.com/og-image.png",
      },
    ],
    links: [{ rel: "canonical", href: "https://tiny-svg.com/blog" }],
  }),
  component: BlogListPage,
});

function BlogListPage() {
  const { posts } = Route.useLoaderData();
  const { page } = useIntlayer("blog");
  const { translatePosts } = useBlogTranslation();

  const translatedPosts = translatePosts(posts);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:py-12">
      <h1 className="mb-6 font-bold text-3xl md:mb-8 md:text-4xl">
        {page.title}
      </h1>

      {translatedPosts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">{page.noPostsFound}</p>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {translatedPosts.map((post) => (
            <article
              className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg dark:border-gray-800"
              key={post.slug}
            >
              <LocalizedLink
                className="block"
                params={{
                  slug: post.slug,
                }}
                to="/blog/$slug"
              >
                {post.cover && (
                  <img
                    alt=""
                    className="h-40 w-full object-cover md:h-48"
                    height={192}
                    src={post.cover}
                    width={800}
                  />
                )}
                <div className="p-4 md:p-6">
                  <time className="text-gray-600 text-xs md:text-sm dark:text-gray-400">
                    {new Date(post.datetime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                  <h2 className="mt-2 mb-2 font-bold text-xl md:mb-3 md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 text-sm md:text-base dark:text-gray-300">
                    {post.desc}
                  </p>
                  <div className="mt-3 text-blue-600 text-sm hover:underline md:mt-4 md:text-base dark:text-blue-400">
                    {page.readMore} →
                  </div>
                </div>
              </LocalizedLink>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
