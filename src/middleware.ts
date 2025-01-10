import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup" || path === "/";
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // Redirect if not authenticated
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Redirect based on role for public paths (login/signup)
  if (isPublicPath && token && role) {
    if (role === "manager") {
      return NextResponse.redirect(
        new URL("/dashboard/manager-view", request.nextUrl)
      );
    } else if (role === "staff" || role === "delivery") {
      return NextResponse.redirect(
        new URL("/dashboard/pantry-view", request.nextUrl)
      );
    }
    return NextResponse.next();
  }

  // Ensure managers can't access pantry-view
  if (role === "manager" && path === "/dashboard/pantry-view") {
    return NextResponse.redirect(
      new URL("/dashboard/manager-view", request.nextUrl)
    );
  }

  // Ensure staff can't access manager-view
  if (role === "staff" && path === "/dashboard/manager-view") {
    return NextResponse.redirect(
      new URL("/dashboard/pantry-view", request.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
};
