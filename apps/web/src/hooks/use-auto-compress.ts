import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { buildSvgoConfig, compressSvg } from "@/lib/svgo";
import type { SvgoGlobalSettings, SvgoPluginConfig } from "@/lib/svgo-plugins";

export function useAutoCompress(
  originalSvg: string,
  plugins: SvgoPluginConfig[],
  globalSettings: SvgoGlobalSettings,
  setCompressedSvg: (svg: string) => void
) {
  const handleCompress = useCallback(() => {
    try {
      const config = buildSvgoConfig(plugins, globalSettings);
      const result = compressSvg(originalSvg, config);
      setCompressedSvg(result);
    } catch {
      toast.error("Failed to optimize SVG");
    }
  }, [originalSvg, plugins, globalSettings, setCompressedSvg]);

  useEffect(() => {
    if (originalSvg) {
      handleCompress();
    }
  }, [originalSvg, handleCompress]);
}
