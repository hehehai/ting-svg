import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [
    mode === "production" &&
      cloudflare({
        viteEnvironment: { name: "ssr" },
        persistState: true,
      }),
    tsconfigPaths(),
    tanstackStart(),
    viteReact(),
    tailwindcss(),
  ].filter(Boolean),
}));
