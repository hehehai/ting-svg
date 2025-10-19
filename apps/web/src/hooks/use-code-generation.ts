import { useEffect, useState } from "react";
import { prepareSvgDataForWorker } from "@/lib/svg-to-code";
import {
  codeGeneratorWorkerClient,
  type GeneratorType,
} from "@/lib/worker-utils/code-generator-worker-client";

export function useCodeGeneration(
  activeTab: string,
  compressedSvg: string,
  fileName: string
) {
  const [generatedCodes, setGeneratedCodes] = useState<Map<string, string>>(
    new Map()
  );
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!(compressedSvg && activeTab)) {
      return;
    }

    const validGeneratorTypes: GeneratorType[] = [
      "react-jsx",
      "react-tsx",
      "vue",
      "svelte",
      "react-native",
      "flutter",
    ];

    if (!validGeneratorTypes.includes(activeTab as GeneratorType)) {
      return;
    }

    const generateCode = async () => {
      setIsGenerating(true);

      try {
        // Prepare SVG data in main thread (DOM parsing)
        const svgData = prepareSvgDataForWorker(compressedSvg, fileName);

        // Generate code in worker
        const code = await codeGeneratorWorkerClient.generate(
          activeTab as GeneratorType,
          svgData,
          compressedSvg
        );

        setGeneratedCodes((prev) => new Map(prev).set(activeTab, code));
      } catch {
        // Code generation failed silently
      } finally {
        setIsGenerating(false);
      }
    };

    generateCode();
  }, [activeTab, compressedSvg, fileName]);

  return { generatedCodes, isGenerating };
}
