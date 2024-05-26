import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authMiddeware from "./middlewares/auth-middleware";
import resetPasswordToken from "./middlewares/reset-password-token";
import isLogin from "./middlewares/isLogin-middleware";

// midleware main
export async function middleware(request: NextRequest) {
  const url = await new URL(request.url);
  if (url.pathname.startsWith("/users/reset-password/new-password/")) {
    const resetPassToken = await resetPasswordToken(request);
    return resetPassToken;
  } else if (
    url.pathname === "/users/login" ||
    url.pathname === "/users/signup" ||
    url.pathname === "/users/reset-password"
  ) {
    const isLogins = await isLogin(request);
    return isLogins;
  } else {
    const authMiddewares = await authMiddeware(request);
    return authMiddewares;
  }
}

export const config = {
  matcher: [
    "/",
    "/shop",
    "/carts",
    "/users/reset-password/new-password/:path*",
    "/users/login",
    "/users/signup",
    "/users/reset-password",
  ],
};
