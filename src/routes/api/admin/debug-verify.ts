import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/debug-verify")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret) {
          return Response.json({ error: "No session secret" });
        }

        const isValid = await verifyAdminSessionFromRequest(request, sessionSecret);
        return Response.json({
          isValid,
          sessionSecret: `(${sessionSecret.length} chars)`,
        });
      },
    },
  },
});
