import { type Dictionary, t } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      en: "About Tiny SVG",
      zh: "关于 Tiny SVG",
      ko: "Tiny SVG 소개",
      de: "Über Tiny SVG",
    }),
    whatIsSection: {
      title: t({
        en: "What is Tiny SVG?",
        zh: "什么是 Tiny SVG？",
        ko: "Tiny SVG란 무엇인가요?",
        de: "Was ist Tiny SVG?",
      }),
      description: t({
        en: "Tiny SVG is a powerful web-based SVG optimization tool that helps you compress and optimize your SVG files without any backend service. All processing happens right in your browser, ensuring your files remain private and secure.",
        zh: "Tiny SVG 是一个强大的基于 Web 的 SVG 优化工具，可帮助您在无需任何后端服务的情况下压缩和优化 SVG 文件。所有处理都在您的浏览器中进行，确保您的文件保持私密和安全。",
        ko: "Tiny SVG는 백엔드 서비스 없이 SVG 파일을 압축하고 최적화할 수 있는 강력한 웹 기반 SVG 최적화 도구입니다. 모든 처리는 브라우저에서 바로 이루어지므로 파일이 비공개로 안전하게 유지됩니다.",
        de: "Tiny SVG ist ein leistungsstarkes webbasiertes SVG-Optimierungstool, das Ihnen hilft, Ihre SVG-Dateien ohne Backend-Service zu komprimieren und zu optimieren. Die gesamte Verarbeitung erfolgt direkt in Ihrem Browser, sodass Ihre Dateien privat und sicher bleiben.",
      }),
    },
    featuresSection: {
      title: t({
        en: "Features",
        zh: "功能特性",
        ko: "기능",
        de: "Funktionen",
      }),
      items: {
        compression: t({
          en: "Fast and efficient SVG compression using SVGO",
          zh: "使用 SVGO 进行快速高效的 SVG 压缩",
          ko: "SVGO를 사용한 빠르고 효율적인 SVG 압축",
          de: "Schnelle und effiziente SVG-Komprimierung mit SVGO",
        }),
        preview: t({
          en: "Real-time preview of original and optimized SVG",
          zh: "原始和优化后的 SVG 实时预览",
          ko: "원본 및 최적화된 SVG의 실시간 미리보기",
          de: "Echtzeitvorschau von Original- und optimierter SVG",
        }),
        customizable: t({
          en: "Fully customizable optimization settings",
          zh: "完全可自定义的优化设置",
          ko: "완전히 맞춤 설정 가능한 최적화 설정",
          de: "Vollständig anpassbare Optimierungseinstellungen",
        }),
        noServer: t({
          en: "No server required - all processing done in browser",
          zh: "无需服务器 - 所有处理均在浏览器中完成",
          ko: "서버 불필요 - 모든 처리가 브라우저에서 완료됨",
          de: "Kein Server erforderlich - alle Verarbeitung im Browser",
        }),
        dragDrop: t({
          en: "Drag and drop support",
          zh: "支持拖放操作",
          ko: "드래그 앤 드롭 지원",
          de: "Drag & Drop-Unterstützung",
        }),
        codeDiff: t({
          en: "Code diff viewer for before/after comparison",
          zh: "代码差异查看器，用于前后对比",
          ko: "전후 비교를 위한 코드 차이 뷰어",
          de: "Code-Diff-Viewer für Vorher/Nachher-Vergleich",
        }),
      },
    },
    authorSection: {
      title: t({
        en: "Author",
        zh: "作者",
        ko: "작성자",
        de: "Autor",
      }),
      createdBy: t({
        en: "Created by",
        zh: "作者",
        ko: "제작자",
        de: "Erstellt von",
      }),
    },
    dependenciesSection: {
      title: t({
        en: "Third-Party Dependencies",
        zh: "第三方依赖",
        ko: "타사 종속성",
        de: "Drittanbieter-Abhängigkeiten",
      }),
      description: t({
        en: "This project is built with amazing open source libraries:",
        zh: "本项目使用了以下优秀的开源库构建：",
        ko: "이 프로젝트는 놀라운 오픈 소스 라이브러리로 구축되었습니다:",
        de: "Dieses Projekt wurde mit erstaunlichen Open-Source-Bibliotheken erstellt:",
      }),
      libraries: {
        svgo: t({
          en: "SVGO - SVG optimization library",
          zh: "SVGO - SVG 优化库",
          ko: "SVGO - SVG 최적화 라이브러리",
          de: "SVGO - SVG-Optimierungsbibliothek",
        }),
        router: t({
          en: "TanStack Router - Type-safe routing",
          zh: "TanStack Router - 类型安全的路由",
          ko: "TanStack Router - 타입 안전 라우팅",
          de: "TanStack Router - Typsicheres Routing",
        }),
        start: t({
          en: "TanStack Start - Full-stack React framework",
          zh: "TanStack Start - 全栈 React 框架",
          ko: "TanStack Start - 풀스택 React 프레임워크",
          de: "TanStack Start - Full-Stack React Framework",
        }),
        react: t({
          en: "React - UI library",
          zh: "React - UI 库",
          ko: "React - UI 라이브러리",
          de: "React - UI-Bibliothek",
        }),
        intlayer: t({
          en: "Intlayer - Type-safe i18n library",
          zh: "Intlayer - 类型安全的国际化库",
          ko: "Intlayer - 타입 안전 국제화 라이브러리",
          de: "Intlayer - Typsichere i18n-Bibliothek",
        }),
        radix: t({
          en: "Radix UI - Accessible component primitives",
          zh: "Radix UI - 无障碍组件基础库",
          ko: "Radix UI - 접근 가능한 컴포넌트 프리미티브",
          de: "Radix UI - Barrierefreie Komponenten-Primitiven",
        }),
        monaco: t({
          en: "Monaco Editor - Code editor",
          zh: "Monaco Editor - 代码编辑器",
          ko: "Monaco Editor - 코드 편집기",
          de: "Monaco Editor - Code-Editor",
        }),
        prettier: t({
          en: "Prettier - Code formatter",
          zh: "Prettier - 代码格式化工具",
          ko: "Prettier - 코드 포맷터",
          de: "Prettier - Code-Formatierer",
        }),
        tailwind: t({
          en: "Tailwind CSS - Utility-first CSS framework",
          zh: "Tailwind CSS - 实用优先的 CSS 框架",
          ko: "Tailwind CSS - 유틸리티 우선 CSS 프레임워크",
          de: "Tailwind CSS - Utility-First-CSS-Framework",
        }),
        biome: t({
          en: "Biome - Fast linter and formatter",
          zh: "Biome - 快速的代码检查和格式化工具",
          ko: "Biome - 빠른 린터 및 포맷터",
          de: "Biome - Schneller Linter und Formatierer",
        }),
        vite: t({
          en: "Vite - Build tool",
          zh: "Vite - 构建工具",
          ko: "Vite - 빌드 도구",
          de: "Vite - Build-Tool",
        }),
      },
    },
    openSourceSection: {
      title: t({
        en: "Open Source",
        zh: "开源",
        ko: "오픈 소스",
        de: "Open Source",
      }),
      description: t({
        en: "This project is open source and available on GitHub.",
        zh: "本项目是开源的，可在 GitHub 上获取。",
        ko: "이 프로젝트는 오픈 소스이며 GitHub에서 사용할 수 있습니다.",
        de: "Dieses Projekt ist Open Source und auf GitHub verfügbar.",
      }),
      viewOnGitHub: t({
        en: "View on GitHub",
        zh: "在 GitHub 上查看",
        ko: "GitHub에서 보기",
        de: "Auf GitHub ansehen",
      }),
    },
  },
} satisfies Dictionary;

export default aboutContent;
