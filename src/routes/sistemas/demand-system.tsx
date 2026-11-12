import { createFileRoute, redirect } from "@tanstack/react-router";

// Página retirada: redirección permanente (301) a su equivalente actual.
export const Route = createFileRoute("/sistemas/demand-system")({
  beforeLoad: () => {
    throw redirect({ href: "/productos/engine", statusCode: 301 });
  },
});
