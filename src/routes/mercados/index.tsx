import { createFileRoute, redirect } from "@tanstack/react-router";

// Página retirada: redirección permanente (301) a su equivalente actual.
export const Route = createFileRoute("/mercados/")({
  beforeLoad: () => {
    throw redirect({ href: "/sectores", statusCode: 301 });
  },
});
