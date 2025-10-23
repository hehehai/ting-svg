// Import all blog posts explicitly using @content alias
import advancedTechniquesRaw from "@content/blog/advanced-svg-techniques.mdx?raw";
import gettingStartedRaw from "@content/blog/getting-started-with-svg-optimization.mdx?raw";
import svgVsPngRaw from "@content/blog/svg-vs-png-when-to-use-each.mdx?raw";
import clientSideRaw from "@content/blog/why-client-side-processing-matters.mdx?raw";

export type BlogMetadata = {
  title: string;
  desc: string;
  cover: string;
  datetime: string;
};

export type BlogPost = {
  slug: string;
  metadata: BlogMetadata;
  content: string;
};

// Regex for parsing frontmatter
const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;

// Simple frontmatter parser that works in browser
function parseFrontmatter(content: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = content.match(FRONTMATTER_REGEX);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatter, mdxContent] = match;
  const data: Record<string, string> = {};

  // Parse YAML-like frontmatter
  const lines = frontmatter?.split("\n") || [];
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      data[key] = value;
    }
  }

  return { data, content: mdxContent || "" };
}

// Map of slug to raw MDX content
const BLOG_CONTENT: Record<string, string> = {
  "getting-started-with-svg-optimization": gettingStartedRaw,
  "svg-vs-png-when-to-use-each": svgVsPngRaw,
  "advanced-svg-techniques": advancedTechniquesRaw,
  "why-client-side-processing-matters": clientSideRaw,
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = Object.entries(BLOG_CONTENT).map(([slug, content]) => {
    const { data, content: mdxContent } = parseFrontmatter(content);
    return {
      slug,
      metadata: data as unknown as BlogMetadata,
      content: mdxContent,
    };
  });

  // Sort by datetime descending
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.datetime).getTime() -
      new Date(a.metadata.datetime).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const content = BLOG_CONTENT[slug];
  if (!content) {
    return null;
  }

  const { data, content: mdxContent } = parseFrontmatter(content);
  return {
    slug,
    metadata: data as unknown as BlogMetadata,
    content: mdxContent,
  };
}

export async function getLatestBlogPosts(limit = 4): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.slice(0, limit);
}
