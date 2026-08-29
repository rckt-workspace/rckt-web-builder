import { createFileRoute } from "@tanstack/react-router";
import { clearSessionCookie } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async () => {
        try {
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": clearSessionCookie(),
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
