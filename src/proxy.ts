
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "__Host-access_token";

const LOGIN_PATH = "/login";
const ADMIN_PATH = "/admin";

function redirectToLogin(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const loginUrl = new URL(LOGIN_PATH, request.url);

  loginUrl.searchParams.set("from", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

function redirectToAdmin(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(ADMIN_PATH, request.url));
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  const hasAccessToken = Boolean(
    request.cookies.get(ACCESS_TOKEN_COOKIE)?.value,
  );


  const isAdminRoute =
    pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`);

  const isLoginRoute = pathname === LOGIN_PATH;

  if (isAdminRoute && !hasAccessToken) {
    return redirectToLogin(request);
  }

  if (isLoginRoute && hasAccessToken) {
    return redirectToAdmin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
