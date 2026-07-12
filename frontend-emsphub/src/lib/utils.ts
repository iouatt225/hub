import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne les classes CSS avec prise en charge de Tailwind.
 * Combine clsx (conditions) et tailwind-merge (résolution de conflits).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
