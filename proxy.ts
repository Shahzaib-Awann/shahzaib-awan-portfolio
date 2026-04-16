import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware: protects admin routes + handles auth redirects
 */
export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Get session token (if exists)
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  const isLoggedIn = !!token;

  /**
   * Block unauthenticated access to /admin
   */
  if (!isLoggedIn && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  /**
   * Prevent logged-in users from visiting /sign-in
   */
  if (isLoggedIn && pathname === "/sign-in") {
    const callbackUrl = searchParams.get("callbackUrl");
    return NextResponse.redirect(new URL(callbackUrl || "/admin", request.url));
  }

  /**
   * Allow request through
   */
  return NextResponse.next();
}

/**
 * Apply middleware only to relevant routes
 */
export const config = {
  matcher: ["/admin/:path*", "/sign-in"], 
};