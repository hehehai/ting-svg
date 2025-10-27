export type SvgoPluginConfig = {
  name: string;
  enabled: boolean;
  params?: Record<string, unknown>;
};

export type SvgoGlobalSettings = {
  showOriginal: boolean;
  compareGzipped: boolean;
  prettifyMarkup: boolean;
  multipass: boolean;
  floatPrecision: number;
  transformPrecision: number;
};

export const defaultGlobalSettings: SvgoGlobalSettings = {
  showOriginal: false,
  compareGzipped: false,
  prettifyMarkup: true,
  multipass: true,
  floatPrecision: 2,
  transformPrecision: 4,
};

export const allSvgoPlugins: SvgoPluginConfig[] = [
  { name: "removeDoctype", enabled: true },
  { name: "removeXMLProcInst", enabled: true },
  { name: "removeComments", enabled: true },
  { name: "removeMetadata", enabled: true },
  { name: "removeXMLNS", enabled: true },
  { name: "removeEditorsNSData", enabled: true },
  { name: "cleanupAttrs", enabled: true },
  { name: "mergeStyles", enabled: true },
  { name: "inlineStyles", enabled: true },
  { name: "minifyStyles", enabled: true },
  { name: "convertStyleToAttrs", enabled: false },
  { name: "cleanupIds", enabled: true },
  { name: "removeRasterImages", enabled: false },
  { name: "removeUselessDefs", enabled: true },
  { name: "cleanupNumericValues", enabled: true },
  { name: "cleanupListOfValues", enabled: true },
  { name: "convertColors", enabled: true },
  { name: "removeUnknownsAndDefaults", enabled: true },
  { name: "removeNonInheritableGroupAttrs", enabled: true },
  { name: "removeUselessStrokeAndFill", enabled: true },
  { name: "removeViewBox", enabled: false },
  { name: "cleanupEnableBackground", enabled: true },
  { name: "removeHiddenElems", enabled: true },
  { name: "removeEmptyText", enabled: true },
  { name: "convertShapeToPath", enabled: false },
  { name: "moveElemsAttrsToGroup", enabled: true },
  { name: "moveGroupAttrsToElems", enabled: true },
  { name: "collapseGroups", enabled: true },
  { name: "convertPathData", enabled: true },
  { name: "convertEllipseToCircle", enabled: true },
  { name: "convertTransform", enabled: true },
  { name: "removeEmptyAttrs", enabled: true },
  { name: "removeEmptyContainers", enabled: true },
  { name: "mergePaths", enabled: true },
  { name: "removeUnusedNS", enabled: true },
  { name: "reusePaths", enabled: false },
  { name: "sortAttrs", enabled: false },
  { name: "sortDefsChildren", enabled: false },
  { name: "removeTitle", enabled: false },
  { name: "removeDesc", enabled: false },
  { name: "removeDimensions", enabled: false },
  { name: "removeStyleElement", enabled: false },
  { name: "removeScriptElement", enabled: false },
  { name: "removeOffCanvasPaths", enabled: false },
  { name: "removeAttributesBySelector", enabled: false },
];

