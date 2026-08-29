import { createFileRoute } from "@tanstack/react-router";
import {
  isRateLimited,
  recordFailedAttempt,
  clearRateLimit,
  setSessionCookie,
} from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { password } = (await request.json()) as { password?: string };
          const clientIp = request.headers.get("x-forwarded-for") || "127.0.0.1";
          const normalizedIp = clientIp.split(",")[0].trim();

          // Check rate limit before verification
          if (isRateLimited(normalizedIp)) {
            return Response.json(
              { error: "Too many login attempts. Try again later." },
              { status: 429 }
            );
          }

          // Verify password (timing-safe comparison)
          const correctSecret = process.env.ADMIN_CONTROL_SECRET;
          if (!correctSecret || !password) {
            recordFailedAttempt(normalizedIp);
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
            recordFailedAttempt(normalizedIp);
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
            exp: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
          };

          const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64");

          // Use Node.js crypto for signing
          const crypto = await import("crypto");
          const signature = crypto
            .createHmac("sha256", sessionSecret)
            .update(payloadStr)
            .digest("base64");

          const sessionToken = `${payloadStr}.${signature}`;

          // Clear rate limit on successful authentication
          clearRateLimit(normalizedIp);

          // Return 200 with Set-Cookie header (not 302 redirect)
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
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
