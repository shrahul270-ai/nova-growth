import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createSessionToken,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginAttempts,
} from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    const identifier = `${ip}:${email}`;

    // 1. Check rate limit / brute force lock
    const rateCheck = checkLoginRateLimit(identifier);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. For security, your access is locked for ${Math.ceil(
            (rateCheck.lockoutSeconds || 900) / 60
          )} minute(s). Please try again later.`,
          locked: true,
          lockoutSeconds: rateCheck.lockoutSeconds,
        },
        { status: 429 }
      );
    }

    // 2. Validate credentials
    const isValid = verifyAdminCredentials(email, password);

    if (!isValid) {
      const failInfo = recordFailedLogin(identifier);
      if (failInfo.isLocked) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Too many invalid attempts. Your account has been temporarily locked for 15 minutes.",
            locked: true,
            remainingAttempts: 0,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Invalid email or password. ${failInfo.remainingAttempts} attempt(s) remaining before security lockout.`,
          remainingAttempts: failInfo.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // 3. Clear failed attempts on success
    resetLoginAttempts(identifier);

    // 4. Create cryptographically signed session token
    const sessionToken = createSessionToken(email);

    // 5. Send secure response with HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: email,
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("nova_admin_token", sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin Login Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal authentication error" },
      { status: 500 }
    );
  }
}
