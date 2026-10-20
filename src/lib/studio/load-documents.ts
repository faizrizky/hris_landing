import "server-only";

import type { FeatureEditorProps } from "@/components/studio/feature-editor";
import type { SolutionEditorProps } from "@/components/studio/solution-editor";
import { getFooter, getNavigation, getSiteData } from "@/lib/cms/queries";
import { env } from "@/lib/env";
import { fontVariables } from "@/lib/fonts";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cmsPublicUrl } from "@/lib/studio/auth";
import { buildLinkGroups } from "@/lib/studio/load";
import type { StudioLang } from "@/lib/studio/strings";
import type { Feature, Solution, User } from "@/types/cms";

/** Dokumen yang dibuka editor selain halaman. */
export type StudioDocumentCollection = "solutions" | "features";

export type StudioDocumentLoad =
  | { status: "ok"; collection: "solutions"; props: SolutionEditorProps }
  | { status: "ok"; collection: "features"; props: FeatureEditorProps }
  | { status: "login" }
  | { status: "notFound" };

type Input = {
  collection: StudioDocumentCollection;
  id: number;
  locale: Locale;
  uiLang: StudioLang;
  embedded: boolean;
  authorization: string;
  user: User;
};

/** Semua yang dibutuhkan editor untuk satu solusi atau fitur, diambil dengan sesi editor sendiri. */
export async function loadStudioDocument({
  collection,
  id,
  locale,
  uiLang,
  embedded,
  authorization,
  user,
}: Input): Promise<StudioDocumentLoad> {
  if (!Number.isInteger(id) || id <= 0 || !env.CMS_URL) return { status: "notFound" };

  // Draf terbaru, dengan sesi editor sendiri supaya aturan akses CMS berlaku.
  const url = new URL(`/api/${collection}/${id}`, env.CMS_URL);
  url.search = new URLSearchParams({ draft: "true", depth: "2", locale, "fallback-locale": defaultLocale }).toString();
  const res = await fetch(url, { headers: { authorization }, cache: "no-store" });
  if (res.status === 401 || res.status === 403) return { status: "login" };
  if (!res.ok) return { status: "notFound" };
  const doc = await res.json();

  const [siteData, navigation, footer] = await Promise.all([getSiteData(locale), getNavigation(locale), getFooter(locale)]);
  const linkGroups = await buildLinkGroups(authorization, locale, uiLang, siteData, navigation);
  const shared = {
    locale,
    uiLang,
    embedded,
    user: { email: user.email, name: user.name },
    cmsUrl: cmsPublicUrl(),
    siteData,
    chrome: { navigation, footer },
    dictionary: getDictionary(locale),
    fontClass: fontVariables,
    linkGroups,
  };

  if (collection === "solutions") {
    return { status: "ok", collection, props: { ...shared, solution: doc as Solution } };
  }
  return { status: "ok", collection, props: { ...shared, feature: doc as Feature } };
}
