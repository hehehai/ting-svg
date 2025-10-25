/**
 * Prettier Web Worker
 * Handles code formatting in a separate thread
 */

import type { Plugin } from "prettier";
import * as parserBabel from "prettier/plugins/babel";
import * as parserEstree from "prettier/plugins/estree";
import * as parserHtml from "prettier/plugins/html";
import * as parserTypescript from "prettier/plugins/typescript";
import * as prettier from "prettier/standalone";

type SupportedLanguage = "javascript" | "typescript" | "html" | "dart" | "svg";

type WorkerMessage = {
  id: string;
  data: {
    content: string;
    language: SupportedLanguage;
  };
};

type WorkerResponse = {
  id: string;
  success: boolean;
  data?: string;
  error?: string;
};

async function prettifyContent(
  content: string,
  language: SupportedLanguage
): Promise<string> {
  // Dart is not supported by Prettier
  if (language === "dart") {
    return content;
  }

  const parserMap: Record<SupportedLanguage, string> = {
    javascript: "babel",
    typescript: "typescript",
    html: "html",
    svg: "html",
    dart: "",
  };

  const pluginsMap: Record<
    SupportedLanguage,
    Array<string | URL | Plugin<any> | any>
  > = {
    javascript: [parserBabel, parserEstree],
    typescript: [parserTypescript, parserEstree],
    html: [parserHtml],
    svg: [parserHtml],
    dart: [],
  };

  const formatted = await prettier.format(content, {
    parser: parserMap[language],
    plugins: pluginsMap[language],
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
    printWidth: 80,
  });

  return formatted;
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { id, data } = e.data;
  const { content, language } = data;

  try {
    const formatted = await prettifyContent(content, language);

    const response: WorkerResponse = {
      id,
      success: true,
      data: formatted,
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
