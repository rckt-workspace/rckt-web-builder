/**
 * Admin BFF proxy utilities for upstream error handling.
 * Safely handles non-JSON responses from AI service without masking errors.
 */

const PROXY_TIMEOUT_MS = 30_000;

export async function proxyUpstreamResponse(
  response: Response,
  upstreamUrl: string
): Promise<Response> {
  const contentType = response.headers.get("content-type") || "";
  const upstreamStatus = response.status;
  const upstreamStatusText = response.statusText;

  // Log diagnostics server-side (no secrets exposed)
  const urlObj = new URL(upstreamUrl);
  console.error(
    `[admin-proxy] ${response.ok ? "OK" : "ERROR"}: ${urlObj.hostname} → ${upstreamStatus} ${upstreamStatusText} (${contentType})`
  );

  // If successful and Content-Type is JSON, proxy as-is
  if (response.ok && contentType.includes("application/json")) {
    try {
      const data = await response.json();
      return Response.json(data, { status: upstreamStatus });
    } catch (parseErr) {
      console.error(`[admin-proxy] JSON parse failed on 200 response:`, parseErr);
      return Response.json(
        { error: "AI service returned invalid JSON despite 200 status" },
        { status: 502 }
      );
    }
  }

  // If non-200 AND JSON, proxy the error structure
  if (!response.ok && contentType.includes("application/json")) {
    try {
      const errorData = await response.json();
      return Response.json(errorData, { status: upstreamStatus });
    } catch (parseErr) {
      console.error(
        `[admin-proxy] Non-JSON error response from ${urlObj.hostname}: ${upstreamStatus}`
      );
      return Response.json(
        {
          error: "AI service error (non-JSON response)",
          upstream_status: upstreamStatus,
        },
        { status: 502 }
      );
    }
  }

  // Non-JSON response (HTML, text, etc.)
  console.error(
    `[admin-proxy] Non-JSON response from ${urlObj.hostname}: status=${upstreamStatus}, content-type=${contentType}`
  );
  return Response.json(
    {
      error: "AI service returned non-JSON response",
      upstream_status: upstreamStatus,
    },
    { status: 502 }
  );
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = PROXY_TIMEOUT_MS, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export function handleFetchError(error: unknown): Response {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      console.error("[admin-proxy] Request timeout");
      return Response.json({ error: "AI service request timed out" }, { status: 504 });
    }
    if (
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ENOTFOUND")
    ) {
      console.error("[admin-proxy] Connection refused or DNS failed");
      return Response.json({ error: "AI service unreachable" }, { status: 502 });
    }
    console.error("[admin-proxy] Fetch error:", error.message);
  }
  return Response.json({ error: "Internal server error" }, { status: 500 });
}
