import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  username: z.string().min(3, "Must at least 3 characters"),
  password: z.string().min(6, "Must at least 6 characters"),
});
