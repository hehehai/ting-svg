import { md, t, type Dictionary } from "intlayer";

const metaDictionary = {
  key: "blog-why-client-side-processing-matters",
  content: {
    slug: "why-client-side-processing-matters",
    datetime: "2025-01-08",
    cover:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
    detail: t({
      en: {
        title: "Why Client-Side Processing Matters for Privacy",
        desc: "Understanding the importance of client-side SVG optimization and how it protects your data",
        content: md(import("./content.en.md?raw").then((m) => m.default)),
      },
      zh: {
        title: "为什么客户端处理对隐私很重要",
        desc: "了解客户端 SVG 优化的重要性以及它如何保护您的数据",
        content: md(import("./content.zh.md?raw").then((m) => m.default)),
      },
      ko: {
        title: "클라이언트 측 처리가 개인정보 보호에 중요한 이유",
        desc: "클라이언트 측 SVG 최적화의 중요성과 데이터 보호 방법 이해",
        content: md(import("./content.ko.md?raw").then((m) => m.default)),
      },
      de: {
        title: "Warum clientseitige Verarbeitung für den Datenschutz wichtig ist",
        desc: "Verstehen Sie die Bedeutung der clientseitigen SVG-Optimierung und wie sie Ihre Daten schützt",
        content: md(import("./content.de.md?raw").then((m) => m.default)),
      },
    }),
  },
} satisfies Dictionary;

export default metaDictionary;
