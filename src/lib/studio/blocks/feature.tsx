"use client";

import { createUsePuck, type ComponentConfig, type Config } from "@puckeditor/core";

import {
  FeatureBenefitsSection,
  FeatureBlocksSection,
  FeatureFaqSection,
  FeatureHeroSection,
} from "@/components/blocks/FeatureDetail";
import { PageSettingsField } from "@/components/studio/fields";
import type { Feature } from "@/types/cms";

import { createFields, type StudioContext } from "./fields";
import { meta, type AnyProps, type StudioMetadata } from "./metadata";
import { renderStudioRoot } from "./root";

/** Metadata kanvas sebuah fitur: milik situs, ditambah fitur yang dimuat. */
export type FeatureStudioMetadata = StudioMetadata & { feature: Feature };

const usePuck = createUsePuck();

type Item = { props: AnyProps & { id: string } };

/** Props polos salah satu bagian, sebagaimana dipegang editor sekarang. */
function useSection(id: string): AnyProps {
  return usePuck((s) => ((s.appState.data.content as Item[]).find((i) => i.props.id === id)?.props ?? {}) as AnyProps);
}

export function createFeatureConfig(context: StudioContext & { backPath: string }): Config {
  const { lang, locale, cmsUrl, embedded, backPath } = context;
  const f = createFields(context);
  const { s, L, text, textarea, plain, list } = f;

  const Hero = ({ puck, ...props }: AnyProps & { puck: { metadata: unknown } }) => {
    const { feature } = meta(puck) as FeatureStudioMetadata;
    return (
      <FeatureHeroSection
        title={String(props.heroTitle ?? "")}
        description={String(props.heroDescription ?? "")}
        availability={feature.availability}
        category={feature.category}
        mock={{ title: String(props.mockTitle ?? ""), rows: (props.mockRows as never) ?? [] }}
      />
    );
  };

  const Benefits = ({ puck, ...props }: AnyProps & { puck: { metadata: unknown } }) => {
    const { feature } = meta(puck) as FeatureStudioMetadata;
    return <FeatureBenefitsSection benefits={(props.benefits as never) ?? []} category={feature.category} />;
  };

  const Blocks = ({ puck: _puck, ...props }: AnyProps & { puck: { metadata: unknown } }) => {
    const hero = useSection("hero");
    return (
      <FeatureBlocksSection
        blocks={(props.blocks as never) ?? []}
        mock={{ title: String(hero.mockTitle ?? ""), rows: (hero.mockRows as never) ?? [] }}
      />
    );
  };

  const Faq = ({ puck: _puck, ...props }: AnyProps & { puck: { metadata: unknown } }) => (
    <FeatureFaqSection faqs={(props.faqs as never) ?? []} />
  );

  const components: Record<string, ComponentConfig<AnyProps>> = {
    featureHero: {
      label: L("Hero", "Hero"),
      fields: {
        heroTitle: text("Page title (H1)", "Judul halaman (H1)"),
        heroDescription: textarea("Description", "Deskripsi"),
        mockTitle: text("Phone panel title", "Judul panel HP"),
        mockRows: list(
          "Phone panel rows",
          "Baris panel HP",
          { label: text("Title", "Judul"), detail: text("Detail", "Keterangan"), status: text("Status", "Status") },
          "label",
          { label: L("Row", "Baris"), detail: "", status: "" },
          6,
        ),
      },
      render: Hero as never,
    },
    featureBenefits: {
      label: L("Benefits", "Manfaat utama"),
      fields: {
        benefits: list(
          "Benefits",
          "Manfaat",
          { title: text("Title", "Judul"), description: textarea("Description", "Deskripsi") },
          "title",
          { title: L("Benefit", "Manfaat"), description: "" },
          6,
        ),
      },
      render: Benefits as never,
    },
    featureBlocks: {
      label: L("Explanation blocks", "Blok penjelasan"),
      fields: {
        blocks: list(
          "Blocks",
          "Blok",
          {
            title: text("Title", "Judul"),
            description: textarea("Description", "Deskripsi"),
            points: list(
              "Points",
              "Poin-poin",
              { text: text("Point", "Poin") },
              "text",
              { text: L("Point", "Poin") },
              8,
            ),
          },
          "title",
          { title: L("Block", "Blok"), description: "", points: [] },
          6,
        ),
      },
      render: Blocks as never,
    },
    featureFaq: {
      label: "FAQ",
      fields: {
        faqs: list(
          "Questions",
          "Pertanyaan",
          { question: text("Question", "Pertanyaan"), answer: textarea("Answer", "Jawaban") },
          "question",
          { question: L("New question", "Pertanyaan baru"), answer: "" },
          8,
        ),
      },
      render: Faq as never,
    },
  };

  return {
    components,
    root: {
      fields: {
        title: plain("Feature name", "Nama fitur"),
        settings: {
          type: "custom",
          label: L("Editor", "Editor"),
          render: () => (
            <>
              <PageSettingsField lang={lang} locale={locale} cmsUrl={cmsUrl} backPath={backPath} embedded={embedded} s={s} />
              <p className="studio-note">
                {L(
                  "Address (slug), category, status, short description, related features and SEO are in the Form tab.",
                  "Alamat (slug), kategori, status, deskripsi singkat, fitur terkait, dan SEO ada di tab Form.",
                )}
              </p>
            </>
          ),
        },
      },
      render: renderStudioRoot,
    },
  };
}
