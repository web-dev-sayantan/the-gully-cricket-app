import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name?: string) {
  return name ? name.split(" ")[0] : "";
}

export function getAbbreviatedName(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join(".");
}
