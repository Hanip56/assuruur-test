import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";
import slug from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const result = await imageCompression(file, options);

  return result;
}

export function isObjectId(value: string) {
  const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  return checkForHexRegExp.test(value);
}

export function slugify(value: string) {
  return slug(value, {
    strict: true,
    replacement: "-",
  });
}
