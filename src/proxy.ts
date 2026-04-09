import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /iws-admin routes (except login) — admin only
  if (pathname.startsWith("/iws-admin") && !pathname.startsWith("/iws-admin/login")) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: request.nextUrl.protocol === "https:",
    });

    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/iws-admin/login", request.url));
    }
  }

  // Protect /members routes — any authenticated user
  if (pathname.startsWith("/members")) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: request.nextUrl.protocol === "https:",
    });

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/iws-admin/:path*", "/members/:path*"],
};
