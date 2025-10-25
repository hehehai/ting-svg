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

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <div className="grid h-svh grid-rows-[auto_1fr] overflow-x-hidden">
        <Header />
        <Outlet />
      </div>
    </IntlayerProvider>
  );
}
