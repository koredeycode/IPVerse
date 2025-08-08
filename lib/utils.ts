import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (str: string, frontLen = 6, backLen = 4): string => {
  if (!str || str.length <= frontLen + backLen + 3) return str;
  return `${str.slice(0, frontLen)}...${str.slice(-backLen)}`;
};
