import { allPosts } from "content-collections";
import { sortBy } from "es-toolkit";
import { Locales } from "intlayer";

export function getBlogPosts(locale?: Locales, order: "asc" | "desc" = "asc") {
  let readyPosts = sortBy(allPosts, ["createdAt"]);
  readyPosts = order === "asc" ? readyPosts : readyPosts.reverse();

  if (!locale) {
    return readyPosts;
  }

  return allPosts.filter((post) => post._meta.locale === locale);
}

export async function getBlogPost(
  slug: string,
  locale: Locales = Locales.ENGLISH
) {
  const blogs = getBlogPosts();
  const collections = blogs.filter((blog) => blog._meta.directory === slug);
  if (!collections) {
    return null;
  }

  const content = collections.find((blog) =>
    blog._meta.fileName.includes(locale)
  );

  if (!content) {
    return null;
  }

  return content;
}

export function getLatestBlogPosts(
  limit = 4,
  locale?: Locales,
  order: "asc" | "desc" = "asc"
) {
  const posts = getBlogPosts(locale, order);
  return posts.slice(0, limit);
}
