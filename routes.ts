/**
 * An array of routes that are not protected
 * These routes do not require authentication
 */
export const publicRoutes = [
  "/",
  "/fasilitas",
  "/foto",

  "/api/comments",

  "/kontak",

  "/pendaftaran",
  "/profil",
  "/sejarah",
];

export const publicRegexs = [/\/lembaga(.*)/, /\/informasi(.*)/, /\/api(.*)/];

/**
 * An array of routes that are used for auth
 */
export const authRoutes = ["/admin"];

/**
 * The prefix for API authentication routes
 * Routes that are start with this prefix are used for API authentication purposes
 * @type {String}
 */
export const apiAuthPrefix = "/api/auth";
export const apiUploadThingPrefix = "/api/uploadthing";

/**
 * The default redirect path after loggin in
 * @type {String}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
