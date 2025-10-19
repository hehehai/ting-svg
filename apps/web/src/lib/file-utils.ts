export const isSvgFile = (file: File): boolean =>
  file.type === "image/svg+xml" || file.name.endsWith(".svg");

export const readFileAsText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to read file as text"));
      }
    });
    reader.addEventListener("error", () => {
      reject(new Error("Failed to read file"));
    });
    reader.readAsText(file);
  });

export const downloadSvg = (svg: string, fileName: string): void => {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};

export const isSvgContent = (content: string): boolean => {
  const trimmed = content.trim();
  return trimmed.startsWith("<svg") || trimmed.includes("<svg");
};

export const extractSvgFromBase64 = (base64: string): string | null => {
  try {
    if (base64.startsWith("data:image/svg+xml;base64,")) {
      const svgData = base64.replace("data:image/svg+xml;base64,", "");
      return atob(svgData);
    }
    return null;
  } catch {
    return null;
  }
};

export const prettifySvg = async (svg: string): Promise<string> => {
  try {
    const prettier = await import("prettier");
    const parserHtml = await import("prettier/parser-html");

    return prettier.format(svg, {
      parser: "html",
      plugins: [parserHtml],
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
    });
  } catch (_error) {
    return svg;
  }
};

export const svgToDataUrl = (svg: string): string => {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
};

// Default dimensions for SVG export
const DEFAULT_DIMENSION = 1024;
// Minimum export dimension to ensure quality
const MIN_EXPORT_DIMENSION = 512;
// Expected number of viewBox values
const VIEWBOX_VALUES_COUNT = 4;
// Regex pattern for splitting viewBox values
const VIEWBOX_SPLIT_PATTERN = /\s+|,/;

const getSvgDimensions = (svg: string): { width: number; height: number } => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const svgElement = doc.querySelector("svg");

  if (!svgElement) {
    return { width: DEFAULT_DIMENSION, height: DEFAULT_DIMENSION };
  }

  // Try to get width and height attributes
  let width: string | null = svgElement.getAttribute("width");
  let height: string | null = svgElement.getAttribute("height");

  // If width/height are not present, try to get from viewBox
  if (!(width && height)) {
    const viewBox = svgElement.getAttribute("viewBox");
    if (viewBox) {
      const values = viewBox.split(VIEWBOX_SPLIT_PATTERN);
      if (values.length === VIEWBOX_VALUES_COUNT) {
        width = values[2] ?? null;
        height = values[3] ?? null;
      }
    }
  }

  // Parse dimensions, removing units like 'px', 'pt', etc.
  const parseSize = (size: string | null): number => {
    if (!size) {
      return DEFAULT_DIMENSION;
    }
    const parsed = Number.parseFloat(size);
    return Number.isNaN(parsed) ? DEFAULT_DIMENSION : parsed;
  };

  const parsedWidth = parseSize(width);
  const parsedHeight = parseSize(height);

  // Scale up if dimensions are too small (less than MIN_EXPORT_DIMENSION)
  const scale = Math.max(
    1,
    MIN_EXPORT_DIMENSION / Math.max(parsedWidth, parsedHeight)
  );

  return {
    width: Math.round(parsedWidth * scale),
    height: Math.round(parsedHeight * scale),
  };
};

export const exportAsPng = async (
  svg: string,
  fileName: string
): Promise<void> => {
  const { width, height } = getSvgDimensions(svg);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const img = new Image();
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    img.addEventListener("load", () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = fileName.replace(".svg", ".png");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
          resolve();
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, "image/png");
    });

    img.addEventListener("error", () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    });

    img.src = url;
  });
};

export const exportAsJpeg = async (
  svg: string,
  fileName: string,
  quality = 0.95
): Promise<void> => {
  const { width, height } = getSvgDimensions(svg);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  const img = new Image();
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    img.addEventListener("load", () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName.replace(".svg", ".jpg");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            resolve();
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        "image/jpeg",
        quality
      );
    });

    img.addEventListener("error", () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    });

    img.src = url;
  });
};
