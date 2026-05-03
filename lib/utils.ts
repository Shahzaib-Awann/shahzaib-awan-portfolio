import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Github Contribution Hover Date Formater
export function formatDateWithSuffix(dateString: string | Date) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${month} ${day}${suffix}`;
}


export const safeImage = (src?: string | null) => {
  if (!src || src === "") {
    return "https://placehold.co/600x400.png";
  }

  if (src.startsWith("http")) return src;

  return "https://placehold.co/600x400.png";
};