export const getPluginLabel = (pluginName: string, locale = "en"): string => {
  const labels: Record<string, Record<string, string>> = {
    removeDoctype: {
      en: "Remove doctype",
      zh: "移除文档类型",
      ko: "문서 타입 제거",
      de: "Doctype entfernen",
    },
    removeXMLProcInst: {
      en: "Remove XML instructions",
      zh: "移除 XML 指令",
      ko: "XML 지시문 제거",
      de: "XML-Anweisungen entfernen",
    },
    removeComments: {
      en: "Remove comments",
      zh: "移除注释",
      ko: "주석 제거",
      de: "Kommentare entfernen",
    },
    removeMetadata: {
      en: "Remove <metadata>",
      zh: "移除 <metadata>",
      ko: "<metadata> 제거",
      de: "<metadata> entfernen",
    },
    removeXMLNS: {
      en: "Remove xmlns",
      zh: "移除 xmlns",
      ko: "xmlns 제거",
      de: "xmlns entfernen",
    },
    removeEditorsNSData: {
      en: "Remove editor data",
      zh: "移除编辑器数据",
      ko: "에디터 데이터 제거",
      de: "Editor-Daten entfernen",
    },
    cleanupAttrs: {
      en: "Clean up attribute whitespace",
      zh: "清理属性空白",
      ko: "속성 공백 정리",
      de: "Attribut-Leerzeichen bereinigen",
    },
    mergeStyles: {
      en: "Merge styles",
      zh: "合并样式",
      ko: "스타일 병합",
      de: "Stile zusammenführen",
    },
    inlineStyles: {
      en: "Inline styles",
      zh: "内联样式",
      ko: "인라인 스타일",
      de: "Inline-Stile",
    },
    minifyStyles: {
      en: "Minify styles",
      zh: "压缩样式",
      ko: "스타일 압축",
      de: "Stile minimieren",
    },
    convertStyleToAttrs: {
      en: "Style to attributes",
      zh: "样式转属性",
      ko: "스타일을 속성으로 변환",
      de: "Stil zu Attributen",
    },
    cleanupIds: {
      en: "Clean up IDs",
      zh: "清理 ID",
      ko: "ID 정리",
      de: "IDs bereinigen",
    },
    removeRasterImages: {
      en: "Remove raster images",
      zh: "移除栅格图像",
      ko: "래스터 이미지 제거",
      de: "Raster-Bilder entfernen",
    },
    removeUselessDefs: {
      en: "Remove unused defs",
      zh: "移除未使用的定义",
      ko: "사용하지 않는 정의 제거",
      de: "Ungenutzte Definitionen entfernen",
    },
    cleanupNumericValues: {
      en: "Round/rewrite numbers",
      zh: "舍入/重写数字",
      ko: "숫자 반올림/재작성",
      de: "Zahlen runden/umschreiben",
    },
    cleanupListOfValues: {
      en: "Round/rewrite number lists",
      zh: "舍入/重写数字列表",
      ko: "숫자 목록 반올림/재작성",
      de: "Zahlenlisten runden/umschreiben",
    },
    convertColors: {
      en: "Minify colours",
      zh: "压缩颜色",
      ko: "색상 압축",
      de: "Farben minimieren",
    },
    removeUnknownsAndDefaults: {
      en: "Remove unknowns & defaults",
      zh: "移除未知和默认值",
      ko: "알 수 없는 값 및 기본값 제거",
      de: "Unbekannte & Standardwerte entfernen",
    },
    removeNonInheritableGroupAttrs: {
      en: "Remove unneeded group attrs",
      zh: "移除不需要的组属性",
      ko: "불필요한 그룹 속성 제거",
      de: "Unerforderliche Gruppenattribute entfernen",
    },
    removeUselessStrokeAndFill: {
      en: "Remove useless stroke & fill",
      zh: "移除无用的描边和填充",
      ko: "불필요한 스트로크 및 채우기 제거",
      de: "Unerforderliche Strich & Füllung entfernen",
    },
    removeViewBox: {
      en: "Remove viewBox",
      zh: "移除 viewBox",
      ko: "viewBox 제거",
      de: "viewBox entfernen",
    },
    cleanupEnableBackground: {
      en: "Remove/tidy enable-background",
      zh: "移除/整理 enable-background",
      ko: "enable-background 제거/정리",
      de: "enable-background entfernen/bereinigen",
    },
    removeHiddenElems: {
      en: "Remove hidden elements",
      zh: "移除隐藏元素",
      ko: "숨겨진 요소 제거",
      de: "Versteckte Elemente entfernen",
    },
    removeEmptyText: {
      en: "Remove empty text",
      zh: "移除空文本",
      ko: "빈 텍스트 제거",
      de: "Leeren Text entfernen",
    },
    convertShapeToPath: {
      en: "Shapes to (smaller) paths",
      zh: "形状转（更小的）路径",
      ko: "도형을 (더 작은) 경로로 변환",
      de: "Formen zu (kleineren) Pfaden",
    },
    moveElemsAttrsToGroup: {
      en: "Move attrs to parent group",
      zh: "将属性移至父组",
      ko: "속성을 부모 그룹으로 이동",
      de: "Attribute zur übergeordneten Gruppe verschieben",
    },
    moveGroupAttrsToElems: {
      en: "Move group attrs to elements",
      zh: "将组属性移至元素",
      ko: "그룹 속성을 요소로 이동",
      de: "Gruppenattribute zu Elementen verschieben",
    },
    collapseGroups: {
      en: "Collapse useless groups",
      zh: "折叠无用组",
      ko: "불필요한 그룹 축소",
      de: "Unerforderliche Gruppen zusammenfassen",
    },
    convertPathData: {
      en: "Round/rewrite paths",
      zh: "舍入/重写路径",
      ko: "경로 반올림/재작성",
      de: "Pfade runden/umschreiben",
    },
    convertEllipseToCircle: {
      en: "Convert non-eccentric <ellipse> to <circle>",
      zh: "将非偏心 <ellipse> 转换为 <circle>",
      ko: "비편심 <ellipse>를 <circle>로 변환",
      de: "Nicht-exzentrische <ellipse> zu <circle> konvertieren",
    },
    convertTransform: {
      en: "Round/rewrite transforms",
      zh: "舍入/重写变换",
      ko: "변환 반올림/재작성",
      de: "Transformationen runden/umschreiben",
    },
    removeEmptyAttrs: {
      en: "Remove empty attrs",
      zh: "移除空属性",
      ko: "빈 속성 제거",
      de: "Leere Attribute entfernen",
    },
    removeEmptyContainers: {
      en: "Remove empty containers",
      zh: "移除空容器",
      ko: "빈 컨테이너 제거",
      de: "Leere Container entfernen",
    },
    mergePaths: {
      en: "Merge paths",
      zh: "合并路径",
      ko: "경로 병합",
      de: "Pfade zusammenführen",
    },
    removeUnusedNS: {
      en: "Remove unused namespaces",
      zh: "移除未使用的命名空间",
      ko: "사용하지 않는 네임스페이스 제거",
      de: "Ungenutzte Namespaces entfernen",
    },
    reusePaths: {
      en: "Replace duplicate elements with links",
      zh: "用链接替换重复元素",
      ko: "중복 요소를 링크로 교체",
      de: "Doppelte Elemente durch Links ersetzen",
    },
    sortAttrs: {
      en: "Sort attrs",
      zh: "排序属性",
      ko: "속성 정렬",
      de: "Attribute sortieren",
    },
    sortDefsChildren: {
      en: "Sort children of <defs>",
      zh: "排序 <defs> 的子元素",
      ko: "<defs>의 자식 요소 정렬",
      de: "Kinder von <defs> sortieren",
    },
    removeTitle: {
      en: "Remove <title>",
      zh: "移除 <title>",
      ko: "<title> 제거",
      de: "<title> entfernen",
    },
    removeDesc: {
      en: "Remove <desc>",
      zh: "移除 <desc>",
      ko: "<desc> 제거",
      de: "<desc> entfernen",
    },
    removeDimensions: {
      en: "Prefer viewBox to width/height",
      zh: "优先使用 viewBox 而非 width/height",
      ko: "width/height보다 viewBox 선호",
      de: "viewBox statt width/height bevorzugen",
    },
    removeStyleElement: {
      en: "Remove style elements",
      zh: "移除样式元素",
      ko: "스타일 요소 제거",
      de: "Stil-Elemente entfernen",
    },
    removeScriptElement: {
      en: "Remove scripts",
      zh: "移除脚本",
      ko: "스크립트 제거",
      de: "Skripte entfernen",
    },
    removeOffCanvasPaths: {
      en: "Remove out-of-bounds paths",
      zh: "移除越界路径",
      ko: "범위를 벗어난 경로 제거",
      de: "Außerhalb liegende Pfade entfernen",
    },
    removeAttributesBySelector: {
      en: "Remove deprecated attributes",
      zh: "移除已弃用的属性",
      ko: "더 이상 사용되지 않는 속성 제거",
      de: "Veraltete Attribute entfernen",
    },
  };

  return labels[pluginName]?.[locale] || labels[pluginName]?.en || pluginName;
};
