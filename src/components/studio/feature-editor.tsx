"use client";

import { useMemo } from "react";

import type { SiteData } from "@/components/blocks/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { createFeatureConfig, type FeatureStudioMetadata } from "@/lib/studio/blocks/feature";
import { featureTitle, featureToPuck, puckToFeature } from "@/lib/studio/feature";
import type { LinkGroup } from "@/lib/studio/load";
import type { StudioLang } from "@/lib/studio/strings";
import type { Feature, Footer, Navigation, User } from "@/types/cms";

import { StudioShell, useHydrated, type StudioDocument } from "./studio-shell";
import { StudioSkeleton } from "./studio-skeleton";

export type FeatureEditorProps = {
  feature: Feature;
  locale: Locale;
  uiLang: StudioLang;
  embedded: boolean;
  user: Pick<User, "email" | "name">;
  cmsUrl: string;
  siteData: SiteData;
  chrome: { navigation: Navigation | null; footer: Footer | null };
  dictionary: Dictionary;
  fontClass: string;
  linkGroups: LinkGroup[];
};

/** Editor visual sebuah fitur: empat bagian halaman detailnya, diedit langsung di halaman. */
export function FeatureEditor(props: FeatureEditorProps) {
  const hydrated = useHydrated();
  if (!hydrated) return <StudioSkeleton embedded={props.embedded} />;
  return <FeatureEditorClient {...props} />;
}

function FeatureEditorClient(props: FeatureEditorProps) {
  const { feature, locale, uiLang, embedded, cmsUrl, siteData, chrome, dictionary, fontClass, linkGroups } = props;

  const document = useMemo<StudioDocument>(() => {
    const initialData = featureToPuck(feature);
    const snapshot = (data: typeof initialData) => JSON.stringify(puckToFeature(data, feature));
    return {
      collection: "features",
      id: feature.id,
      title: featureTitle(initialData, feature.name),
      status: feature._status,
      config: createFeatureConfig({
        lang: uiLang,
        locale,
        cmsUrl,
        data: siteData,
        pageId: feature.id,
        embedded,
        linkGroups,
        backPath: `/admin/collections/features/${feature.id}/form`,
      }),
      metadata: {
        ctx: { locale, t: dictionary, data: siteData },
        fontClass,
        chrome,
        feature,
      } satisfies FeatureStudioMetadata,
      initialData,
      snapshot,
      initialSnapshot: snapshot(initialData),
      changes: (data) => puckToFeature(data, feature),
      livePath: () => `/fitur/${feature.slug}`,
      // Empat bagian tetap: tidak ada yang ditambah, dipindah, atau dihapus.
      permissions: { insert: false, drag: false, delete: false, duplicate: false },
      leftPanel: false,
    };
  }, [feature, uiLang, locale, cmsUrl, siteData, embedded, linkGroups, dictionary, fontClass, chrome]);

  return <StudioShell document={document} locale={locale} uiLang={uiLang} embedded={embedded} cmsUrl={cmsUrl} />;
}
