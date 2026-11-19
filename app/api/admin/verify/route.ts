import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/security";

export async function GET(req: NextRequest) {
  try {
    const auth = verifyAdminRequest(req);

    if (auth.authenticated && auth.email) {
      return NextResponse.json({
        authenticated: true,
        user: auth.email,
      });
    }

    return NextResponse.json(
      {
        authenticated: false,
        error: auth.error || "Session not found or expired",
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
