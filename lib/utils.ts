import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { readingTime } from "reading-time-estimator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom
// generate slug for single post
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// format date with dayjs
export const formatDate = (date: Date | string | number) => {
  return dayjs(date).format("MMMM D, YYYY");
};

// text
export function truncateText(text: string, maxLength: number = 60): string {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

//get reading time
export const getReadingTime = (text: string, speed: number = 200) => {
  const result = readingTime(text, speed);
  return result.text;
};
