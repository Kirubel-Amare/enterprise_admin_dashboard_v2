import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add additional logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow landing page and auth pages without authentication
        if (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/auth')) {
          return true
        }
        return !!token // Require authentication for all other pages
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}