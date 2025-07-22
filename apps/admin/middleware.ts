import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const token = await getToken({ req })
  const isAuth = !!token

  const protectedPaths = ["/dashboard", "/admin"]
  const pathname = req.nextUrl.pathname

  if (protectedPaths.some(path => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
