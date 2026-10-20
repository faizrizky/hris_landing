import "server-only";

import { cache } from "react";

import { cmsConfigured, cmsFetch, type PaginatedDocs } from "@/lib/cms/client";
import type { CmsTag } from "@/lib/cms/tags";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import type { Feature, Footer, Navigation, Page, Partner, SiteSetting, Solution } from "@/types/cms";

// Halaman memuat media, partner, fitur, dan solusi; perubahan salah satunya harus menyegarkan halaman.
const PAGE_TAGS: CmsTag[] = ["pages", "media", "partners", "features", "solutions"];

const published = { "where[_status][equals]": "published" };
const inLocale = (locale: Locale) => ({ locale, "fallback-locale": defaultLocale });

export const getPage = cache(async (slug: string, locale: Locale): Promise<Page | null> => {
  if (!cmsConfigured) return null;
  const { docs } = await cmsFetch<PaginatedDocs<Page>>("/api/pages", {
    query: { ...published, ...inLocale(locale), "where[slug][equals]": slug, depth: 2, limit: 1 },
    tags: PAGE_TAGS,
  });
  return docs[0] ?? null;
});

export async function getPageSlugs(): Promise<string[]> {
  if (!cmsConfigured) return [];
  const { docs } = await cmsFetch<PaginatedDocs<Pick<Page, "slug">>>("/api/pages", {
    query: { ...published, "select[slug]": true, depth: 0, limit: 200 },
    tags: ["pages"],
  });
  return docs.map((d) => d.slug);
}

/** Slug dan waktu ubah tiap halaman terbit, untuk sitemap. */
export async function getPagesForSitemap(): Promise<Pick<Page, "slug" | "updatedAt">[]> {
  if (!cmsConfigured) return [];
  const { docs } = await cmsFetch<PaginatedDocs<Pick<Page, "slug" | "updatedAt">>>("/api/pages", {
    query: { ...published, "select[slug]": true, "select[updatedAt]": true, depth: 0, limit: 200 },
    tags: ["pages"],
  });
  return docs;
}

export const getFeatures = cache(async (locale: Locale): Promise<Feature[]> => {
  if (!cmsConfigured) return [];
  const { docs } = await cmsFetch<PaginatedDocs<Feature>>("/api/features", {
    query: { ...published, ...inLocale(locale), sort: "_order", depth: 1, limit: 200 },
    tags: ["features", "media"],
  });
  return docs;
});

export const getFeature = cache(async (slug: string, locale: Locale) => {
  const features = await getFeatures(locale);
  return features.find((feature) => feature.slug === slug) ?? null;
});

export const getSolutions = cache(async (locale: Locale): Promise<Solution[]> => {
  if (!cmsConfigured) return [];
  const { docs } = await cmsFetch<PaginatedDocs<Solution>>("/api/solutions", {
    query: { ...published, ...inLocale(locale), sort: "_order", depth: 1, limit: 100 },
    tags: ["solutions", "features", "media"],
  });
  return docs;
});

export const getSolution = cache(async (slug: string, locale: Locale) => {
  const solutions = await getSolutions(locale);
  return solutions.find((solution) => solution.slug === slug) ?? null;
});

export const getPartners = cache(async (locale: Locale): Promise<Partner[]> => {
  if (!cmsConfigured) return [];
  const { docs } = await cmsFetch<PaginatedDocs<Partner>>("/api/partners", {
    query: { ...published, ...inLocale(locale), sort: "_order", depth: 1, limit: 100 },
    tags: ["partners", "media"],
  });
  return docs;
});

export const getSiteSettings = cache(async (locale: Locale): Promise<SiteSetting | null> => {
  if (!cmsConfigured) return null;
  return cmsFetch<SiteSetting>("/api/globals/site-settings", {
    query: { ...inLocale(locale), depth: 1 },
    tags: ["site-settings", "media"],
  });
});

export const getNavigation = cache(async (locale: Locale): Promise<Navigation | null> => {
  if (!cmsConfigured) return null;
  return cmsFetch<Navigation>("/api/globals/navigation", {
    query: { ...inLocale(locale), depth: 1 },
    tags: ["navigation", "media"],
  });
});

export const getFooter = cache(async (locale: Locale): Promise<Footer | null> => {
  if (!cmsConfigured) return null;
  return cmsFetch<Footer>("/api/globals/footer", {
    query: { ...inLocale(locale), depth: 0 },
    tags: ["footer"],
  });
});

/** Data bersama yang dibutuhkan beberapa blok selain isinya sendiri (daftar fitur, solusi, kontak). */
export async function getSiteData(locale: Locale) {
  const [partners, features, solutions, settings] = await Promise.all([
    getPartners(locale),
    getFeatures(locale),
    getSolutions(locale),
    getSiteSettings(locale),
  ]);
  return { partners, features, solutions, settings };
}
