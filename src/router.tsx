import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Marca del inicio de la navegación más reciente. La restauración de scroll
  // solo se permite durante un instante tras navegar: si algún match tarda en
  // montar (p. ej. chunks en frío en desarrollo), una restauración tardía no
  // debe devolver la página al inicio cuando el usuario ya hizo scroll.
  let lastNavigationAt = Date.now();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: () => Date.now() - lastNavigationAt < 1200,
    defaultPreloadStaleTime: 0,
  });

  router.subscribe("onBeforeLoad", () => {
    lastNavigationAt = Date.now();
  });

  return router;
};
