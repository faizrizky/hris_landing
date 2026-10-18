/**
 * Situs HRIS hanya berbahasa Indonesia. CMS menyimpan konten dalam id (utama) dan en (cadangan),
 * tetapi halaman publik belum memakai awalan bahasa.
 */
export const locales = ["id"] as const;
export type Locale = (typeof locales)[number];

/** Sama dengan bahasa utama CMS; teks yang belum diterjemahkan jatuh ke sini. */
export const defaultLocale: Locale = "id";

export const localeNames: Record<Locale, string> = {
  id: "Bahasa Indonesia",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);
