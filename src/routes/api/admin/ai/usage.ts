import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";
import { proxyUpstreamResponse, fetchWithTimeout, handleFetchError } from "@/lib/admin-proxy";

export const Route = createFileRoute("/api/admin/ai/usage")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const sessionSecret = process.env.ADMIN_SESSION_SECRET;
          if (!sessionSecret) {
            return Response.json({ error: "Server configuration error" }, { status: 500 });
          }

          const isAuthenticated = await verifyAdminSessionFromRequest(request, sessionSecret);
          if (!isAuthenticated) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const aiServiceUrl = process.env.AI_SERVICE_URL;
          if (!aiServiceUrl) {
            return Response.json({ error: "AI service not configured" }, { status: 503 });
          }

          const internalSecret = process.env.RCKT_INTERNAL_SECRET;
          if (!internalSecret) {
            return Response.json({ error: "Server configuration error" }, { status: 500 });
          }

          const url = new URL(request.url);
          const period = url.searchParams.get("period") || "today";
          const usageUrl = `${aiServiceUrl}/internal/usage?period=${encodeURIComponent(period)}`;

          const response = await fetchWithTimeout(usageUrl, {
            method: "GET",
            headers: {
              "X-RCKT-Internal-Secret": internalSecret,
            },
          });

          return await proxyUpstreamResponse(response, usageUrl);
        } catch (e) {
          return handleFetchError(e);
        }
      },
    },
  },
});
