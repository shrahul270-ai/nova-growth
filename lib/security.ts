import crypto from "crypto";
import { NextRequest } from "next/server";

// Fallback secret key (in production, set ADMIN_SESSION_SECRET in env)
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "nova-growth-super-secret-cryptographic-signing-key-2025-secure";

// Fixed Admin Credentials (stored strictly on server, NEVER sent to client)
const AUTHORIZED_ADMIN_EMAILS = (
  process.env.ADMIN_AUTHORIZED_EMAILS ||
  "admin@novagrowth.agency,shrahul270@gmail.com,dd965220@gmail.com"
)
  .split(",")
  .map((e) => e.trim().toLowerCase());

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "NovaAdmin@2025";

// In-Memory Brute Force / Rate Limit Tracker
interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();
const apiRequestLimits = new Map<string, RateLimitRecord>();

// Clean up stale memory records every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of loginAttempts.entries()) {
    if (record.lockedUntil && record.lockedUntil < now) {
      loginAttempts.delete(key);
    } else if (now - record.firstAttempt > 15 * 60 * 1000) {
      loginAttempts.delete(key);
    }
  }
  for (const [key, record] of apiRequestLimits.entries()) {
    if (now - record.firstAttempt > 60 * 1000) {
      apiRequestLimits.delete(key);
    }
  }
}, 10 * 60 * 1000);

/**
 * Check and enforce rate limiting for login attempts (Brute Force Protection)
 * Max 5 failed attempts within 15 minutes, then 15-minute lockout.
 */
export function checkLoginRateLimit(identifier: string): {
  allowed: boolean;
  remainingAttempts: number;
  lockoutSeconds?: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) {
    return { allowed: true, remainingAttempts: 5 };
  }

  // Check if currently locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    const lockoutSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, lockoutSeconds };
  }

  // Reset if 15 minutes have passed
  if (now - record.firstAttempt > 15 * 60 * 1000) {
    loginAttempts.delete(identifier);
    return { allowed: true, remainingAttempts: 5 };
  }

  const remaining = Math.max(0, 5 - record.count);
  return { allowed: remaining > 0, remainingAttempts: remaining };
}

/**
 * Record a failed login attempt
 */
export function recordFailedLogin(identifier: string): {
  remainingAttempts: number;
  isLocked: boolean;
  lockoutSeconds?: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(identifier) || { count: 0, firstAttempt: now };

  record.count += 1;

  if (record.count >= 5) {
    // Lock for 15 minutes
    record.lockedUntil = now + 15 * 60 * 1000;
    loginAttempts.set(identifier, record);
    return {
      remainingAttempts: 0,
      isLocked: true,
      lockoutSeconds: 15 * 60,
    };
  }

  loginAttempts.set(identifier, record);
  return {
    remainingAttempts: 5 - record.count,
    isLocked: false,
  };
}

/**
 * Clear failed login attempts upon successful login
 */
export function resetLoginAttempts(identifier: string) {
  loginAttempts.delete(identifier);
}

/**
 * Public Form Submission Rate Limiter (Anti-DDoS / Anti-Spam)
 * Max 15 submissions per minute per IP
 */
export function checkSubmissionRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = apiRequestLimits.get(ip);

  if (!record) {
    apiRequestLimits.set(ip, { count: 1, firstAttempt: now });
    return true;
  }

  if (now - record.firstAttempt > 60 * 1000) {
    apiRequestLimits.set(ip, { count: 1, firstAttempt: now });
    return true;
  }

  record.count += 1;
  apiRequestLimits.set(ip, record);

  return record.count <= 15;
}

/**
 * Verify Admin Credentials Server-Side
 */
export function verifyAdminCredentials(email: string, pass: string): boolean {
  if (!email || !pass) return false;
  const cleanEmail = email.trim().toLowerCase();
  const isEmailValid = AUTHORIZED_ADMIN_EMAILS.includes(cleanEmail);
  const isPasswordValid = pass === ADMIN_PASSWORD;
  return isEmailValid && isPasswordValid;
}

/**
 * Create a cryptographically signed HMAC-SHA256 session token
 * Expiry: 24 hours
 */
