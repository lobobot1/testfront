import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { veryfyToken } from "./lib/session";

export async function middleware(request: NextRequest) {
  const session = cookies().get("session");

  const authArray = ["/login", "/register", "/forgot-password"];

  if (session) {
    const token = session.value;

    const data = await veryfyToken(token);

    if (!data && request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(request.nextUrl.origin + "/login");
    }

    const res = await fetch(process.env.USER_SERVICE_URL as string, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res && request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(request.nextUrl.origin + "/login");
    }

    if (authArray.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(request.nextUrl.origin + "/");
    }
    if (request.nextUrl.pathname.includes("/product/")) {
      const handle = request.nextUrl.pathname.split("/")[2];

      const res = await fetch(
        `${process.env.PRODUCT_SERVICE_URL as string}/name/${handle}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const product = await res.json();

      if ("error" in product) {
        return NextResponse.redirect(request.nextUrl.origin + "/");
      }
    }
  } else if (!session && !authArray.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(request.nextUrl.origin + "/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     *
     * Or the ones that match "url.extension" to exclude images and such
     */
    "/((?!_next/static|_next/image|.*\\..*).*)",
  ],
};
