/** Tag cache yang sama dengan hook revalidate di CMS (hris-cms `hooks/revalidateFrontend.ts`). */
export const CMS_TAGS = [
  "pages",
  "media",
  "partners",
  "solutions",
  "features",
  "site-settings",
  "navigation",
  "footer",
] as const;

export type CmsTag = (typeof CMS_TAGS)[number];

export const isCmsTag = (value: unknown): value is CmsTag =>
  typeof value === "string" && (CMS_TAGS as readonly string[]).includes(value);
