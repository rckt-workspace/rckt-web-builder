import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/debug-verify")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret) {
          return Response.json(
            { error: "Server configuration error." },
            { status: 500 },
          );
        }

        const isValid = await verifyAdminSessionFromRequest(request, sessionSecret);
        if (!isValid) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        return Response.json({ ok: true }, { status: 200 });
      },
    },
  },
});
