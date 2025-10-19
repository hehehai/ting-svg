import type { Plugin } from "prettier";
import * as parserBabel from "prettier/plugins/babel";
import * as parserEstree from "prettier/plugins/estree";
import * as parserHtml from "prettier/plugins/html";
import * as parserTypescript from "prettier/plugins/typescript";
import * as prettier from "prettier/standalone";

export type SupportedLanguage = "javascript" | "typescript" | "html" | "dart";

/**
 * Prettify code using Prettier
 */
export async function prettifyCode(
  code: string,
  language: SupportedLanguage
): Promise<string> {
  // Dart is not supported by Prettier
  if (language === "dart") {
    return code;
  }

  const parserMap: Record<SupportedLanguage, string> = {
    javascript: "babel",
    typescript: "typescript",
    html: "html",
    dart: "",
  };

  const pluginsMap: Record<
    SupportedLanguage,
    Array<string | URL | Plugin<any> | any>
  > = {
    javascript: [parserBabel, parserEstree],
    typescript: [parserTypescript, parserEstree],
    html: [parserHtml],
    dart: [],
  };

  const formatted = await prettier.format(code, {
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
