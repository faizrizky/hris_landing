import type { Data } from "@puckeditor/core";

import type { Solution } from "@/types/cms";

import { toReference } from "./convert";

/**
 * Editor visual solusi dan formulir CMS mengedit dokumen yang sama. Halaman detail solusi adalah empat bagian tetap:
 *
 *   CMS:  { name, heroTitle, heroDescription, pains, points, faqs }
 *   Puck: root { title } + [ solutionHero, solutionPains, solutionPoints, solutionFaq ]
 *
 * Yang tidak tampil di editor (slug, jenis, tampil di beranda, tagline, SEO) dibiarkan apa adanya.
 */

export const SOLUTION_SECTION_IDS = ["hero", "pains", "points", "faq"] as const;

type Props = Record<string, unknown>;
type PuckItem = { type: string; props: Props & { id: string } };

const text = (value: unknown) => (typeof value === "string" ? value : "");
const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

/** Id fitur dari kolom relasi, baik sudah di-populate maupun hanya id. */
const featureId = (value: unknown): number | null => {
  if (value && typeof value === "object") return (value as { id: number }).id;
  return typeof value === "number" ? value : null;
};

export function solutionToPuck(solution: Solution): Data {
  return {
    root: { props: { title: solution.name } },
    content: [
      {
        type: "solutionHero",
        props: { id: "hero", heroTitle: text(solution.heroTitle), heroDescription: text(solution.heroDescription) },
      },
      { type: "solutionPains", props: { id: "pains", pains: list(solution.pains) } },
      {
        type: "solutionPoints",
        props: {
          id: "points",
          points: (solution.points ?? []).map((point) => ({ ...point, feature: featureId(point.feature) })),
        },
      },
      { type: "solutionFaq", props: { id: "faq", faqs: list(solution.faqs) } },
    ],
  };
}

const section = (data: Data, id: (typeof SOLUTION_SECTION_IDS)[number]): Props =>
  ((data.content as PuckItem[]).find((item) => item.props.id === id)?.props ?? {}) as Props;

/** Nama solusi yang diedit di panel "Solusi" (root Puck). */
export function solutionTitle(data: Data, fallback: string): string {
  const title = (data.root as { props?: { title?: unknown } }).props?.title;
  return typeof title === "string" && title.trim() ? title.trim() : fallback;
}

/** Isi simpanan: setiap kelompok yang tampil di editor, lengkap (sisa dokumen tidak disentuh). */
export function puckToSolution(data: Data, base: Solution): Record<string, unknown> {
  const hero = section(data, "hero");
  const pains = section(data, "pains");
  const points = section(data, "points");
  const faq = section(data, "faq");

  return {
    name: solutionTitle(data, base.name),
    heroTitle: text(hero.heroTitle),
    heroDescription: text(hero.heroDescription),
    pains: toReference(list(pains.pains)),
    points: toReference(list(points.points)),
    faqs: toReference(list(faq.faqs)),
  };
}
