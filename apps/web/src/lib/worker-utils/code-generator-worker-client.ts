/**
 * Code Generator Worker Client
 * Provides a Promise-based API for code generation using Web Workers
 */

import CodeGeneratorWorker from "@/workers/code-generator.worker?worker&url";
import { WorkerCache } from "./cache";
import { WorkerManager } from "./worker-manager";

export type GeneratorType =
  | "react-jsx"
  | "react-tsx"
  | "vue"
  | "svelte"
  | "react-native"
  | "flutter";

export type SvgData = {
  innerContent: string;
  viewBox: string;
  componentName: string;
  processedContent: string;
};

type CodeGeneratorRequest = {
  type: GeneratorType;
  svgData: SvgData;
  svgString: string;
};

type CodeGeneratorResponse = {
  type: GeneratorType;
  code: string;
};

class CodeGeneratorWorkerClient {
  private worker: WorkerManager<
    CodeGeneratorRequest,
    CodeGeneratorResponse
  > | null = null;
  private readonly cache = new WorkerCache<string>();

  /**
   * Initialize worker (lazy initialization)
   */
  private ensureWorker(): WorkerManager<
    CodeGeneratorRequest,
    CodeGeneratorResponse
  > {
    if (!this.worker) {
      this.worker = new WorkerManager<
        CodeGeneratorRequest,
        CodeGeneratorResponse
      >(new URL(CodeGeneratorWorker, import.meta.url));
    }
    return this.worker;
  }

  /**
   * Generate code for a specific framework
   */
  async generate(
    type: GeneratorType,
    svgData: SvgData,
    svgString: string
  ): Promise<string> {
    // Check cache first
    const cacheKey = { type, svgData, svgString };
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Process in worker
    const worker = this.ensureWorker();
    const result = await worker.execute({ type, svgData, svgString });

    // Cache result
    this.cache.set(cacheKey, result.code);

    return result.code;
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
export const codeGeneratorWorkerClient = new CodeGeneratorWorkerClient();
