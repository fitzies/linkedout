import { NextRequest, NextResponse } from "next/server";

function isAuthenticated(request: NextRequest): boolean {
  let user = request.cookies.get("user")?.value;
  if (user) {
    return true;
  } else {
    return false;
  }
}

export function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    // If the user is not authenticated, redirect them to the login page.
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // If the user is authenticated, proceed with the request.
  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs", "/messages", "/profile"],
};
