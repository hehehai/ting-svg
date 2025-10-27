import { md, t, type Dictionary } from "intlayer";

const metaDictionary = {
  key: "blog-svg-vs-png-when-to-use-each",
  content: {
    slug: "svg-vs-png-when-to-use-each",
    datetime: "2025-01-10",
    cover:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=400&fit=crop",
    detail: t({
      en: {
        title: "SVG vs PNG - When to Use Each Format",
        desc: "Understanding the differences between SVG and PNG formats and choosing the right one for your project",
        content: md(import("./content.en.md?raw").then((m) => m.default)),
      },
      zh: {
        title: "SVG vs PNG - 何时使用每种格式",
        desc: "了解 SVG 和 PNG 格式之间的差异,并为您的项目选择合适的格式",
        content: md(import("./content.zh.md?raw").then((m) => m.default)),
      },
      ko: {
        title: "SVG vs PNG - 각 형식을 사용해야 하는 경우",
        desc: "SVG와 PNG 형식의 차이점을 이해하고 프로젝트에 적합한 형식을 선택하세요",
        content: md(import("./content.ko.md?raw").then((m) => m.default)),
      },
      de: {
        title: "SVG vs PNG - Wann welches Format zu verwenden ist",
        desc: "Verstehen Sie die Unterschiede zwischen SVG- und PNG-Formaten und wählen Sie das richtige für Ihr Projekt",
        content: md(import("./content.de.md?raw").then((m) => m.default)),
      },
    }),
  },
} satisfies Dictionary;

export default metaDictionary;
