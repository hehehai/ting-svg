import { type Dictionary, t } from "intlayer";

const headerContent = {
  key: "header",
  content: {
    nav: {
      home: t({
        en: "Home",
        zh: "首页",
        ko: "홈",
        de: "Startseite",
      }),
      optimize: t({
        en: "Optimize",
        zh: "优化",
        ko: "최적화",
        de: "Optimieren",
      }),
      blog: t({
        en: "Blog",
        zh: "博客",
        ko: "블로그",
        de: "Blog",
      }),
      about: t({
        en: "About",
        zh: "关于",
        ko: "정보",
        de: "Über",
      }),
    },
  },
} satisfies Dictionary;

export default headerContent;
