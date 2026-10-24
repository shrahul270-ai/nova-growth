import crypto from "crypto";
import { NextRequest } from "next/server";

// Fallback secret key (in production, set ADMIN_SESSION_SECRET in env)
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "nova-growth-super-secret-cryptographic-signing-key-2025-secure";

// Fixed Admin Credentials (stored strictly on server, NEVER sent to client)
const AUTHORIZED_ADMIN_EMAILS = (
  process.env.ADMIN_AUTHORIZED_EMAILS ||
  "admin@novagrowth.agency,shrahul270@gmail.com"
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
 * Sanitize User Inputs against XSS & script injection
 */
export function sanitizeInput(input: any): any {
  if (typeof input !== "string") return input;

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/onload\s*=/gi, "")
    .replace(/onclick\s*=/gi, "")
    .replace(/eval\s*\(/gi, "")
    .trim();
}
