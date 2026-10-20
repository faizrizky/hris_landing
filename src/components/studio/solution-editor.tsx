"use client";

import { useMemo } from "react";

import type { SiteData } from "@/components/blocks/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { createSolutionConfig, type SolutionStudioMetadata } from "@/lib/studio/blocks/solution";
import { solutionTitle, solutionToPuck, puckToSolution } from "@/lib/studio/solution";
import type { LinkGroup } from "@/lib/studio/load";
import type { StudioLang } from "@/lib/studio/strings";
import type { Solution, Footer, Navigation, User } from "@/types/cms";

import { StudioShell, useHydrated, type StudioDocument } from "./studio-shell";
import { StudioSkeleton } from "./studio-skeleton";

export type SolutionEditorProps = {
  solution: Solution;
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

/** Editor visual sebuah solusi: empat bagian halaman detailnya, diedit langsung di halaman. */
export function SolutionEditor(props: SolutionEditorProps) {
  const hydrated = useHydrated();
  if (!hydrated) return <StudioSkeleton embedded={props.embedded} />;
  return <SolutionEditorClient {...props} />;
}

function SolutionEditorClient(props: SolutionEditorProps) {
  const { solution, locale, uiLang, embedded, cmsUrl, siteData, chrome, dictionary, fontClass, linkGroups } = props;

  const document = useMemo<StudioDocument>(() => {
    const initialData = solutionToPuck(solution);
    const snapshot = (data: typeof initialData) => JSON.stringify(puckToSolution(data, solution));
    return {
      collection: "solutions",
      id: solution.id,
      title: solutionTitle(initialData, solution.name),
      status: solution._status,
      config: createSolutionConfig({
        lang: uiLang,
        locale,
        cmsUrl,
        data: siteData,
        pageId: solution.id,
        embedded,
        linkGroups,
        backPath: `/admin/collections/solutions/${solution.id}/form`,
      }),
      metadata: {
        ctx: { locale, t: dictionary, data: siteData },
        fontClass,
        chrome,
        solution,
      } satisfies SolutionStudioMetadata,
      initialData,
      snapshot,
      initialSnapshot: snapshot(initialData),
      changes: (data) => puckToSolution(data, solution),
      livePath: () => `/solusi/${solution.slug}`,
      // Empat bagian tetap: tidak ada yang ditambah, dipindah, atau dihapus.
      permissions: { insert: false, drag: false, delete: false, duplicate: false },
      leftPanel: false,
    };
  }, [solution, uiLang, locale, cmsUrl, siteData, embedded, linkGroups, dictionary, fontClass, chrome]);

  return <StudioShell document={document} locale={locale} uiLang={uiLang} embedded={embedded} cmsUrl={cmsUrl} />;
}
