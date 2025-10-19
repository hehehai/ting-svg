/**
 * Worker manager utility
 * Handles worker lifecycle and message passing with Promise-based API
 */

interface WorkerMessage<T = unknown> {
  id: string;
  data: T;
}

interface WorkerResponse<T = unknown> {
  id: string;
  success: boolean;
  data?: T;
  error?: string;
}

type ResolveReject<T> = {
  resolve: (value: T) => void;
  reject: (reason: Error) => void;
};

export class WorkerManager<TRequest, TResponse> {
  private readonly worker: Worker;
  private readonly pendingMessages = new Map<
    string,
    ResolveReject<TResponse>
  >();
  private messageId = 0;

  constructor(workerUrl: URL) {
    this.worker = new Worker(workerUrl, { type: "module" });
    this.worker.onmessage = this.handleMessage.bind(this);
    this.worker.onerror = this.handleError.bind(this);
  }

  /**
   * Send message to worker and get Promise for result
   */
  async execute(data: TRequest): Promise<TResponse> {
    const id = `msg_${this.messageId++}`;

    const promise = new Promise<TResponse>((resolve, reject) => {
      this.pendingMessages.set(id, { resolve, reject });
    });

    const message: WorkerMessage<TRequest> = { id, data };
    this.worker.postMessage(message);

    return promise;
  }

  /**
   * Handle worker response
   */
  private handleMessage(e: MessageEvent<WorkerResponse<TResponse>>) {
    const { id, success, data, error } = e.data;
    const pending = this.pendingMessages.get(id);

    if (!pending) {
      return;
    }

    this.pendingMessages.delete(id);

    if (success && data !== undefined) {
      pending.resolve(data);
    } else {
      pending.reject(new Error(error ?? "Worker operation failed"));
    }
  }

  /**
   * Handle worker error
   */
  private handleError(error: ErrorEvent) {
    // Reject all pending messages
    for (const pending of this.pendingMessages.values()) {
      pending.reject(new Error(`Worker error: ${error.message}`));
    }

    this.pendingMessages.clear();
  }

  /**
   * Terminate worker
   */
  terminate(): void {
    this.worker.terminate();
    this.pendingMessages.clear();
  }

  /**
   * Get number of pending messages
   */
  getPendingCount(): number {
    return this.pendingMessages.size;
  }
}
