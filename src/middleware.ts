
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth/login") || 
                      req.nextUrl.pathname.startsWith("/auth/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    // Protect dashboard routes
    if (req.nextUrl.pathname.startsWith("/dashboard") && !isAuth) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
    
    return null
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"],
}
