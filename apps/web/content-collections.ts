import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    cover: z.url().optional(),
    datetime: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const createdAt = doc.datetime ? new Date(doc.datetime) : new Date();
    const locale = doc._meta.fileName.split(".")[0] || "en";
    const slug = doc._meta.directory.split("/").pop();

    // Format date based on locale
    const localeMap: Record<string, string> = {
      en: "en-US",
      zh: "zh-CN",
      ko: "ko-KR",
      de: "de-DE",
    };

    const formattedDate = createdAt.toLocaleDateString(
      localeMap[locale] || "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const mdx = await compileMDX(context, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "material-theme-palenight",
            transformers: [
              transformerMetaHighlight(),
              transformerMetaWordHighlight(),
              transformerNotationDiff({
                matchAlgorithm: "v3",
              }),
            ],
            onVisitLine(node: any) {
              // Prevent lines from collapsing in `display: grid` mode, and allow empty
              // lines to be copy/pasted
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
            onVisitHighlightedLine(node: any) {
              node.properties.className.push("line--highlighted");
            },
            onVisitHighlightedWord(node: any) {
              node.properties.className = ["word--highlighted"];
            },
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
      ],
    });

    return {
      ...doc,
      createdAt,
      formattedDate,
      locale,
      slug,
      mdx,
      _meta: {
        ...doc._meta,
        createdAt,
        formattedDate,
        locale,
        slug,
      },
    };
  },
});

export default defineConfig({
  collections: [posts],
});
