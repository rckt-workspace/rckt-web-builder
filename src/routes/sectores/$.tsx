import { createFileRoute, redirect } from "@tanstack/react-router";

// Cualquier subpágina de sector que ya no exista vuelve al índice de sectores.
export const Route = createFileRoute("/sectores/$")({
  beforeLoad: () => {
    throw redirect({ href: "/sectores", statusCode: 301 });
  },
});
