import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async () => {
        try {
          return new Response(null, {
            status: 302,
            headers: {
              Location: "/ops/login",
              "Set-Cookie": "rckt-admin-session=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 UTC",
            },
          });
        } catch (e) {
          console.error("Logout error:", e);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },
    },
  },
});
