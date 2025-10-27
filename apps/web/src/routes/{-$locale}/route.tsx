import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";
import Header from "@/components/header";
import { useI18nHTMLAttributes } from "@/hooks/use-i18n-html-attrs";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes();

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  // 强制使用英语作为默认语言，防止服务器端渲染错误
  const safeLocale = locale ?? defaultLocale ?? "en";

  return (
    <IntlayerProvider locale={safeLocale}>
      <div className="grid h-svh grid-rows-[auto_1fr] overflow-x-hidden">
        <Header />
        <Outlet />
      </div>
    </IntlayerProvider>
  );
}
