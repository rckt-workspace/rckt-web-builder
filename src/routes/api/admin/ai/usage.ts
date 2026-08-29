import { createFileRoute } from "@tanstack/react-router";

const COOKIE_NAME = "rckt-admin-session";
const SESSION_TTL_MS = 60 * 60 * 1000;

async function verifyAdminSession(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return false;
  }

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const [key, value] = c.split("=");
      return [key, value];
    })
  );

  const sessionToken = cookies[COOKIE_NAME];
  if (!sessionToken) {
    return false;
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!sessionSecret) {
    return false;
  }

  try {
    const [payloadStr, signatureStr] = sessionToken.split(".");
    if (!payloadStr || !signatureStr) {
      return false;
    }

    const crypto = await import("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", sessionSecret)
      .update(payloadStr)
      .digest("base64");

    if (expectedSignature !== signatureStr) {
      return false;
    }

    const payload = JSON.parse(Buffer.from(payloadStr, "base64").toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

export const Route = createFileRoute("/api/admin/ai/usage")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const isAuthenticated = await verifyAdminSession(request);
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
          const period = url.searchParams.get("period") || "day";

          const response = await fetch(
            `${aiServiceUrl}/internal/usage?period=${encodeURIComponent(period)}`,
            {
              method: "GET",
              headers: {
                "X-RCKT-Internal-Secret": internalSecret,
              },
            }
          );

          const data = await response.json();
          return Response.json(data, { status: response.status });
        } catch (e) {
          console.error("Usage GET error:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
