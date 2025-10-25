import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {},
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: ({ children }) => <>{children}</>,
  });
  return router;
};

declare module "@tanstack/react-router" {
  type Register = {
    router: ReturnType<typeof getRouter>;
  };
}
