/**
 * Code Generator Web Worker
 * Handles framework code generation in a separate thread
 *
 * Note: Since DOMParser is not available in workers, the main thread
 * pre-processes the SVG and sends parsed data to the worker
 */

type SvgData = {
  innerContent: string;
  viewBox: string;
  componentName: string;
  processedContent: string; // Already processed with currentColor if needed
};

type GeneratorType =
  | "react-jsx"
  | "react-tsx"
  | "vue"
  | "svelte"
  | "react-native"
  | "flutter";

type WorkerMessage = {
  id: string;
  data: {
    type: GeneratorType;
    svgData: SvgData;
    svgString: string; // Original for Flutter
  };
};

type WorkerResponse = {
  id: string;
  success: boolean;
  data?: {
    type: GeneratorType;
    code: string;
  };
  error?: string;
};

// Convert hyphenated attribute names to camelCase for React
function _toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Convert SVG inner content for React (camelCase attributes)
function convertSvgToReactContent(svgContent: string): string {
  let content = svgContent;

  const attributeMap: Record<string, string> = {
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-opacity": "strokeOpacity",
    "fill-opacity": "fillOpacity",
    "fill-rule": "fillRule",
    "clip-path": "clipPath",
    "clip-rule": "clipRule",
  };

  for (const [hyphenated, camelCased] of Object.entries(attributeMap)) {
    const regex = new RegExp(`\\b${hyphenated}=`, "g");
    content = content.replace(regex, `${camelCased}=`);
  }

  return content;
}

// Convert SVG tags to React Native components
function convertToReactNativeTags(svgContent: string): {
  content: string;
  imports: Set<string>;
} {
  const imports = new Set<string>();
  let content = svgContent;

  const tagMap: Record<string, string> = {
    "<path": "<Path",
    "</path>": "</Path>",
    "<g": "<G",
    "</g>": "</G>",
    "<circle": "<Circle",
    "</circle>": "</Circle>",
    "<ellipse": "<Ellipse",
    "</ellipse>": "</Ellipse>",
    "<line": "<Line",
    "</line>": "</Line>",
    "<polyline": "<Polyline",
    "</polyline>": "</Polyline>",
    "<polygon": "<Polygon",
    "</polygon>": "</Polygon>",
    "<rect": "<Rect",
    "</rect>": "</Rect>",
    "<defs": "<Defs",
    "</defs>": "</Defs>",
    "<linearGradient": "<LinearGradient",
    "</linearGradient>": "</LinearGradient>",
    "<radialGradient": "<RadialGradient",
    "</radialGradient>": "</RadialGradient>",
    "<stop": "<Stop",
    "</stop>": "</Stop>",
    "<text": "<Text",
    "</text>": "</Text>",
    "<tspan": "<TSpan",
    "</tspan>": "</TSpan>",
  };

  for (const [svgTag, reactTag] of Object.entries(tagMap)) {
    if (content.includes(svgTag)) {
      const componentName = reactTag.replace(/<|>/g, "").replace("/", "");
      imports.add(componentName);
      content = content.replaceAll(svgTag, reactTag);
    }
  }

  content = convertSvgToReactContent(content);

  return { content, imports };
}

// Generate React JSX code
function generateReactJSX(svgData: SvgData): string {
  const { componentName, viewBox, innerContent } = svgData;
  const reactContent = convertSvgToReactContent(innerContent);

  return `import React from "react";

export function ${componentName}(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="${viewBox}"
      {...props}
    >
      ${reactContent.trim()}
    </svg>
  );
}

export default ${componentName};
`;
}

// Generate React TSX code
function generateReactTSX(svgData: SvgData): string {
  const { componentName, viewBox, innerContent } = svgData;
  const reactContent = convertSvgToReactContent(innerContent);

  return `import React, { SVGProps } from "react";

export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="${viewBox}"
      {...props}
    >
      ${reactContent.trim()}
    </svg>
  );
}

export default ${componentName};
`;
}

// Generate Vue code
function generateVue(svgData: SvgData): string {
  const { componentName, viewBox, innerContent } = svgData;

  return `<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="${viewBox}"
  >
    ${innerContent.trim()}
  </svg>
</template>

<script>
export default {
  name: '${componentName}'
}
</script>
`;
}

// Generate Svelte code
function generateSvelte(svgData: SvgData): string {
  const { viewBox, innerContent } = svgData;

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="${viewBox}"
  {...$$props}
>
  ${innerContent.trim()}
</svg>
`;
}

// Generate React Native code
function generateReactNative(svgData: SvgData): string {
  const { componentName, viewBox, innerContent } = svgData;
  const { content, imports } = convertToReactNativeTags(innerContent);

  const importList = [...imports].sort().join(", ");

  return `import React from "react";
import Svg, { ${importList} } from "react-native-svg";

export function ${componentName}(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="${viewBox}"
      {...props}
    >
      ${content.trim()}
    </Svg>
  );
}

export default ${componentName};
`;
}

// Generate Flutter code
function generateFlutter(svgData: SvgData, svgString: string): string {
  const { componentName } = svgData;

  const escapedSvg = svgString.replace(/'/g, "\\'");

  const formattedSvg = escapedSvg
    .split(">")
    .map((part, index, array) => {
      if (index < array.length - 1) {
        return `${part.trim()}>`;
      }
      return part.trim();
    })
    .filter((part) => part)
    .join("\n        ");

  return `import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class ${componentName} extends StatelessWidget {
  const ${componentName}({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SvgPicture.string(
      '''${formattedSvg}''',
      width: 24,
      height: 24,
    );
  }
}
`;
}

// Main message handler
self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { id, data } = e.data;
  const { type, svgData, svgString } = data;

  try {
    let code: string;

    switch (type) {
      case "react-jsx":
        code = generateReactJSX(svgData);
        break;
      case "react-tsx":
        code = generateReactTSX(svgData);
        break;
      case "vue":
        code = generateVue(svgData);
        break;
      case "svelte":
        code = generateSvelte(svgData);
        break;
      case "react-native":
        code = generateReactNative(svgData);
        break;
      case "flutter":
        code = generateFlutter(svgData, svgString);
        break;
      default:
        throw new Error(`Unknown generator type: ${type}`);
    }

    const response: WorkerResponse = {
      id,
      success: true,
      data: { type, code },
    };
    self.postMessage(response);
  } catch (error) {
    const response: WorkerResponse = {
      id,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
    self.postMessage(response);
  }
};