export function createSessionToken(email: string): string {
  const now = Date.now();
  const expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours

  const payload = JSON.stringify({
    email: email.toLowerCase(),
    createdAt: now,
    expiresAt,
  });

  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

/**
 * Verify and decode an HMAC-SHA256 session token
 */
export function verifySessionToken(token: string): {
  valid: boolean;
  email?: string;
  error?: string;
} {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Missing token" };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "Malformed token" };
  }

  const [encodedPayload, providedSignature] = parts;

  // Verify HMAC signature
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const isSignatureValid = crypto.timingSafeEqual(
    Buffer.from(providedSignature),
    Buffer.from(expectedSignature)
  );

  if (!isSignatureValid) {
    return { valid: false, error: "Invalid cryptographic signature" };
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8")
    );

    if (Date.now() > payload.expiresAt) {
      return { valid: false, error: "Session expired" };
    }

    if (!AUTHORIZED_ADMIN_EMAILS.includes(payload.email)) {
      return { valid: false, error: "Unauthorized user email" };
    }

    return { valid: true, email: payload.email };
  } catch {
    return { valid: false, error: "Corrupted session payload" };
  }
}

/**
 * Guard Helper: Verifies admin session from Request Cookies or Authorization Header
 */
export function verifyAdminRequest(req: NextRequest): {
  authenticated: boolean;
  email?: string;
  error?: string;
} {
  // 1. Check HTTP-only cookie
  const cookieToken = req.cookies.get("nova_admin_token")?.value;
  if (cookieToken) {
    const check = verifySessionToken(cookieToken);
    if (check.valid) return { authenticated: true, email: check.email };
  }

  // 2. Check Authorization Header (Bearer token)
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.substring(7).trim();
    const check = verifySessionToken(bearerToken);
    if (check.valid) return { authenticated: true, email: check.email };
  }

  return { authenticated: false, error: "Unauthorized: Admin session required" };
}

/**
 * Sanitize User Inputs against XSS, null-bytes, & script injection
 */
export function sanitizeInput(input: any): any {
  if (typeof input !== "string") return input;

  return input
    .replace(/\0/g, "") // remove null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:text\/html/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/onload\s*=/gi, "")
    .replace(/onclick\s*=/gi, "")
    .replace(/onmouseover\s*=/gi, "")
    .replace(/eval\s*\(/gi, "")
    .replace(/expression\s*\(/gi, "")
    .trim();
}

/**
 * Malicious Pattern Detector (Anti-SQLi, Anti-Command Injection, Anti-Path Traversal)
 */
export function detectMaliciousPattern(input: string): boolean {
  if (!input || typeof input !== "string") return false;

  const suspiciousPatterns = [
    /(\.\.[\/\\])/, // Path traversal ../ or ..\
    /(union\s+select)/i, // SQLi union select
    /(select\s+.*\s+from\s+information_schema)/i, // SQLi schema probe
    /(waitfor\s+delay\s+)/i, // Time-based SQLi
    /(benchmark\s*\(\s*\d+\s*,)/i, // MySQL benchmark SQLi
    /(pg_sleep\s*\()/i, // Postgres SQLi
    /(\'\s*or\s*\'1\'\s*=\s*\'1)/i, // Classic SQLi ' or '1'='1
    /(\"\s*or\s*\"1\"\s*=\s*\"1)/i,
    /(exec\s*\(|execute\s*\()/i, // Command exec
    /(<script|%3cscript)/i, // Raw or URL-encoded script
    /(base64_decode|system\s*\(|passthru\s*\(|shell_exec\s*\()/i, // Web shell probes
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(input));
}

// Download Rate Limiter (Max 5 downloads per hour per IP / email)
const downloadLimits = new Map<string, { count: number; firstAttempt: number }>();

export function checkDownloadRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetMinutes: number;
} {
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;
  const record = downloadLimits.get(identifier);

  if (!record) {
    downloadLimits.set(identifier, { count: 1, firstAttempt: now });
    return { allowed: true, remaining: 4, resetMinutes: 60 };
  }

  if (now - record.firstAttempt > ONE_HOUR) {
    downloadLimits.set(identifier, { count: 1, firstAttempt: now });
    return { allowed: true, remaining: 4, resetMinutes: 60 };
  }

  if (record.count >= 5) {
    const resetMinutes = Math.ceil((ONE_HOUR - (now - record.firstAttempt)) / 60000);
    return { allowed: false, remaining: 0, resetMinutes };
  }

  record.count += 1;
  downloadLimits.set(identifier, record);
  return {
    allowed: true,
    remaining: Math.max(0, 5 - record.count),
    resetMinutes: Math.ceil((ONE_HOUR - (now - record.firstAttempt)) / 60000),
  };
}

/**
 * Validate CSRF Origin for State-Mutating Requests (POST, PUT, DELETE, PATCH)
 */
export function validateCsrfOrigin(req: NextRequest): boolean {
  const method = req.method.toUpperCase();
  if (["GET", "HEAD", "OPTIONS"].includes(method)) return true;

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");

  if (!host) return false;

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      if (originHost === host) return true;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      if (refererHost === host) return true;
    } catch {
      return false;
    }
  }

  // Same-origin default or API clients with authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader) return true;

  return false;
}
