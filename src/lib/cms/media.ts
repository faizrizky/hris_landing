import type { Media } from "@/types/cms";

export type MediaField = number | Media | null | undefined;

const CMS_MEDIA_PATH = "/api/media/file/";

/**
 * File media dilayani lewat jalur landing sendiri (next.config meneruskannya ke CMS), bukan alamat CMS langsung.
 * Dengan begitu gambar tetap muncul saat situs dibuka dari alamat IP atau HP, tempat "localhost" CMS tidak terjangkau.
 */
function toSiteMediaUrl(url: string): string {
  try {
    const { pathname, search } = new URL(url);

    return pathname.startsWith(CMS_MEDIA_PATH) ? `${pathname}${search}` : url;
  } catch {
    return url;
  }
}

/** A populated media document, or null when it's missing / not populated. */
export function asMedia(field: MediaField): Media | null {
  return field && typeof field === "object" && field.url ? { ...field, url: toSiteMediaUrl(field.url) } : null;
}

export function mediaUrl(field: MediaField): string | undefined {
  return asMedia(field)?.url ?? undefined;
}

/** MIME type of a populated media document (e.g. for a <video> <source>). */
export function mediaType(field: MediaField): string | undefined {
  return asMedia(field)?.mimeType ?? undefined;
}

export function mediaAlt(field: MediaField, fallback = ""): string {
  return asMedia(field)?.alt || fallback;
}

/** Keep only related docs Payload populated (drops bare IDs of deleted/unpublished docs). */
export function populated<T extends { id: number }>(items: (number | T)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => typeof item === "object" && item !== null);
}
