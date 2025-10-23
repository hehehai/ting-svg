const COPY_BUTTON_RESET_DELAY = 2000;

export const mdxComponents = {
  // Headings
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="group relative mt-12 mb-6 scroll-mt-20 font-bold text-4xl text-gray-900 tracking-tight dark:text-gray-100"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="group relative mt-10 mb-5 scroll-mt-20 border-gray-200 border-b pb-3 font-bold text-3xl text-gray-900 tracking-tight dark:border-gray-800 dark:text-gray-100"
      {...props}
    >
      {props.children}
      <span className="-left-6 absolute top-0 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
        #
      </span>
    </h2>
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="group relative mt-8 mb-4 scroll-mt-20 font-semibold text-2xl text-gray-900 dark:text-gray-100"
      {...props}
    >
      {props.children}
      <span className="-left-5 absolute top-0 text-blue-500 text-xl opacity-0 transition-opacity group-hover:opacity-100">
        #
      </span>
    </h3>
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-6 mb-3 font-semibold text-gray-900 text-xl dark:text-gray-100"
      {...props}
    />
  ),

  // Paragraphs
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="my-6 text-gray-700 text-lg leading-[1.8] dark:text-gray-300"
      {...props}
    />
  ),

  // Links
  a: ({
    href = "#",
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-blue-600 underline decoration-2 decoration-blue-600/40 underline-offset-2 transition-all hover:text-blue-700 hover:decoration-blue-700/60 dark:text-blue-400 dark:decoration-blue-400/40 dark:hover:text-blue-300 dark:hover:decoration-blue-300/60"
      href={href}
      {...props}
    />
  ),

  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-8 space-y-3 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-8 ml-6 space-y-3 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => {
    const isOrdered = props.className?.includes("list-decimal");
    return (
      <li
        className="relative pl-7 leading-[1.8] marker:text-blue-600 dark:marker:text-blue-400"
        {...props}
      >
        {!isOrdered && (
          <span className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
        )}
        <span className="block">{props.children}</span>
      </li>
    );
  },

  // Blockquote
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 border-blue-500 border-l-4 bg-gradient-to-r from-blue-50/80 to-transparent py-4 pr-6 pl-6 text-gray-800 italic dark:border-blue-400 dark:from-blue-950/30 dark:text-gray-200"
      {...props}
    >
      <div className="relative">
        <span className="-left-2 -top-2 absolute font-serif text-4xl text-blue-500/20 dark:text-blue-400/20">
          "
        </span>
        {props.children}
      </div>
    </blockquote>
  ),

  // Code
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Check if it's inline code (not inside a pre tag)
    const isInline = !props.className?.includes("language-");

    if (isInline) {
      return (
        <code
          className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-pink-600 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-pink-400 dark:ring-gray-700"
          {...props}
        />
      );
    }

    return <code className="font-mono text-sm leading-relaxed" {...props} />;
  },

  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    const code = props.children;
    const language =
      typeof code === "object" && code !== null && "props" in code
        ? (code.props as { className?: string }).className?.replace(
            "language-",
            ""
          )
        : "text";

    return (
      <div className="group/pre relative my-8">
        {/* Header with language badge and copy button */}
        <div className="flex items-center justify-between rounded-t-xl border border-gray-200 border-b-0 bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2.5 dark:border-gray-700 dark:from-gray-800 dark:to-gray-850">
          {/* Language badge */}
          {language && (
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-blue-500" />
              <span className="font-mono font-semibold text-gray-700 text-xs uppercase tracking-wide dark:text-gray-300">
                {language}
              </span>
            </div>
          )}

          {/* Copy button */}
          <button
            aria-label="Copy code"
            className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1 font-medium text-gray-700 text-xs transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-95 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
            onClick={(e) => {
              const container = e.currentTarget.closest(".group\\/pre");
              const codeElement = container?.querySelector("code");
              if (codeElement?.textContent) {
                navigator.clipboard.writeText(codeElement.textContent);
                const btn = e.currentTarget;
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `
                  <svg class="size-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                `;
                setTimeout(() => {
                  btn.innerHTML = originalHTML;
                }, COPY_BUTTON_RESET_DELAY);
              }
            }}
            type="button"
          >
            <svg
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <title>Copy icon</title>
              <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
        </div>

        {/* Code block */}
        <pre
          className="overflow-x-auto rounded-b-xl border border-gray-200 bg-[#0d1117] p-6 dark:border-gray-700"
          {...props}
        >
          {props.children}
        </pre>
      </div>
    );
  },

  // Images
  img: ({
    width = 800,
    height = 600,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-10">
      <img
        alt=""
        className="h-auto max-w-full rounded-xl border border-gray-200 shadow-xl transition-transform hover:scale-[1.02] dark:border-gray-700"
        height={height}
        width={width}
        {...props}
      />
      {props.alt && (
        <figcaption className="mt-3 text-center text-gray-600 text-sm italic dark:text-gray-400">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),

  // Horizontal Rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-16 border-none before:block before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-300 before:to-transparent before:content-[''] dark:before:via-gray-700"
      {...props}
    />
  ),

  // Tables
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-10 overflow-hidden rounded-xl border border-gray-200 shadow-lg dark:border-gray-700">
      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          {...props}
        />
      </div>
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850"
      {...props}
    />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody
      className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900"
      {...props}
    />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-6 py-4 text-left font-bold text-gray-900 text-xs uppercase tracking-wider dark:text-gray-100"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-6 py-4 text-gray-700 text-sm leading-relaxed dark:text-gray-300"
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      {...props}
    />
  ),

  // Text formatting
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-gray-800 italic dark:text-gray-200" {...props} />
  ),
};
