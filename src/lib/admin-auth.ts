/**
 * Admin authentication utilities - SINGLE SOURCE OF TRUTH
 * Session cookies: HMAC-SHA256 signed, HttpOnly+SameSite=Strict (+ Secure in prod)
 * All admin routes MUST use these helpers, not duplicate logic
 */

const COOKIE_NAME = "rckt-admin-session";
const SESSION_TTL_MS = 60 * 60 * 1000; // 60 minutes

/**
 * Rate limit tracker: IP -> {count, resetAt}
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

/**
 * Extract session cookie value from Cookie header
 * CRITICAL FIX: Split ONLY on first "=" to preserve Base64 padding
 * Example: rckt-admin-session=eyJ...==.sig==
 *          ^ must NOT split on the padding "=" chars
 */
export function extractSessionCookie(cookieHeader: string): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split("; ").map((cookie) => {
    const separatorIndex = cookie.indexOf("=");
    if (separatorIndex === -1) return { name: cookie, value: "" };
    const name = cookie.slice(0, separatorIndex);
    const value = cookie.slice(separatorIndex + 1);
    return { name, value };
  });

  const sessionCookie = cookies.find((c) => c.name === COOKIE_NAME);
  return sessionCookie?.value ?? null;
}

/**
 * Verify admin session from request Cookie header
 * Uses Node.js crypto for server-side HMAC-SHA256 verification
 */
export async function verifyAdminSessionFromRequest(
  request: Request,
  secret: string
): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie");
  const sessionToken = extractSessionCookie(cookieHeader || "");

  if (!sessionToken || !secret) {
    return false;
  }

  try {
    const [payloadStr, signatureStr] = sessionToken.split(".");
    if (!payloadStr || !signatureStr) {
      return false;
    }

    // Use Node.js crypto for verification
    const crypto = await import("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payloadStr)
      .digest("base64");

    if (expectedSignature !== signatureStr) {
      return false;
    }

    // Check expiry
    const payload = JSON.parse(Buffer.from(payloadStr, "base64").toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Check rate limit for an IP
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now >= limit.resetAt) {
    return false;
  }

  return limit.count >= RATE_LIMIT_MAX;
}

/**
 * Record a failed attempt for rate limiting
 */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now >= limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  } else {
    limit.count++;
  }
}

/**
 * Clear rate limit on successful authentication
 */
export function clearRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}

/**
 * Create Set-Cookie header value for session
 * Development (HTTP localhost): NO Secure flag
 * Production (HTTPS): Secure flag added
 */
export function setSessionCookie(value: string): string {
  const expiryDate = new Date(Date.now() + SESSION_TTL_MS);
  const isProduction = process.env.NODE_ENV === "production";
  const securePart = isProduction ? "; Secure" : "";

  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly${securePart}; SameSite=Strict; Expires=${expiryDate.toUTCString()}`;
}

/**
 * Create Set-Cookie header to clear session
 */
export function clearSessionCookie(): string {
  const isProduction = process.env.NODE_ENV === "production";
  const securePart = isProduction ? "; Secure" : "";

  return `${COOKIE_NAME}=; Path=/; HttpOnly${securePart}; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}
