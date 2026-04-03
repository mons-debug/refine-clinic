import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n";

// In Next.js 16, middleware is called proxy. Export as default (or named `proxy`).
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for Next.js internals and static files
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
