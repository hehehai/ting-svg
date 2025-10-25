import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 font-bold text-4xl">About Tiny SVG</h1>

      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">What is Tiny SVG?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Tiny SVG is a powerful web-based SVG optimization tool that helps you
          compress and optimize your SVG files without any backend service. All
          processing happens right in your browser, ensuring your files remain
          private and secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">Features</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Fast and efficient SVG compression using SVGO</li>
          <li>Real-time preview of original and optimized SVG</li>
          <li>Fully customizable optimization settings</li>
          <li>No server required - all processing done in browser</li>
          <li>Drag and drop support</li>
          <li>Code diff viewer for before/after comparison</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">Author</h2>
        <p className="text-muted-foreground">
          Created by{" "}
          <a href="https://hehehai.cn" rel="noopener" target="_blankÏ">
            [hehehai]
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">
          Third-Party Dependencies
        </h2>
        <p className="mb-4 text-muted-foreground">
          This project is built with amazing open source libraries:
        </p>
        <div className="grid gap-3">
          <a
            className="text-primary hover:underline"
            href="https://github.com/svg/svgo"
            rel="noopener noreferrer"
            target="_blank"
          >
            SVGO - SVG optimization library
          </a>
          <a
            className="text-primary hover:underline"
            href="https://tanstack.com/router"
            rel="noopener noreferrer"
            target="_blank"
          >
            TanStack Router - Type-safe routing
          </a>
          <a
            className="text-primary hover:underline"
            href="https://tanstack.com/start"
            rel="noopener noreferrer"
            target="_blank"
          >
            TanStack Start - Full-stack React framework
          </a>
          <a
            className="text-primary hover:underline"
            href="https://react.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            React - UI library
          </a>
          <a
            className="text-primary hover:underline"
            href="https://www.radix-ui.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Radix UI - Accessible component primitives
          </a>
          <a
            className="text-primary hover:underline"
            href="https://microsoft.github.io/monaco-editor"
            rel="noopener noreferrer"
            target="_blank"
          >
            Monaco Editor - Code editor
          </a>
          <a
            className="text-primary hover:underline"
            href="https://prettier.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            Prettier - Code formatter
          </a>
          <a
            className="text-primary hover:underline"
            href="https://tailwindcss.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Tailwind CSS - Utility-first CSS framework
          </a>
          <a
            className="text-primary hover:underline"
            href="https://biomejs.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            Biome - Fast linter and formatter
          </a>
          <a
            className="text-primary hover:underline"
            href="https://vite.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            Vite - Build tool
          </a>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-2xl">Open Source</h2>
        <p className="mb-4 text-muted-foreground">
          This project is open source and available on GitHub.
        </p>
        <a
          className="inline-flex items-center gap-2 text-primary hover:underline"
          href="https://github.com/hehehai/ting-svg"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="i-hugeicons-github size-5" />
          View on GitHub
        </a>
      </section>
    </div>
  );
}
