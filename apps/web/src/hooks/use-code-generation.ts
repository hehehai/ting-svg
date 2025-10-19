import { useEffect, useState } from "react";
import {
  svgToFlutter,
  svgToReactJSX,
  svgToReactNative,
  svgToReactTSX,
  svgToSvelte,
  svgToVue,
} from "@/lib/svg-to-code";

export function useCodeGeneration(
  activeTab: string,
  compressedSvg: string,
  fileName: string
) {
  const [generatedCodes, setGeneratedCodes] = useState<Map<string, string>>(
    new Map()
  );

  useEffect(() => {
    if (!(compressedSvg && activeTab)) {
      return;
    }

    const codeGenerators: Record<
      string,
      (svg: string, name?: string) => string
    > = {
      "react-jsx": svgToReactJSX,
      "react-tsx": svgToReactTSX,
      vue: svgToVue,
      svelte: svgToSvelte,
      "react-native": svgToReactNative,
      flutter: svgToFlutter,
    };

    if (activeTab in codeGenerators) {
      const generator = codeGenerators[activeTab];
      if (!generator) {
        return;
      }
      const code = generator(compressedSvg, fileName);
      setGeneratedCodes((prev) => new Map(prev).set(activeTab, code));
    }
  }, [activeTab, compressedSvg, fileName]);

  return generatedCodes;
}
