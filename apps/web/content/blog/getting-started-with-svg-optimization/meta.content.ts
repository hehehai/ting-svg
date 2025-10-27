import { md, t, type Dictionary } from "intlayer";

const metaDictionary = {
  key: "blog-getting-started-with-svg-optimization",
  content: {
    slug: "getting-started-with-svg-optimization",
    datetime: "2025-01-15",
    cover:
      "https://images.unsplash.com/photo-1558403194-611308249627?w=800&h=400&fit=crop",
    detail: t({
      en: {
        title: "Getting Started with SVG Optimization",
        desc: "Learn how to optimize your SVG files for better performance and smaller file sizes",
        content: md(import("./content.en.md?raw").then((m) => m.default)),
      },
      zh: {
        title: "SVG 优化入门指南",
        desc: "学习如何优化 SVG 文件以获得更好的性能和更小的文件大小",
        content: md(import("./content.zh.md?raw").then((m) => m.default)),
      },
      ko: {
        title: "SVG 최적화 시작하기",
        desc: "더 나은 성능과 더 작은 파일 크기를 위해 SVG 파일을 최적화하는 방법을 배워보세요",
        content: md(import("./content.ko.md?raw").then((m) => m.default)),
      },
      de: {
        title: "Erste Schritte mit SVG-Optimierung",
        desc: "Erfahren Sie, wie Sie Ihre SVG-Dateien für bessere Leistung und kleinere Dateigrößen optimieren",
        content: md(import("./content.de.md?raw").then((m) => m.default)),
      },
    }),
  },
} satisfies Dictionary;

export default metaDictionary;
