import { createFileRoute, redirect } from "@tanstack/react-router";

// Página retirada: redirección permanente (301) a su equivalente actual.
export const Route = createFileRoute("/soluciones/operacion")({
  beforeLoad: () => {
    throw redirect({ href: "/growth-os", statusCode: 301 });
  },
});
