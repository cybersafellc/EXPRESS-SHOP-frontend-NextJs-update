import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const isLogin = async (request: NextRequest) => {
  const token = await request.cookies.get("refresh_token");
  if (token) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  } else {
    return NextResponse.next();
  }
};

export default isLogin;
