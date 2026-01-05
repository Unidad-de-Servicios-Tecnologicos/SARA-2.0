import { twMerge } from "tailwind-merge";

export default function cn(...inputs) {
  return twMerge(inputs.filter(Boolean).join(" "));
}
