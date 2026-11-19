import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Joins class names and lets later Tailwind classes override earlier ones.
// Aceternity and shadcn components import this as `cn`.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Buttons and clickable cards dip slightly while pressed (not with reduced motion).
// It includes `transition`, so don't add another transition-* class next to it.
export const pressable = "transition motion-safe:active:scale-[0.97]";
