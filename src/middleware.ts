import { NextRequest, NextResponse } from "next/server";

function isAuthenticated(request: NextRequest): boolean {
  let user = request.cookies.get("user")?.value;
  if (user) {
    return true;
  } else {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (!isAuthenticated(request)) {
    // If the user is not authenticated, redirect them to the login page.
    return await NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // If the user is authenticated, proceed with the request.
  return await NextResponse.next();
}

export const config = {
  matcher: ["/jobs", "/messages", "/profile"],
};
