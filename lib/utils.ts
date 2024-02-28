import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";
import slug from "slugify";
import { format } from "date-fns";

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

export function getImageSize(
  url: string
): Promise<{ width: number; height: number }> {
  const img = document.createElement("img");

  const promise = new Promise<{ width: number; height: number }>(
    (resolve, reject) => {
      img.onload = () => {
        // Natural size is the actual image size regardless of rendering.
        // The 'normal' `width`/`height` are for the **rendered** size.
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Resolve promise with the width and height
        resolve({ width, height });
      };

      // Reject promise on error
      img.onerror = reject;
    }
  );

  // Setting the source makes it start downloading and eventually call `onload`
  img.src = url;

  return promise;
}

export function getDate(date: string) {
  return format(new Date(2014, 1, 11), "yyyy-mm-dd");
}

export function cutString(value: string, max: number) {
  return value.length > max ? value.slice(0, max) + "..." : value;
}

export function encodeSearch(value: string) {
  const v = value.trim();

  return encodeURIComponent(v).replace(/%20/g, "+");
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
