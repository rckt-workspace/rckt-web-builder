import { createFileRoute } from "@tanstack/react-router";

// Rate limit tracker: IP -> {count, resetAt}
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;
const SESSION_TTL_MS = 60 * 60 * 1000; // 60 minutes

function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now >= limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (limit.count >= RATE_LIMIT_MAX) {
    return { allowed: false };
  }

  limit.count++;
  return { allowed: true };
}

function setSessionCookie(value: string): string {
  const expiryDate = new Date(Date.now() + SESSION_TTL_MS);
  return `rckt-admin-session=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expiryDate.toUTCString()}`;
}

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { password } = (await request.json()) as { password?: string };
          const clientIp = request.headers.get("x-forwarded-for") || "127.0.0.1";

          // Check rate limit
          const rateCheck = checkRateLimit(clientIp.split(",")[0].trim());
          if (!rateCheck.allowed) {
            return Response.json(
              { error: "Too many login attempts. Try again later." },
              { status: 429 }
            );
          }

          // Verify password (timing-safe comparison)
          const correctSecret = process.env.ADMIN_CONTROL_SECRET;
          if (!correctSecret || !password) {
            return Response.json({ error: "Invalid credentials." }, { status: 401 });
          }

          // Timing-safe comparison
          const encoder = new TextEncoder();
          const a = encoder.encode(password || "");
          const b = encoder.encode(correctSecret);

          let timingSafe = a.length === b.length;
          for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if ((a[i] || 0) !== (b[i] || 0)) {
              timingSafe = false;
            }
          }

          if (!timingSafe) {
            return Response.json({ error: "Invalid credentials." }, { status: 401 });
          }

          // Create HMAC-SHA256 signed session token
          const sessionSecret = process.env.ADMIN_SESSION_SECRET;
          if (!sessionSecret) {
            return Response.json(
              { error: "Server configuration error." },
              { status: 500 }
            );
          }

          // Create payload
          const payload = {
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor((Date.now() + SESSION_TTL_MS) / 1000),
          };

          const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64");

          // Use Node.js crypto instead of Web Crypto API for server context
          const crypto = await import("crypto");
          const signature = crypto
            .createHmac("sha256", sessionSecret)
            .update(payloadStr)
            .digest("base64");

          const sessionToken = `${payloadStr}.${signature}`;

          // Return 302 redirect with Set-Cookie header
          return new Response(null, {
            status: 302,
            headers: {
              Location: "/ops/ai-control",
              "Set-Cookie": setSessionCookie(sessionToken),
            },
          });
        } catch (e) {
          console.error("Login error:", e);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },
    },
  },
});
