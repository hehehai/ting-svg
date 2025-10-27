import { type Dictionary, t } from "intlayer";

const blogContent = {
  key: "blog",
  content: {
    page: {
      title: t({
        en: "Blog",
        zh: "博客",
        ko: "블로그",
        de: "Blog",
      }),
      noPostsFound: t({
        en: "No blog posts found.",
        zh: "未找到博客文章。",
        ko: "블로그 게시물을 찾을 수 없습니다.",
        de: "Keine Blogbeiträge gefunden.",
      }),
      readMore: t({
        en: "Read more",
        zh: "阅读更多",
        ko: "더 읽기",
        de: "Mehr lesen",
      }),
      backToAllPosts: t({
        en: "Back to all posts",
        zh: "返回所有文章",
        ko: "모든 게시물로 돌아가기",
        de: "Zurück zu allen Beiträgen",
      }),
      loadingContent: t({
        en: "Loading content...",
        zh: "加载内容中...",
        ko: "콘텐츠 로드 중...",
        de: "Inhalt wird geladen...",
      }),
    },
  },
} satisfies Dictionary;

export default blogContent;
