import { accessTokenVerify, getNewAccessToken } from "@/app/func/token";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// main
const authMiddeware = async (request: NextRequest) => {
  const access_token = await request.cookies.get("access_token");
  const refresh_token = await request.cookies.get("refresh_token");

  let responseCAT: boolean = false;
  await accessTokenVerify(
    access_token?.value || "cookie-exp2389e3hd923rg29",
    (status: boolean) => {
      return (responseCAT = status);
    }
  );

  if (!responseCAT) {
    let newAccessToken: boolean | string = false;
    await getNewAccessToken(
      refresh_token?.value || "cookie-exp2389e3hd923rg29",
      (err: any, tokenAT: any) => {
        if (err) {
          newAccessToken = false;
          return;
        } else if (tokenAT) {
          newAccessToken = tokenAT;
          return;
        }
      }
    );

    if (!newAccessToken) {
      const ressss = NextResponse.redirect(
        new URL("/users/login", request.url)
      );
      ressss.cookies.delete("refresh_token");
      ressss.cookies.delete("access_token");
      return ressss;
    }

    const ressss = NextResponse.next();
    ressss.cookies.set("access_token", newAccessToken); // pengujian ini nanti
    return ressss;
  }

  return NextResponse.next();
};

export default authMiddeware;
