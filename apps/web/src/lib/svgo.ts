/**
 * SVGO wrapper - ONLY for use in workers
 * DO NOT import this file in main application code
 * Use svgo-config.ts for configuration utilities
 */

import { optimize, type Config as SvgoConfig } from "svgo";

export const compressSvg = (svg: string, config: SvgoConfig): string => {
  const result = optimize(svg, config);
  return result.data;
};

// Re-export types for convenience
export type { Config as SvgoConfig } from "svgo";
