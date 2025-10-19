import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { buildSvgoConfig } from "@/lib/svgo";
import type { SvgoGlobalSettings, SvgoPluginConfig } from "@/lib/svgo-plugins";
import { svgoWorkerClient } from "@/lib/worker-utils/svgo-worker-client";

export function useAutoCompress(
  originalSvg: string,
  plugins: SvgoPluginConfig[],
  globalSettings: SvgoGlobalSettings,
  setCompressedSvg: (svg: string) => void
) {
  const [isCompressing, setIsCompressing] = useState(false);

  const handleCompress = useCallback(async () => {
    if (!originalSvg) {
      return;
    }

    setIsCompressing(true);

    try {
      const config = buildSvgoConfig(plugins, globalSettings);
      const result = await svgoWorkerClient.compress(originalSvg, config);
      setCompressedSvg(result);
    } catch (_error) {
      toast.error("Failed to optimize SVG");
    } finally {
      setIsCompressing(false);
    }
  }, [originalSvg, plugins, globalSettings, setCompressedSvg]);

  useEffect(() => {
    if (originalSvg) {
      handleCompress();
    }
  }, [originalSvg, handleCompress]);

  return { isCompressing };
}
