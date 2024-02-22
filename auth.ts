import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
