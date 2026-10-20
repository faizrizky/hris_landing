import type { Data } from "@puckeditor/core";

import type { Feature } from "@/types/cms";

import { toReference } from "./convert";

/**
 * Editor visual fitur dan formulir CMS mengedit dokumen yang sama. Halaman detail fitur adalah empat bagian tetap,
 * jadi data editor adalah empat item tetap (satu per kelompok isi) ditambah nama fitur:
 *
 *   CMS:  { name, heroTitle, heroDescription, mock, benefits, blocks, faqs }
 *   Puck: root { title } + [ featureHero, featureBenefits, featureBlocks, featureFaq ]
 *
 * Yang tidak tampil di editor (slug, kategori, status, fitur terkait, SEO) dibiarkan apa adanya.
 */

export const FEATURE_SECTION_IDS = ["hero", "benefits", "blocks", "faq"] as const;

type Props = Record<string, unknown>;
type PuckItem = { type: string; props: Props & { id: string } };

const text = (value: unknown) => (typeof value === "string" ? value : "");
const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

export function featureToPuck(feature: Feature): Data {
  return {
    root: { props: { title: feature.name } },
    content: [
      {
        type: "featureHero",
        props: {
          id: "hero",
          heroTitle: text(feature.heroTitle),
          heroDescription: text(feature.heroDescription),
          mockTitle: text(feature.mock?.title),
          mockRows: list(feature.mock?.rows),
          mockScreen: feature.mock?.screen ?? null,
        },
      },
      { type: "featureBenefits", props: { id: "benefits", benefits: list(feature.benefits) } },
      { type: "featureBlocks", props: { id: "blocks", blocks: list(feature.blocks) } },
      { type: "featureFaq", props: { id: "faq", faqs: list(feature.faqs) } },
    ],
  };
}

const section = (data: Data, id: (typeof FEATURE_SECTION_IDS)[number]): Props =>
  ((data.content as PuckItem[]).find((item) => item.props.id === id)?.props ?? {}) as Props;

/** Nama fitur yang diedit di panel "Fitur" (root Puck). */
export function featureTitle(data: Data, fallback: string): string {
  const title = (data.root as { props?: { title?: unknown } }).props?.title;
  return typeof title === "string" && title.trim() ? title.trim() : fallback;
}

/** Isi simpanan: setiap kelompok yang tampil di editor, lengkap (sisa dokumen tidak disentuh). */
export function puckToFeature(data: Data, base: Feature): Record<string, unknown> {
  const hero = section(data, "hero");
  const benefits = section(data, "benefits");
  const blocks = section(data, "blocks");
  const faq = section(data, "faq");

  return {
    name: featureTitle(data, base.name),
    heroTitle: text(hero.heroTitle),
    heroDescription: text(hero.heroDescription),
    mock: { title: text(hero.mockTitle), rows: toReference(list(hero.mockRows)), screen: toReference(hero.mockScreen ?? null) },
    benefits: toReference(list(benefits.benefits)),
    blocks: toReference(list(blocks.blocks)),
    faqs: toReference(list(faq.faqs)),
  };
}
