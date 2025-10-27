import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

export const Route = createFileRoute("/{-$locale}/about")({
  component: AboutComponent,
});

function AboutComponent() {
  const {
    title,
    whatIsSection,
    featuresSection,
    authorSection,
    dependenciesSection,
    openSourceSection,
  } = useIntlayer("about");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 font-bold text-4xl">{title}</h1>

      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">{whatIsSection.title}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {whatIsSection.description}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">{featuresSection.title}</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>{featuresSection.items.compression}</li>
          <li>{featuresSection.items.preview}</li>
          <li>{featuresSection.items.customizable}</li>
          <li>{featuresSection.items.noServer}</li>
          <li>{featuresSection.items.dragDrop}</li>
          <li>{featuresSection.items.codeDiff}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">{authorSection.title}</h2>
        <p className="text-muted-foreground">
          {authorSection.createdBy}{" "}
          <a href="https://hehehai.cn" rel="noopener" target="_blank">
            [hehehai]
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">
          {dependenciesSection.title}
        </h2>
        <p className="mb-4 text-muted-foreground">
          {dependenciesSection.description}
        </p>
        <div className="grid gap-3">
          <a
            className="text-primary hover:underline"
            href="https://github.com/svg/svgo"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.svgo}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://tanstack.com/router"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.router}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://tanstack.com/start"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.start}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://react.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.react}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://intlayer.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.intlayer}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://www.radix-ui.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.radix}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://microsoft.github.io/monaco-editor"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.monaco}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://prettier.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.prettier}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://tailwindcss.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.tailwind}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://biomejs.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.biome}
          </a>
          <a
            className="text-primary hover:underline"
            href="https://vite.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dependenciesSection.libraries.vite}
          </a>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-2xl">
          {openSourceSection.title}
        </h2>
        <p className="mb-4 text-muted-foreground">
          {openSourceSection.description}
        </p>
        <a
          className="inline-flex items-center gap-2 text-primary hover:underline"
          href="https://github.com/hehehai/ting-svg"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="i-hugeicons-github size-5" />
          {openSourceSection.viewOnGitHub}
        </a>
      </section>
    </div>
  );
}
