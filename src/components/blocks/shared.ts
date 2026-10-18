import { DEMO_HREF } from "@/features/site/content/labels";

export type CmsButton = { label: string; href: string; style?: "fill" | "stroke" | null };

export const TINT_CLASS: Record<string, string> = {
  white: "",
  sky: "bg-tint-sky",
  lavender: "bg-tint-lavender",
  peach: "bg-tint-peach",
  night: "bg-night text-white",
};

export const tintClass = (tint: string | null | undefined) => TINT_CLASS[tint ?? "white"] ?? "";

/** Tombol pertama dari daftar tombol blok, atau null. */
export const firstButton = (buttons: CmsButton[] | null | undefined): { label: string; href: string } | null => {
  const [first] = buttons ?? [];
  return first ? { label: first.label, href: first.href || DEMO_HREF } : null;
};

/** Link CMS: path internal dan anchor tetap, https/mailto/tel dibuka apa adanya. */
export const EXTERNAL_HREF = /^(https?:|mailto:|tel:)/i;
