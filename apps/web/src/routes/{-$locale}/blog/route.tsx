import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return <Outlet />;
}
