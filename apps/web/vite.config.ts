import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [
    contentCollections(),
    intlayer(),
    intlayerMiddleware(),
    tsconfigPaths(),
    tanstackStart({
      prerender: {
        // Disable prerendering in production due to Cloudflare Workers compatibility
        // The Cloudflare plugin injects runtime-specific code that's not compatible with Node.js SSR
        enabled: mode !== "production",
        filter: ({ path }) =>
          ["blog", "about"].some((item) => path.startsWith(item)),
        failOnError: false,

        // Callback when page is successfully rendered
        onSuccess: ({ page }) => {
          // biome-ignore lint/suspicious/noConsole: <explanation>
          console.info(`Rendered ${page.path}!`);
        },
      },
    }),
    viteReact(),
    tailwindcss(),
    mode === "production" &&
      cloudflare({
        viteEnvironment: { name: "ssr" },
        persistState: true,
      }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Monaco Editor - very large dependency (~500KB)
          if (
            id.includes("@monaco-editor/react") ||
            id.includes("monaco-editor")
          ) {
            return "monaco";
          }
          // Prettier - large dependency (~1.2MB with parsers)
          if (
            id.includes("prettier/standalone") ||
            id.includes("prettier/plugins")
          ) {
            return "prettier";
          }
          // SVGO - only in workers, exclude from main bundle
          if (id.includes("svgo") && !id.includes(".worker")) {
            return "svgo";
          }
          // Radix UI components
          if (id.includes("@radix-ui")) {
            return "ui";
          }
        },
      },
    },
  },
}));
