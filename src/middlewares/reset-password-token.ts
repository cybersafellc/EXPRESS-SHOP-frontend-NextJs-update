import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resetPasswordTokenVerify } from "@/app/func/token";
("@/app/func/token");

const resetPasswordToken = async (request: NextRequest) => {
  const url = await new URL(request.url);
  let status: boolean = false;
  await resetPasswordTokenVerify(
    url.pathname.split("/")[4],
    (statusToken: boolean) => {
      return (status = statusToken);
    }
  );
  if (!status) {
    const response = await NextResponse.redirect(
      new URL("/users/reset-password/", request.url)
    );
    return response;
  }
  return NextResponse.next();
};

export default resetPasswordToken;
