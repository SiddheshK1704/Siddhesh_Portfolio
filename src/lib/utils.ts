import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names (clsx) and resolves
 * conflicting Tailwind utilities (twMerge) so the last one
 * wins instead of both being applied.
 *
 * Example: cn("px-4", isActive && "px-8") -> "px-8" when active,
 * not "px-4 px-8" (which would be ambiguous CSS).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
