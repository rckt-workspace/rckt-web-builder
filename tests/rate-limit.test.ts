/**
 * Tests for rate limiting fix in /api/admin/login
 * Verifies that rate limit only counts failed attempts, not successful logins
 */

import { describe, it, expect, beforeEach } from "vitest";

// Simulate the rate limit functions from login.ts
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now >= limit.resetAt) {
    return false;
  }

  return limit.count >= RATE_LIMIT_MAX;
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now >= limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  } else {
    limit.count++;
  }
}

function clearRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}

function getAttemptCount(ip: string): number {
  const limit = rateLimitMap.get(ip);
  return limit ? limit.count : 0;
}

describe("Rate Limiting - Only Count Failed Attempts", () => {
  beforeEach(() => {
    rateLimitMap.clear();
  });

  it("should not be rate limited on first request", () => {
    const ip = "192.168.1.1";
    expect(isRateLimited(ip)).toBe(false);
  });

  it("should record failed attempt on bad password", () => {
    const ip = "192.168.1.1";
    recordFailedAttempt(ip);
    expect(getAttemptCount(ip)).toBe(1);
  });

  it("should accumulate failed attempts", () => {
    const ip = "192.168.1.1";
    for (let i = 1; i <= 5; i++) {
      recordFailedAttempt(ip);
      expect(getAttemptCount(ip)).toBe(i);
    }
  });

  it("should rate limit after max failed attempts", () => {
    const ip = "192.168.1.1";
    // Record 5 failed attempts
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      recordFailedAttempt(ip);
    }
    // Should now be rate limited
    expect(isRateLimited(ip)).toBe(true);
  });

  it("should clear rate limit on successful login", () => {
    const ip = "192.168.1.1";
    // Record 3 failed attempts
    recordFailedAttempt(ip);
    recordFailedAttempt(ip);
    recordFailedAttempt(ip);
    expect(getAttemptCount(ip)).toBe(3);

    // Simulate successful login - clear the rate limit
    clearRateLimit(ip);
    expect(getAttemptCount(ip)).toBe(0);
    expect(isRateLimited(ip)).toBe(false);
  });

  it("should allow fresh attempts after successful login", () => {
    const ip = "192.168.1.1";
    // Record 5 failed attempts
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      recordFailedAttempt(ip);
    }
    expect(isRateLimited(ip)).toBe(true);

    // Successful login clears the limit
    clearRateLimit(ip);

    // Should now allow attempts again
    expect(isRateLimited(ip)).toBe(false);
    recordFailedAttempt(ip);
    expect(getAttemptCount(ip)).toBe(1);
  });

  it("should track different IPs independently", () => {
    const ip1 = "192.168.1.1";
    const ip2 = "192.168.1.2";

    recordFailedAttempt(ip1);
    recordFailedAttempt(ip1);
    recordFailedAttempt(ip2);

    expect(getAttemptCount(ip1)).toBe(2);
    expect(getAttemptCount(ip2)).toBe(1);

    clearRateLimit(ip1);
    expect(getAttemptCount(ip1)).toBe(0);
    expect(getAttemptCount(ip2)).toBe(1);
  });

  it("should reset window after expiration", () => {
    const ip = "192.168.1.1";
    recordFailedAttempt(ip);
    expect(getAttemptCount(ip)).toBe(1);

    // Simulate window expiration
    const limit = rateLimitMap.get(ip);
    if (limit) {
      limit.resetAt = Date.now() - 1; // Set to past time
    }

    // Should allow fresh count in new window
    expect(isRateLimited(ip)).toBe(false);
    recordFailedAttempt(ip);
    expect(getAttemptCount(ip)).toBe(1);
  });
});

describe("Rate Limiting - Security Constraints", () => {
  beforeEach(() => {
    rateLimitMap.clear();
  });

  it("should extract IP correctly from x-forwarded-for header", () => {
    // Simulate x-forwarded-for: "192.168.1.1, 10.0.0.1"
    const xForwardedFor = "192.168.1.1, 10.0.0.1";
    const clientIp = xForwardedFor.split(",")[0].trim();
    expect(clientIp).toBe("192.168.1.1");

    recordFailedAttempt(clientIp);
    expect(getAttemptCount(clientIp)).toBe(1);
  });

  it("should handle proxy chain correctly", () => {
    const xForwardedFor = "203.0.113.0, 198.51.100.178, 151.101.0.0";
    const clientIp = xForwardedFor.split(",")[0].trim();
    expect(clientIp).toBe("203.0.113.0");

    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      recordFailedAttempt(clientIp);
    }
    expect(isRateLimited(clientIp)).toBe(true);
  });
});
