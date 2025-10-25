import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    hero: {
      title: t({
        en: "Optimize Your SVG Files",
        zh: "优化您的 SVG 文件",
        ko: "SVG 파일 최적화",
        de: "Optimieren Sie Ihre SVG-Dateien",
      }),
      subtitle: t({
        en: "Fast, secure, and client-side SVG compression with real-time preview",
        zh: "快速、安全的客户端 SVG 压缩，实时预览",
        ko: "빠르고 안전한 클라이언트 측 SVG 압축 및 실시간 미리보기",
        de: "Schnelle, sichere clientseitige SVG-Komprimierung mit Echtzeitvorschau",
      }),
    },
    features: {
      title: t({
        en: "Features",
        zh: "功能特性",
        ko: "기능",
        de: "Funktionen",
      }),
      fast: {
        title: t({
          en: "Lightning Fast",
          zh: "极速处理",
          ko: "초고속",
          de: "Blitzschnell",
        }),
        description: t({
          en: "Optimize your SVG files in milliseconds with powerful SVGO engine running entirely in your browser",
          zh: "使用强大的 SVGO 引擎在浏览器中以毫秒级速度优化您的 SVG 文件",
          ko: "브라우저에서 완전히 실행되는 강력한 SVGO 엔진으로 밀리초 단위로 SVG 파일을 최적화하세요",
          de: "Optimieren Sie Ihre SVG-Dateien in Millisekunden mit der leistungsstarken SVGO-Engine, die vollständig in Ihrem Browser läuft",
        }),
      },
      secure: {
        title: t({
          en: "100% Secure",
          zh: "100% 安全",
          ko: "100% 안전",
          de: "100% Sicher",
        }),
        description: t({
          en: "No server uploads required. All processing happens locally in your browser, keeping your files private",
          zh: "无需上传到服务器。所有处理都在您的浏览器本地进行，保护您的文件隐私",
          ko: "서버 업로드가 필요 없습니다. 모든 처리는 브라우저 내에서 로컬로 이루어져 파일의 개인정보를 보호합니다",
          de: "Keine Server-Uploads erforderlich. Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser und schützt Ihre Dateien",
        }),
      },
      preview: {
        title: t({
          en: "Real-time Preview",
          zh: "实时预览",
          ko: "실시간 미리보기",
          de: "Echtzeitvorschau",
        }),
        description: t({
          en: "See the results instantly with side-by-side comparison and code diff viewer",
          zh: "通过并排比较和代码差异查看器即时查看结果",
          ko: "나란히 비교 및 코드 차이 뷰어로 즉시 결과 확인",
          de: "Sehen Sie die Ergebnisse sofort mit Seite-an-Seite-Vergleich und Code-Diff-Viewer",
        }),
      },
    },
    blog: {
      title: t({
        en: "Latest Blog Posts",
        zh: "最新博客文章",
        ko: "최신 블로그 게시물",
        de: "Neueste Blogbeiträge",
      }),
      viewAll: t({
        en: "View all",
        zh: "查看全部",
        ko: "모두 보기",
        de: "Alle anzeigen",
      }),
    },
  },
} satisfies Dictionary;

export default homeContent;
