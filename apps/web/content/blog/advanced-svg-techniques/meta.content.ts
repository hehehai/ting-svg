import { md, t, type Dictionary } from "intlayer";

const metaDictionary = {
  key: "blog-advanced-svg-techniques",
  content: {
    slug: "advanced-svg-techniques",
    datetime: "2025-01-05",
    cover:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    detail: t({
      en: {
        title: "Advanced SVG Techniques for Web Developers",
        desc: "Explore advanced SVG techniques including animations, filters, and performance optimization",
        content: md(import("./content.en.md?raw").then((m) => m.default)),
      },
      zh: {
        title: "Web 开发者的高级 SVG 技术",
        desc: "探索高级 SVG 技术，包括动画、滤镜和性能优化",
        content: md(import("./content.zh.md?raw").then((m) => m.default)),
      },
      ko: {
        title: "웹 개发자를 위한 고급 SVG 기법",
        desc: "애니메이션, 필터 및 성能 최적化를 포함한 고급 SVG 기법 탐색",
        content: md(import("./content.ko.md?raw").then((m) => m.default)),
      },
      de: {
        title: "Fortgeschrittene SVG-Techniken für Webentwickler",
        desc: "Erkunden Sie fortgeschrittene SVG-Techniken wie Animationen, Filter und Leistungsoptimierung",
        content: md(import("./content.de.md?raw").then((m) => m.default)),
      },
    }),
  },
} satisfies Dictionary;

export default metaDictionary;
