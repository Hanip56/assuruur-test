import credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { username, password } = validateFields.data;

          const user = await db.user.findUnique({
            where: { name: username },
          });

          if (!user || !user.password) {
            return null;
          }

          const matchPassword = await bcrypt.compare(password, user.password);

          if (matchPassword) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
