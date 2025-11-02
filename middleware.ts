import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { securityHeaders } from "@/lib/security"

export function middleware(request: NextRequest) {
  // Apply security headers to all responses
  const response = NextResponse.next()

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Log request for monitoring
  if (process.env.NODE_ENV === "production") {
    console.log(
      JSON.stringify({
        type: "request",
        method: request.method,
        url: request.url,
        timestamp: new Date().toISOString(),
      }),
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
