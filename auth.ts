import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ token, session, user }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      // @ts-ignore
      if (token.user && token.user?.role) {
        // @ts-ignore
        session.user.role = token.user.role as "ADMIN" | "SUPERADMIN";
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
