/**
 * SVGO Worker Client
 * Provides a Promise-based API for SVG optimization using Web Workers
 */

import type { SvgoConfig } from "@/lib/svgo";
import SvgoWorker from "@/workers/svgo.worker?worker&url";
import { WorkerCache } from "./cache";
import { WorkerManager } from "./worker-manager";

interface SvgoRequest {
  svg: string;
  config: SvgoConfig;
}

type SvgoResponse = string;

class SvgoWorkerClient {
  private worker: WorkerManager<SvgoRequest, SvgoResponse> | null = null;
  private readonly cache = new WorkerCache<string>();

  /**
   * Initialize worker (lazy initialization)
   */
  private ensureWorker(): WorkerManager<SvgoRequest, SvgoResponse> {
    if (!this.worker) {
      this.worker = new WorkerManager<SvgoRequest, SvgoResponse>(
        new URL(SvgoWorker, import.meta.url)
      );
    }
    return this.worker;
  }

  /**
   * Compress SVG using SVGO in a Web Worker
   */
  async compress(svg: string, config: SvgoConfig): Promise<string> {
    // Check cache first
    const cacheKey = { svg, config };
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Process in worker
    const worker = this.ensureWorker();
    const result = await worker.execute({ svg, config });

    // Cache result
    this.cache.set(cacheKey, result);

    return result;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cache.getStats();
  }

  /**
   * Terminate worker and clear resources
   */
  terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.cache.clear();
  }
}

// Export singleton instance
export const svgoWorkerClient = new SvgoWorkerClient();
