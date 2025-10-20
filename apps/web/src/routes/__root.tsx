import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";
import Loader from "@/components/loader";
import { Toaster } from "@/components/ui/sonner";
import appCss from "@/styles.css?url";
import Header from "../components/header";

export type RouterAppContext = Record<string, never>;

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootDocument,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title:
          "Tiny SVG - Optimize Tiny SVGs & Convert React, Vue, and Svelte Code",
      },
      {
        name: "description",
        content:
          "Optimize Tiny SVGs with our online tool! Effortlessly convert your React, Vue, and Svelte code into compact and efficient SVGs. Improve your website's performance and loading speed while maintaining high-quality graphics. Try it now for free!",
      },
      {
        name: "keywords",
        content:
          "optimize tiny SVGs, online SVG tool, convert React to SVG, convert Vue to SVG, convert Svelte to SVG, compact SVGs, efficient SVGs, improve website performance, website loading speed",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
});

function RootDocument() {
  const isFetching = useRouterState({ select: (s) => s.isLoading });
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="grid h-svh grid-rows-[auto_1fr]">
            <Header />
            {isFetching ? <Loader /> : <Outlet />}
          </div>
          <Toaster richColors />
          <TanStackRouterDevtools position="bottom-left" />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
