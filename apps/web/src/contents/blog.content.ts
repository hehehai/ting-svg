import { type Dictionary, t } from "intlayer";

const blogContent = {
  key: "blog",
  content: {
    backToAllPosts: t({
      en: "Back to all posts",
      zh: "返回所有文章",
      ko: "모든 게시물로 돌아가기",
      de: "Zurück zu allen Beiträgen",
    }),
    readMore: t({
      en: "Read more",
      zh: "阅读更多",
      ko: "더 읽기",
      de: "Mehr lesen",
    }),
    copy: t({
      en: "Copy",
      zh: "复制",
      ko: "복사",
      de: "Kopieren",
    }),
    copied: t({
      en: "Copied!",
      zh: "已复制！",
      ko: "복사됨!",
      de: "Kopiert!",
    }),
  },
} satisfies Dictionary;

export default blogContent;
