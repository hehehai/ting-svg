import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";
import type { BlogPost } from "./blog";

export function useBlogTranslation() {
  // Get translations for each blog post using their unique keys
  const gettingStarted = useIntlayer("blog-getting-started-with-svg-optimization");
  const svgVsPng = useIntlayer("blog-svg-vs-png-when-to-use-each");
  const advancedTechniques = useIntlayer("blog-advanced-svg-techniques");
  const clientSide = useIntlayer("blog-why-client-side-processing-matters");

  const metaMap: Record<string, typeof gettingStarted> = {
    "getting-started-with-svg-optimization": gettingStarted,
    "svg-vs-png-when-to-use-each": svgVsPng,
    "advanced-svg-techniques": advancedTechniques,
    "why-client-side-processing-matters": clientSide,
  };

  return {
    translatePost: (post: BlogPost): BlogPost => {
      const meta = metaMap[post.slug];

      if (!meta) {
        return post;
      }

      // useIntlayer returns {slug, datetime, cover, detail: {...}}
      // where detail contains {title, desc, content} as React components
      // We need to render them to get the actual text
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const detail = (meta as any).detail;

      if (!detail) {
        return post;
      }

      // detail.title and detail.desc are React components from intlayer
      // We render them directly - they will be displayed as text
      return {
        slug: post.slug,
        datetime: post.datetime,
        cover: post.cover,
        title: detail.title,
        desc: detail.desc,
      };
    },

    translatePosts: (postList: BlogPost[]): BlogPost[] =>
      postList.map((post) => {
        const meta = metaMap[post.slug];
        if (!meta) {
          return post;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const detail = (meta as any).detail;

        if (!detail) {
          return post;
        }

        return {
          slug: post.slug,
          datetime: post.datetime,
          cover: post.cover,
          title: detail.title,
          desc: detail.desc,
        };
      }),

    getPostContent: (slug: string): string | null => {
      const meta = metaMap[slug];
      if (!meta) {
        console.log('[getPostContent] No meta found for slug:', slug);
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const detail = (meta as any).detail;
      if (!detail?.content) {
        console.log('[getPostContent] No detail.content found');
        return null;
      }

      // intlayer's md() function returns a string or React element
      // We need to extract the raw string for ReactMarkdown to process
      const content = detail.content;

      // intlayer's md() wraps the markdown string in an object with a 'value' property
      if (content.value && typeof content.value === 'string') {
        return content.value;
      }

      // Fallback: check if it's wrapped in a default property
      if (content.default?.value && typeof content.default.value === 'string') {
        return content.default.value;
      }

      // If content is directly a string
      if (typeof content === 'string') {
        return content;
      }

      // If it's a React element with string props.children
      if (content?.props?.children && typeof content.props.children === 'string') {
        return content.props.children;
      }

      return null;
    },
  };
}
