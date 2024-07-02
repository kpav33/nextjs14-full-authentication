// Export next-auth middleware
export { default } from "next-auth/middleware";

// Export config object to specify, which pages should be auth protected, without this config, all pages would be protected
// In config object you can use regex to match multiple routes, /admin/:path* => Every page that starts with /admin will be protected
export const config = {
  matcher: ["/profile", "/admin/:path*", "/user/:path*"],
};

// // With authorization as well not just authentication
// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log("token: ", req.nextauth.token);

//     if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
//       return NextResponse.rewrite(
//         new URL("/auth/login?message=You Are Not Authorized!", req.url)
//       );
//     if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
//       return NextResponse.rewrite(
//         new URL("/auth/login?message=You Are Not Authorized!", req.url)
//       );
//   },
//   {
//     callbacks: {
//        // This function is an authentication check and the middleware function above it, is the authorization check
//       authorized: ({ token }) => !!token,
//     },
//   }
// );
