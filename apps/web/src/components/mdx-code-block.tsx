import { useState } from "react";
import { useIntlayer } from "react-intlayer";

const COPY_BUTTON_RESET_DELAY = 2000;

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
};

export function CodeBlock(props: CodeBlockProps) {
  const { copy, copied } = useIntlayer("blog");
  const [isCopied, setIsCopied] = useState(false);
  const code = props.children;
  const language =
    props["data-language"] ||
    (typeof code === "object" && code !== null && "props" in code
      ? (code.props as { className?: string }).className?.replace(
          "language-",
          ""
        )
      : "text");

  return (
    <div className="group/pre relative my-6 w-[calc(100vw-2rem)] max-w-[calc(100vw+2rem)] rounded-xl md:mx-0 md:my-8 md:w-full md:max-w-full">
      {/* Header with language badge and copy button */}
      <div className="flex w-full items-center justify-between rounded-t-none border border-gray-200 border-b-0 bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-2 md:rounded-t-lg md:px-4 md:py-2.5 dark:border-gray-700 dark:from-gray-800 dark:to-gray-850">
        {/* Language badge */}
        {language && (
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="size-1.5 rounded-full bg-blue-500 md:size-2" />
            <span className="font-mono font-semibold text-[10px] text-gray-700 uppercase tracking-wide md:text-xs dark:text-gray-300">
              {language}
            </span>
          </div>
        )}

        {/* Copy button */}
        <button
          aria-label="Copy code"
          className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-0.5 font-medium text-[10px] text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-95 md:gap-1.5 md:px-2.5 md:py-1 md:text-xs dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
          onClick={(e) => {
            const container = e.currentTarget.closest(".group\\/pre");
            const codeElement = container?.querySelector("code");
            if (codeElement?.textContent) {
              navigator.clipboard.writeText(codeElement.textContent);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, COPY_BUTTON_RESET_DELAY);
            }
          }}
          type="button"
        >
          {isCopied ? (
            <>
              <svg
                className="size-3 md:size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <title>Check icon</title>
                <path d="M5 13l4 4L19 7" />
              </svg>
              {copied}
            </>
          ) : (
            <>
              <svg
                className="size-3 md:size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <title>Copy icon</title>
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copy}
            </>
          )}
        </button>
      </div>

      {/* Code block */}
      <pre
        className="w-full overflow-x-auto border border-gray-200 bg-[#0d1117] text-[13px] md:w-full md:max-w-full md:text-sm dark:border-gray-700"
        {...props}
      >
        {props.children}
      </pre>
    </div>
  );
}
