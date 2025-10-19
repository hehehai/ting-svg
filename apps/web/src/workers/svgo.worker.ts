/**
 * SVGO Web Worker
 * Handles SVG optimization in a separate thread to avoid blocking the main thread
 */

import { type Config, optimize } from "svgo";

interface WorkerMessage {
  id: string;
  data: {
    svg: string;
    config: Config;
  };
}

interface WorkerResponse {
  id: string;
  success: boolean;
  data?: string;
  error?: string;
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { id, data } = e.data;
  const { svg, config } = data;

  try {
    const result = optimize(svg, config);

    if ("data" in result) {
      const response: WorkerResponse = {
        id,
        success: true,
        data: result.data,
      };
      self.postMessage(response);
    } else {
      const response: WorkerResponse = {
        id,
        success: false,
        error: "Failed to optimize SVG",
      };
      self.postMessage(response);
    }
  } catch (error) {
    const response: WorkerResponse = {
      id,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
    self.postMessage(response);
  }
};
