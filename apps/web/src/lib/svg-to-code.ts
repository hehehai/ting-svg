// Utility functions for converting SVG to various framework code formats

// Regular expressions at top level for performance
const FIRST_CHAR_REGEX = /^./;
const SVG_EXTENSION_REGEX = /\.svg$/i;
const VALID_COMPONENT_NAME_REGEX = /^[A-Z][a-zA-Z0-9]*$/;

// Convert kebab-case to PascalCase
function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(FIRST_CHAR_REGEX, (char) => char.toUpperCase());
}

// Generate component name from filename
export function getComponentName(fileName?: string): string {
  if (!fileName) {
    return "TinySVGDemo";
  }

  // Remove .svg extension and convert to PascalCase
  const nameWithoutExt = fileName.replace(SVG_EXTENSION_REGEX, "");
  const pascalName = toPascalCase(nameWithoutExt);

  // Validate component name (must start with letter and contain only alphanumeric)
  if (VALID_COMPONENT_NAME_REGEX.test(pascalName)) {
    return pascalName;
  }

  return "TinySVGDemo";
}

// Check if a color should be ignored (none, transparent, gradients, etc.)
function isIgnoredColor(color: string): boolean {
  if (!color) {
    return true;
  }
  const trimmed = color.trim().toLowerCase();
  return (
    trimmed === "none" ||
    trimmed === "transparent" ||
    trimmed.startsWith("url(")
  );
}

// Analyze colors in SVG and determine if should use currentColor
export function analyzeColors(svgString: string): {
  uniqueColors: string[];
  shouldUseCurrentColor: boolean;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const colors = new Set<string>();

  // Check for parsing errors
  const parserError = doc.querySelector("parsererror");
  if (parserError) {
    return { uniqueColors: [], shouldUseCurrentColor: false };
  }

  // Traverse all elements and collect color values
  const allElements = doc.querySelectorAll("*");
  for (const el of allElements) {
    const fill = el.getAttribute("fill");
    const stroke = el.getAttribute("stroke");

    if (fill && !isIgnoredColor(fill)) {
      colors.add(fill.trim());
    }
    if (stroke && !isIgnoredColor(stroke)) {
      colors.add(stroke.trim());
    }
  }

  const uniqueColors = [...colors];
  return {
    uniqueColors,
    shouldUseCurrentColor: uniqueColors.length === 1,
  };
}

// Replace colors in SVG string
function replaceColors(svgString: string, oldColor: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");

  const parserError = doc.querySelector("parsererror");
  if (parserError) {
    return svgString;
  }

  const allElements = doc.querySelectorAll("*");
  for (const el of allElements) {
    const fill = el.getAttribute("fill");
    const stroke = el.getAttribute("stroke");

    if (fill?.trim() === oldColor) {
      el.setAttribute("fill", "currentColor");
    }
    if (stroke?.trim() === oldColor) {
      el.setAttribute("stroke", "currentColor");
    }
  }

  // Serialize back to string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc.documentElement);
}

// Extract SVG attributes and inner content
export function parseSvg(svgString: string): {
  attributes: Record<string, string>;
  innerContent: string;
  viewBox: string | null;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = doc.querySelector("svg");

  if (!svgElement) {
    return { attributes: {}, innerContent: "", viewBox: null };
  }

  // Extract attributes
  const attributes: Record<string, string> = {};
  for (const attr of svgElement.attributes) {
    attributes[attr.name] = attr.value;
  }

  // Get viewBox
  const viewBox = svgElement.getAttribute("viewBox");

  // Get inner HTML
  const innerContent = svgElement.innerHTML;

  return { attributes, innerContent, viewBox };
}

// Convert hyphenated attribute names to camelCase for React
function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Convert SVG attributes to React props format
export function toReactProps(attributes: Record<string, string>): string {
  const props: string[] = [];

  for (const [key, value] of Object.entries(attributes)) {
    if (key === "xmlns" || key === "viewBox") {
      continue; // These will be handled separately
    }

    const camelKey = toCamelCase(key);
    const escapedValue = value.replace(/"/g, '\\"');
    props.push(`${camelKey}="${escapedValue}"`);
  }

  return props.join(" ");
}

// Process SVG for code generation
export function processSvg(svgString: string): {
  processedSvg: string;
  componentName: string;
  viewBox: string;
} {
  // Analyze colors
  const { uniqueColors, shouldUseCurrentColor } = analyzeColors(svgString);

  let processed = svgString;

  // Replace color if only one unique color
  if (shouldUseCurrentColor && uniqueColors.length === 1) {
    processed = replaceColors(processed, uniqueColors[0]);
  }

  // Parse SVG
  const { viewBox } = parseSvg(processed);

  return {
    processedSvg: processed,
    componentName: "TinySVGDemo",
    viewBox: viewBox || "0 0 24 24",
  };
}

// Prepare SVG data for worker (includes DOM parsing that can't be done in worker)
export function prepareSvgDataForWorker(
  svgString: string,
  fileName?: string
): {
  innerContent: string;
  viewBox: string;
  componentName: string;
  processedContent: string;
} {
  const componentName = getComponentName(fileName);
  const { processedSvg, viewBox } = processSvg(svgString);
  const { innerContent } = parseSvg(processedSvg);

  return {
    innerContent,
    viewBox,
    componentName,
    processedContent: processedSvg,
  };
}

// Convert SVG inner content for React (camelCase attributes)
function convertSvgToReactContent(svgContent: string): string {
  let content = svgContent;

  // Convert common hyphenated attributes to camelCase
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

  // Map of SVG tags to React Native components
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

  // Track which components are actually used
  for (const [svgTag, reactTag] of Object.entries(tagMap)) {
    if (content.includes(svgTag)) {
      const componentName = reactTag.replace(/<|>/g, "").replace("/", "");
      imports.add(componentName);
      content = content.replaceAll(svgTag, reactTag);
    }
  }

  // Convert attributes to camelCase
  content = convertSvgToReactContent(content);

  return { content, imports };
}

// Generate React JSX code
export function svgToReactJSX(svgString: string, fileName?: string): string {
  const componentName = getComponentName(fileName);
  const { processedSvg, viewBox } = processSvg(svgString);
  const { innerContent } = parseSvg(processedSvg);
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
export function svgToReactTSX(svgString: string, fileName?: string): string {
  const componentName = getComponentName(fileName);
  const { processedSvg, viewBox } = processSvg(svgString);
  const { innerContent } = parseSvg(processedSvg);
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
export function svgToVue(svgString: string, fileName?: string): string {
  const componentName = getComponentName(fileName);
  const { processedSvg, viewBox } = processSvg(svgString);
  const { innerContent } = parseSvg(processedSvg);

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
export function svgToSvelte(svgString: string): string {
  const { processedSvg, viewBox } = processSvg(svgString);
  const { innerContent } = parseSvg(processedSvg);

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
export function svgToReactNative(svgString: string, fileName?: string): string {
  const componentName = getComponentName(fileName);
  const { processedSvg, viewBox } = processSvg(svgString);
  const { innerContent } = parseSvg(processedSvg);
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
export function svgToFlutter(svgString: string, fileName?: string): string {
  const componentName = getComponentName(fileName);
  const { processedSvg } = processSvg(svgString);

  // Escape single quotes in SVG
  const escapedSvg = processedSvg.replace(/'/g, "\\'");

  // For Flutter, we'll use the entire SVG string with flutter_svg package
  // We need to format it as a multi-line string
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
