/**
 * Worker result cache utility
 * Caches worker computation results to avoid redundant processing
 */

interface CacheEntry<T> {
  result: T;
  timestamp: number;
}

const SECONDS_PER_MINUTE = 60;
const MS_PER_SECOND = 1000;
const MINUTES_TO_MS = SECONDS_PER_MINUTE * MS_PER_SECOND;
const CACHE_MAX_AGE_MINUTES = 5;
const DEFAULT_MAX_AGE_MS = CACHE_MAX_AGE_MINUTES * MINUTES_TO_MS;
const DEFAULT_MAX_SIZE = 100;

export class WorkerCache<T> {
  private readonly cache = new Map<string, CacheEntry<T>>();
  private readonly maxAge: number;
  private readonly maxSize: number;

  constructor(maxAge = DEFAULT_MAX_AGE_MS, maxSize = DEFAULT_MAX_SIZE) {
    this.maxAge = maxAge;
    this.maxSize = maxSize;
  }

  /**
   * Generate cache key from input
   */
  private generateKey(input: unknown): string {
    return JSON.stringify(input);
  }

  /**
   * Get cached result if available and not expired
   */
  get(input: unknown): T | null {
    const key = this.generateKey(input);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.result;
  }

  /**
   * Set cache entry
   */
  set(input: unknown, result: T): void {
    // Enforce size limit (LRU-like: delete oldest entries)
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const key = this.generateKey(input);
    this.cache.set(key, {
      result,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      maxAge: this.maxAge,
    };
  }
}
