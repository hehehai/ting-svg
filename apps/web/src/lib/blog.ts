// Import meta.content.ts files for each blog post
import type { ReactNode } from "react";
import advancedTechniquesMeta from "@content/blog/advanced-svg-techniques/meta.content";
import gettingStartedMeta from "@content/blog/getting-started-with-svg-optimization/meta.content";
import svgVsPngMeta from "@content/blog/svg-vs-png-when-to-use-each/meta.content";
import clientSideMeta from "@content/blog/why-client-side-processing-matters/meta.content";

export type BlogDetailTranslation = {
  title: string;
  desc: string;
  content: string;
};

export type BlogMetadata = {
  slug: string;
  datetime: string;
  cover: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail: any;
};

export type BlogPost = {
  slug: string;
  datetime: string;
  cover: string;
  title: string | ReactNode;
  desc: string | ReactNode;
  content?: string;
};

// Map of slug to meta.content.ts content
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BLOG_META: Record<string, any> = {
  "getting-started-with-svg-optimization": gettingStartedMeta.content,
  "svg-vs-png-when-to-use-each": svgVsPngMeta.content,
  "advanced-svg-techniques": advancedTechniquesMeta.content,
  "why-client-side-processing-matters": clientSideMeta.content,
};

export function getBlogMeta(slug: string): BlogMetadata | null {
  return BLOG_META[slug] ?? null;
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(BLOG_META);
}

export function getBlogPosts(): BlogPost[] {
  const posts = Object.values(BLOG_META).map((meta) => ({
    slug: meta.slug,
    datetime: meta.datetime,
    cover: meta.cover,
    title: "", // Will be filled by intlayer at runtime
    desc: "", // Will be filled by intlayer at runtime
  }));

  // Sort by datetime descending
  return posts.sort(
    (a, b) =>
      new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | null {
  const meta = BLOG_META[slug];
  if (!meta) {
    return null;
  }

  return {
    slug: meta.slug,
    datetime: meta.datetime,
    cover: meta.cover,
    title: "", // Will be filled by intlayer at runtime
    desc: "", // Will be filled by intlayer at runtime
  };
}

export function getLatestBlogPosts(limit = 4): BlogPost[] {
  const posts = getBlogPosts();
  return posts.slice(0, limit);
}
