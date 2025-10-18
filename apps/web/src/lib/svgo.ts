import { optimize, type Config as SvgoConfig } from "svgo";
import type { SvgoGlobalSettings, SvgoPluginConfig } from "./svgo-plugins";

export const getStandardPreset = (): SvgoConfig => ({
  multipass: true,
  plugins: ["preset-default"] as any,
});

export const buildSvgoConfig = (
  plugins: SvgoPluginConfig[],
  globalSettings: SvgoGlobalSettings
): SvgoConfig => {
  const enabledPlugins = plugins.filter((p) => p.enabled).map((p) => p.name);

  return {
    multipass: globalSettings.multipass,
    floatPrecision: globalSettings.floatPrecision,
    plugins:
      enabledPlugins.length > 0
        ? (enabledPlugins as any)
        : (["preset-default"] as any),
  };
};

export const compressSvg = (svg: string, config: SvgoConfig): string => {
  const result = optimize(svg, config);
  return result.data;
};

const PERCENTAGE_MULTIPLIER = 100;

export const calculateCompressionRate = (
  original: string,
  compressed: string
): number => {
  if (!(original && compressed)) {
    return 0;
  }
  const originalSize = new Blob([original]).size;
  const compressedSize = new Blob([compressed]).size;
  return (1 - compressedSize / originalSize) * PERCENTAGE_MULTIPLIER;
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};
