import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
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
        <p className="text-muted-foreground">Created by [Author Name]</p>
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-2xl">Open Source</h2>
        <p className="mb-4 text-muted-foreground">
          This project is open source and available on GitHub.
        </p>
        <a
          className="inline-flex items-center gap-2 text-primary hover:underline"
          href="https://github.com/[username]/tiny-svg"
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
