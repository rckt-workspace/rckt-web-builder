import { createFileRoute, redirect } from "@tanstack/react-router";

// Página retirada: redirección permanente (301) a su equivalente actual.
export const Route = createFileRoute("/soluciones/")({
  beforeLoad: () => {
    throw redirect({ href: "/", statusCode: 301 });
  },
});
