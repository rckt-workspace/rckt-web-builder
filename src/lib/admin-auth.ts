/**
 * Admin authentication utilities - Web Crypto API compatible.
 * Session cookies: HMAC-SHA256 signed, HttpOnly+Secure+SameSite=Strict
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
 * Create an HMAC-SHA256 signed session cookie
 */
export async function createSession(secret: string): Promise<string> {
  if (!secret) {
    throw new Error("Session secret is required");
  }

  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor((Date.now() + SESSION_TTL_MS) / 1000),
  };

  const payloadStr = btoa(JSON.stringify(payload));

  // Create HMAC signature
  const encoder = new TextEncoder();
  const data = encoder.encode(payloadStr);
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, data);
  const signatureStr = btoa(String.fromCharCode(...new Uint8Array(signature)));

  return `${payloadStr}.${signatureStr}`;
}

/**
 * Verify an HMAC-SHA256 signed session cookie
 */
export async function verifySession(cookie: string, secret: string): Promise<boolean> {
  if (!cookie || !secret) {
    return false;
  }

  try {
    const [payloadStr, signatureStr] = cookie.split(".");
    if (!payloadStr || !signatureStr) {
      return false;
    }

    // Verify signature
    const encoder = new TextEncoder();
    const data = encoder.encode(payloadStr);
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signatureBinary = Uint8Array.from(atob(signatureStr), (c) => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBinary, data);

    if (!isValid) {
      return false;
    }

    // Check expiry
    const payload = JSON.parse(atob(payloadStr));
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Check and update rate limit for an IP
 */
export function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now >= limit.resetAt) {
    // No record or window expired - allow
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (limit.count >= RATE_LIMIT_MAX) {
    // Exceeded limit
    return { allowed: false };
  }

  // Increment and allow
  limit.count++;
  return { allowed: true };
}

/**
 * Set HttpOnly session cookie (server-side only)
 */
export function setSessionCookie(value: string): string {
  const expiryDate = new Date(Date.now() + SESSION_TTL_MS);
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expiryDate.toUTCString()}`;
}

/**
 * Clear session cookie (server-side only)
 */
export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}
