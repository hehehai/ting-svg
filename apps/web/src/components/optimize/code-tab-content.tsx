import { CodeViewerLazy } from "@/components/lazy/code-viewer-lazy";

type SupportedLanguage = "javascript" | "typescript" | "html" | "dart";

interface CodeTabContentProps {
  activeTab: string;
  generatedCodes: Map<string, string>;
  componentName: string;
}

const codeTabConfig: Record<
  string,
  { ext: string; language: SupportedLanguage }
> = {
  "react-jsx": { ext: "jsx", language: "javascript" },
  "react-tsx": { ext: "tsx", language: "typescript" },
  vue: { ext: "vue", language: "html" },
  svelte: { ext: "svelte", language: "html" },
  "react-native": { ext: "jsx", language: "javascript" },
  flutter: { ext: "dart", language: "dart" },
};

export function CodeTabContent({
  activeTab,
  generatedCodes,
  componentName,
}: CodeTabContentProps) {
  const config = codeTabConfig[activeTab as keyof typeof codeTabConfig];
  if (!config) {
    return null;
  }

  const code = generatedCodes.get(activeTab);
  if (!code) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Generating code...
      </div>
    );
  }

  return (
    <CodeViewerLazy
      code={code}
      fileName={`${componentName}.${config.ext}`}
      language={config.language}
    />
  );
}
