import { type Dictionary, t } from "intlayer";

const optimizeContent = {
  key: "optimize",
  content: {
    title: t({
      en: "Optimize SVG",
      zh: "优化 SVG",
      ko: "SVG 최적화",
      de: "SVG optimieren",
    }),
    header: {
      title: t({
        en: "Optimize SVG",
        zh: "优化 SVG",
        ko: "SVG 최적화",
        de: "SVG optimieren",
      }),
      copy: t({
        en: "Copy",
        zh: "复制",
        ko: "복사",
        de: "Kopieren",
      }),
      download: t({
        en: "Download",
        zh: "下载",
        ko: "다운로드",
        de: "Herunterladen",
      }),
    },
    buttons: {
      copy: t({
        en: "Copy",
        zh: "复制",
        ko: "복사",
        de: "Kopieren",
      }),
      download: t({
        en: "Download",
        zh: "下载",
        ko: "다운로드",
        de: "Herunterladen",
      }),
    },
    tabs: {
      original: t({
        en: "Original",
        zh: "原始",
        ko: "원본",
        de: "Original",
      }),
      optimized: t({
        en: "Optimized",
        zh: "已优化",
        ko: "최적화됨",
        de: "Optimiert",
      }),
      code: t({
        en: "Code",
        zh: "代码",
        ko: "코드",
        de: "Code",
      }),
    },
    settings: {
      title: t({
        en: "Settings",
        zh: "设置",
        ko: "설정",
        de: "Einstellungen",
      }),
      global: {
        title: t({
          en: "Global Settings",
          zh: "全局设置",
          ko: "グローバル설정",
          de: "Globale Einstellungen",
        }),
        showOriginal: t({
          en: "Show original",
          zh: "显示原始",
          ko: "원본を表示",
          de: "Original anzeigen",
        }),
        compareGzipped: t({
          en: "Compare gzipped",
          zh: "比较压缩后",
          ko: "Gzip 압축 비교",
          de: "Gzip-Komprimierung vergleichen",
        }),
        prettifyMarkup: t({
          en: "Prettify markup",
          zh: "美化标记",
          ko: "마크업 정리",
          de: "Markup verschönern",
        }),
        multipass: t({
          en: "Multipass",
          zh: "多次优化",
          ko: "다중 패스",
          de: "Mehrfachdurchlauf",
        }),
        numberPrecision: t({
          en: "Number precision",
          zh: "数字精度",
          ko: "숫자 정밀도",
          de: "Zahlenpräzision",
        }),
        transformPrecision: t({
          en: "Transform precision",
          zh: "变换精度",
          ko: "변환 정밀도",
          de: "Transformationspräzision",
        }),
      },
      features: {
        title: t({
          en: "Features",
          zh: "功能",
          ko: "기능",
          de: "Funktionen",
        }),
        resetAll: t({
          en: "Reset all",
          zh: "重置全部",
          ko: "모두 재설정",
          de: "Alle zurücksetzen",
        }),
      },
      export: {
        title: t({
          en: "Export",
          zh: "导出",
          ko: "내보내기",
          de: "Exportieren",
        }),
        png: t({
          en: "Export as PNG",
          zh: "导出为 PNG",
          ko: "PNGとして내보내기",
          de: "Als PNG exportieren",
        }),
        jpeg: t({
          en: "Export as JPEG",
          zh: "导出为 JPEG",
          ko: "JPEGとして내보내기",
          de: "Als JPEG exportieren",
        }),
      },
    },
    messages: {
      uploadSuccess: t({
        en: "SVG file uploaded successfully!",
        zh: "SVG 文件上传成功！",
        ko: "SVG 파일이 성공적으로 업로드되었습니다!",
        de: "SVG-Datei erfolgreich hochgeladen!",
      }),
      copySuccess: t({
        en: "Copied to clipboard!",
        zh: "已复制到剪贴板！",
        ko: "クリップボードに복사しました！",
        de: "In die Zwischenablage kopiert!",
      }),
      copyError: t({
        en: "Failed to copy to clipboard",
        zh: "复制到剪贴板失败",
        ko: "クリップボードへの복사に失敗しました",
        de: "Kopieren in die Zwischenablage fehlgeschlagen",
      }),
      downloadSuccess: t({
        en: "Downloaded successfully!",
        zh: "下载成功！",
        ko: "다운로드が完了しました！",
        de: "Erfolgreich heruntergeladen!",
      }),
      downloadError: t({
        en: "Failed to download file",
        zh: "下载文件失败",
        ko: "ファイルの다운로드に失敗しました",
        de: "Datei-Download fehlgeschlagen",
      }),
      exportPngSuccess: t({
        en: "Exported as PNG!",
        zh: "已导出为 PNG！",
        ko: "PNGとして내보내기しました！",
        de: "Als PNG exportiert!",
      }),
      exportJpegSuccess: t({
        en: "Exported as JPEG!",
        zh: "已导出为 JPEG！",
        ko: "JPEGとして내보내기しました！",
        de: "Als JPEG exportiert!",
      }),
      exportError: t({
        en: "Failed to export",
        zh: "导出失败",
        ko: "내보내기に失敗しました",
        de: "Export fehlgeschlagen",
      }),
      noSvgToExport: t({
        en: "No optimized SVG to export",
        zh: "没有优化的 SVG 可导出",
        ko: "내보내기する最適化されたSVGがありません",
        de: "Keine optimierte SVG zum Exportieren",
      }),
    },
    ui: {
      settings: t({
        en: "Settings",
        zh: "设置",
        ko: "설정",
        de: "Einstellungen",
      }),
      originalTab: t({
        en: "Original",
        zh: "原始",
        ko: "원본",
        de: "Original",
      }),
      optimizedTab: t({
        en: "Optimized",
        zh: "已优化",
        ko: "최적화됨",
        de: "Optimiert",
      }),
      codeTab: t({
        en: "Code",
        zh: "代码",
        ko: "코드",
        de: "Code",
      }),
      clickToCompress: t({
        en: 'Click "Compress SVG" to optimize',
        zh: '点击"压缩 SVG"进行优化',
        ko: '"SVG 압축"을 클릭하여 최적화하세요',
        de: 'Klicken Sie auf "SVG komprimieren" zum Optimieren',
      }),
      noOptimizedCode: t({
        en: "No optimized code yet",
        zh: "暂无优化代码",
        ko: "아직 최적화된 코드가 없습니다",
        de: "Noch kein optimierter Code",
      }),
    },
  },
} satisfies Dictionary;

export default optimizeContent;
