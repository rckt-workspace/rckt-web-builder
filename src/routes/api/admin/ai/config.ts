import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/ai/config")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const sessionSecret = process.env.ADMIN_SESSION_SECRET;
          if (!sessionSecret) {
            return Response.json(
              { error: "Server configuration error" },
              { status: 500 }
            );
          }

          // Verify session using centralized helper
          const isAuthenticated = await verifyAdminSessionFromRequest(
            request,
            sessionSecret
          );
          if (!isAuthenticated) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const aiServiceUrl = process.env.AI_SERVICE_URL;
          if (!aiServiceUrl) {
            return Response.json(
              { error: "AI service not configured" },
              { status: 503 }
            );
          }

          const internalSecret = process.env.RCKT_INTERNAL_SECRET;
          if (!internalSecret) {
            return Response.json(
              { error: "Server configuration error" },
              { status: 500 }
            );
          }

          // Proxy to AI service
          const response = await fetch(`${aiServiceUrl}/internal/config`, {
            method: "GET",
            headers: {
              "X-RCKT-Internal-Secret": internalSecret,
            },
          });

          const data = await response.json();
          return Response.json(data, { status: response.status });
        } catch (e) {
          console.error("Config GET error:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      PUT: async ({ request }) => {
        try {
          const sessionSecret = process.env.ADMIN_SESSION_SECRET;
          if (!sessionSecret) {
            return Response.json(
              { error: "Server configuration error" },
              { status: 500 }
            );
          }

          // Verify session using centralized helper
          const isAuthenticated = await verifyAdminSessionFromRequest(
            request,
            sessionSecret
          );
          if (!isAuthenticated) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }

          const aiServiceUrl = process.env.AI_SERVICE_URL;
          if (!aiServiceUrl) {
            return Response.json(
              { error: "AI service not configured" },
              { status: 503 }
            );
          }

          const internalSecret = process.env.RCKT_INTERNAL_SECRET;
          if (!internalSecret) {
            return Response.json(
              { error: "Server configuration error" },
              { status: 500 }
            );
          }

          const body = await request.json();

          // Proxy to AI service
          const response = await fetch(`${aiServiceUrl}/internal/config`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-RCKT-Internal-Secret": internalSecret,
            },
            body: JSON.stringify(body),
          });

          const data = await response.json();
          return Response.json(data, { status: response.status });
        } catch (e) {
          console.error("Config PUT error:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
