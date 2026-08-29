import { createFileRoute } from "@tanstack/react-router";
import { extractSessionCookie } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/debug")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const cookieHeader = request.headers.get("cookie");
        const sessionToken = extractSessionCookie(cookieHeader || "");
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;

        return Response.json({
          cookieHeader: cookieHeader ? `(present, ${cookieHeader.length} chars)` : "(missing)",
          sessionToken: sessionToken ? `(${sessionToken.length} chars)` : "(extracted: null)",
          sessionSecret: sessionSecret ? "(set)" : "(missing)",
          rawCookie: cookieHeader,
        });
      },
    },
  },
});
