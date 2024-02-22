import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
import {
  apiAuthPrefix,
  apiUploadThingPrefix,
  authRoutes,
  publicRegexs,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiUploadThingRoute =
    nextUrl.pathname.startsWith(apiUploadThingPrefix);
  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    publicRegexs.some((regex) => regex.test(nextUrl.pathname));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isApiUploadThingRoute) {
    return;
  }

  if (isAuthRoute) {
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/admin", nextUrl));
  }

  return;
});

// Regex for determine route that need middleware
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
