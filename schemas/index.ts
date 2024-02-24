import * as z from "zod";

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5 mb
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  username: z.string().min(3, "Must at least 3 characters"),
  password: z.string().min(6, "Must at least 6 characters"),
});

export const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z
    .any()
    .refine((file) => file, "Image is required")
    .refine(
      (file) => !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      "Max file size is 2mb"
    )
    .refine(
      (file) =>
        !(file instanceof File) || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
  tags: z.array(z.string()),
  category: z.string().min(1, "Category is required"),
});

export const lembagaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profile: z.string().min(1, "Profile is requrired"),
  visi: z.string().min(1, "Visi is requrired"),
  moreInfo: z.string().optional(),
  image: z
    .any()
    .refine((file) => file, "Image is required")
    .refine(
      (file) => !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      "Max file size is 2mb"
    )
    .refine(
      (file) =>
        !(file instanceof File) || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});
