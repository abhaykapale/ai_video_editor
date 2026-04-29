import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/dist/server/web/spec-extension/response"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const {pathname} = new URL(req.url)

        // Allow access to public routes
        if (pathname.startsWith("/api/auth") 
        || pathname.startsWith("/register")
        || pathname.startsWith("/login")
        || pathname.startsWith("/forgot-password")
        || pathname.startsWith("/reset-password")
        ) {
          return true
        }

        if(pathname==="/" || pathname.startsWith("/api/videos"))
        {            
            return true;
        }

        return !!token
    }
    },
  },
)

export const config = { 
    matcher: [
    
        "/admin"



    ] }