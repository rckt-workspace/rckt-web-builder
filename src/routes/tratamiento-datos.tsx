import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tratamiento-datos")({
  beforeLoad: () => {
    throw redirect({ to: "/legal/privacidad", replace: true });
  },
});
