/**
 * Prettier Worker Client
 * Provides a Promise-based API for code formatting using Web Workers
 */

import { WorkerCache } from "@/lib/worker-utils/cache";
import { WorkerManager } from "@/lib/worker-utils/worker-manager";
import PrettierWorker from "@/workers/prettier.worker?worker&url";

export type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "html"
  | "dart"
  | "svg";

type PrettierRequest = {
  content: string;
  language: SupportedLanguage;
};

type PrettierResponse = string;

class PrettierWorkerClient {
  private worker: WorkerManager<PrettierRequest, PrettierResponse> | null =
    null;
  private readonly cache = new WorkerCache<string>();

  /**
   * Initialize worker (lazy initialization)
   */
  private ensureWorker(): WorkerManager<PrettierRequest, PrettierResponse> {
    if (!this.worker) {
      this.worker = new WorkerManager<PrettierRequest, PrettierResponse>(
        new URL(PrettierWorker, import.meta.url)
      );
    }
    return this.worker;
  }

  /**
   * Format content using Prettier
   */
  async format(content: string, language: SupportedLanguage): Promise<string> {
    // Check cache first
    const cacheKey = { content, language };
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Process in worker
    const worker = this.ensureWorker();
    const result = await worker.execute({ content, language });

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
export const prettierWorkerClient = new PrettierWorkerClient();
