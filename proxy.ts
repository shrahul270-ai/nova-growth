import { NextRequest, NextResponse } from "next/server";

// Known malicious vulnerability scanners, automated exploits, & scraping tools
const BLOCKED_USER_AGENTS = [
  "sqlmap",
  "nikto",
  "acunetix",
  "masscan",
  "wpscan",
  "dirbuster",
  "gobuster",
  "nmap",
  "zgrab",
  "censys",
  "shodan",
  "bytespider",
  "petalbot",
  "havij",
  "netsparker",
  "morfeus",
];

// Common hacker probe paths for PHP, WordPress, environment files, & backdoor scripts
const SUSPICIOUS_PATHS = [
  /\/\.env/i,
  /\/\.git/i,
  /\/wp-login\.php/i,
  /\/wp-admin/i,
  /\/xmlrpc\.php/i,
  /\/phpmyadmin/i,
  /\/pma/i,
  /\/eval-stdin\.php/i,
  /\/shell\.php/i,
  /\/setup\.php/i,
  /\/actuator/i,
  /\/\.aws/i,
  /\/\.ssh/i,
  /\/server-status/i,
  /\/config\.json/i,
];

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const userAgent = (req.headers.get("user-agent") || "").toLowerCase();

  // 1. Block Malicious Exploit Scanners & Bad Bots
  if (BLOCKED_USER_AGENTS.some((bot) => userAgent.includes(bot))) {
    return new NextResponse("Access Denied: Automated scanning detected.", { status: 403 });
  }

  // 2. Block Known Vulnerability Probe Paths
  if (SUSPICIOUS_PATHS.some((regex) => regex.test(pathname))) {
    return new NextResponse("Resource Not Found", { status: 404 });
  }

  // 3. Block SQL Injection / Command Injection Probes in URL query strings
  const fullUrl = req.nextUrl.toString();
  if (
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i.test(search) &&
    /(union|select|insert|delete|drop|update|exec|concat|script)/i.test(search)
  ) {
    return new NextResponse("Bad Request: Malicious characters detected.", { status: 400 });
  }

  // 4. Block Direct Public Access to Raw Database Files (Require verified download flow)
  if (pathname === "/nova_growth_40000_guest_posts.xlsx") {
    const referer = req.headers.get("referer") || "";
    // If user clicked or bot is directly accessing the file without coming through the app
    if (!referer || !referer.includes(req.headers.get("host") || "")) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/buyer-dashboard";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 5. Protect Private Admin Upload Tool
  if (pathname === "/upload-database") {
    const adminToken = req.cookies.get("nova_admin_token")?.value;
    if (!adminToken) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin";
      return NextResponse.redirect(loginUrl);
    }
  }

  // 6. CSRF & Origin Protection on Mutating Requests
  if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method.toUpperCase())) {
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");
    const host = req.headers.get("host");

    if (host && (origin || referer)) {
      let isAllowed = false;
      if (origin) {
        try {
          if (new URL(origin).host === host) isAllowed = true;
        } catch {}
      }
      if (!isAllowed && referer) {
        try {
          if (new URL(referer).host === host) isAllowed = true;
        } catch {}
      }

      // If origin/referer mismatch and no API authorization token, block
      const hasAuth = req.headers.get("authorization");
      if (!isAllowed && !hasAuth) {
        return new NextResponse("Cross-Site Request Forgery (CSRF) blocked.", { status: 403 });
      }
    }
  }

  // 7. Pass request and enforce strict security headers
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self), browsing-topics=()"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images & static icons
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
