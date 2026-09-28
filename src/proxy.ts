import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE_NAME, isValidSessionToken } from "@/lib/the-search/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/the-search/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (isValidSessionToken(token)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/the-search")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/the-search/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/the-search/:path*", "/api/the-search/:path*"],
};
