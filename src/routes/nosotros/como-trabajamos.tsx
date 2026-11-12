import { createFileRoute, redirect } from "@tanstack/react-router";

// Página retirada: redirección permanente (301) a su equivalente actual.
export const Route = createFileRoute("/nosotros/como-trabajamos")({
  beforeLoad: () => {
    throw redirect({ href: "/metodo", statusCode: 301 });
  },
});
