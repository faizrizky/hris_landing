"use client";

import { type ComponentConfig, type Config } from "@puckeditor/core";

import {
  SolutionFaqSection,
  SolutionHelpSection,
  SolutionHeroSection,
  SolutionPainsSection,
} from "@/components/blocks/SolutionDetail";
import { PageSettingsField } from "@/components/studio/fields";
import type { Solution } from "@/types/cms";

import { createFields, type StudioContext } from "./fields";
import { meta, type AnyProps, type StudioMetadata } from "./metadata";
import { renderStudioRoot } from "./root";

/** Metadata kanvas sebuah solusi: milik situs, ditambah solusi yang dimuat. */
export type SolutionStudioMetadata = StudioMetadata & { solution: Solution };

export function createSolutionConfig(context: StudioContext & { backPath: string }): Config {
  const { lang, locale, cmsUrl, embedded, backPath, data } = context;
  const f = createFields(context);
  const { s, L, text, textarea, plain, list, featureSelect } = f;

  const featureOf = (id: unknown) => data.features.find((x) => x.id === id) ?? null;
  const withFeatures = (points: AnyProps[]) =>
    points.map((point) => ({ ...point, feature: featureOf(point.feature) }));

  const Hero = ({ puck, ...props }: AnyProps & { puck: { metadata: unknown } }) => {
    const { solution } = meta(puck) as SolutionStudioMetadata;
    return (
      <SolutionHeroSection
        name={solution.name}
        title={String(props.heroTitle ?? "")}
        description={String(props.heroDescription ?? "")}
        pains={solution.pains ?? []}
        points={solution.points ?? []}
      />
    );
  };

  const Pains = ({ puck: _puck, ...props }: AnyProps & { puck: { metadata: unknown } }) => (
    <SolutionPainsSection pains={(props.pains as never) ?? []} />
  );

  const Points = ({ puck, ...props }: AnyProps & { puck: { metadata: unknown } }) => {
    const { solution } = meta(puck) as SolutionStudioMetadata;
    return <SolutionHelpSection name={solution.name} points={withFeatures((props.points as AnyProps[]) ?? []) as never} />;
  };

  const Faq = ({ puck: _puck, ...props }: AnyProps & { puck: { metadata: unknown } }) => (
    <SolutionFaqSection faqs={(props.faqs as never) ?? []} />
  );

  const components: Record<string, ComponentConfig<AnyProps>> = {
    solutionHero: {
      label: L("Hero", "Hero"),
      fields: {
        heroTitle: text("Page title (H1)", "Judul halaman (H1)"),
        heroDescription: textarea("Description", "Deskripsi"),
      },
      render: Hero as never,
    },
    solutionPains: {
      label: L("Problems", "Masalah"),
      fields: {
        pains: list(
          "Problems",
          "Masalah",
          { title: text("Title", "Judul"), description: textarea("Description", "Deskripsi") },
          "title",
          { title: L("Problem", "Masalah"), description: "" },
          6,
        ),
      },
      render: Pains as never,
    },
    solutionPoints: {
      label: L("How HRIS helps", "Cara HRIS membantu"),
      fields: {
        points: list(
          "Ways HRIS helps",
          "Cara HRIS membantu",
          {
            title: text("Title", "Judul"),
            description: textarea("Description", "Deskripsi"),
            feature: featureSelect("Related feature", "Fitur terkait"),
          },
          "title",
          { title: L("Way to help", "Cara membantu"), description: "", feature: null },
          6,
        ),
      },
      render: Points as never,
    },
    solutionFaq: {
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
        title: plain("Solution name", "Nama solusi"),
        settings: {
          type: "custom",
          label: L("Editor", "Editor"),
          render: () => (
            <>
              <PageSettingsField lang={lang} locale={locale} cmsUrl={cmsUrl} backPath={backPath} embedded={embedded} s={s} />
              <p className="studio-note">
                {L(
                  "Address (slug), type, show on home, tagline and SEO are in the Form tab.",
                  "Alamat (slug), jenis, tampil di beranda, tagline, dan SEO ada di tab Form.",
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
