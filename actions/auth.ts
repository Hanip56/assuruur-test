"use server";

import { db } from "@/lib/db";
import { LoginSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const userExist = await db.user.findUnique({
    where: { name: values.username },
  });

  if (userExist) {
    return { error: "Name already in use" };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  const user = await db.user.create({
    data: {
      name: values.username,
      password: hashedPassword,
    },
  });

  if (!user) {
    return { error: "Failed to create user" };
  }

  return { success: "User Created" };
};
