import type { Locale } from "./config";

/** Teks antarmuka tetap. Isi halaman datang dari CMS, jadi kamus ini sengaja kecil. */
export type Dictionary = {
  common: { loading: string; error: string };
};

const id: Dictionary = { common: { loading: "Memuat…", error: "Terjadi kesalahan." } };

export function getDictionary(_locale: Locale): Dictionary {
  return id;
}
