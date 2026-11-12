import { createFileRoute, redirect } from "@tanstack/react-router";

// Página retirada: redirección permanente (301) a su equivalente actual.
export const Route = createFileRoute("/contacto")({
  beforeLoad: () => {
    throw redirect({ href: "/productos/ignition", statusCode: 301 });
  },
});
