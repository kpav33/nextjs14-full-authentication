// Export next-auth middleware
export { default } from "next-auth/middleware";

// Export config object to specify, which pages should be auth protected, without this config, all pages would be protected
// In config object you can use regex to match multiple routes, /admin/:path* => Every page that starts with /admin will be protected
export const config = {
  matcher: ["/profile", "/admin/:path*"],
};
