import Link from "next/link";

import { FaqSection } from "@/features/home/components/faq-section";
import { tagFor } from "@/features/home/content/tones";
import { AccentCard } from "@/features/site/components/accent-card";
import { PageIntro } from "@/features/site/components/page-intro";
import { PageSection } from "@/features/site/components/page-section";
import { PageVisual } from "@/features/site/components/page-visual";
import { DEMO_HREF } from "@/features/site/content/labels";
import { CalendarBadge } from "@/features/site/visuals/badge-sets";
import { PhoneVisual } from "@/features/site/visuals/phone-visual";
import { TiltedCardsVisual } from "@/features/site/visuals/tilted-cards-visual";
import type { Feature, Solution } from "@/types/cms";

/** Teks tetap halaman detail solusi. Isi utamanya (judul, masalah, cara membantu, FAQ) dari dokumen solusi di CMS. */
export const SOLUTION_DETAIL_TEXT = {
  tag: "SOLUSI",
  demoAction: "Minta demo",
  painsTitle: "Yang biasanya menyita waktu",
  helpTitle: "Cara HRIS membantu",
  featureLink: "Lihat fitur",
  faqTag: "FAQ",
  faqTitle: "Pertanyaan umum",
} as const;

type Pains = NonNullable<Solution["pains"]>;
type Points = NonNullable<Solution["points"]>;

export function SolutionHeroSection({
  name,
  title,
  description,
  pains,
  points,
}: {
  name: string;
  title: string;
  description?: string | null;
  pains: Pains;
  points: Points;
}) {
  return (
    <PageIntro
      title={title}
      tag={tagFor(SOLUTION_DETAIL_TEXT.tag)}
      sentence={description ?? undefined}
      buttons={[{ label: SOLUTION_DETAIL_TEXT.demoAction, href: DEMO_HREF, style: "fill" }]}
      visual={<PageVisual title={name} rows={[...pains, ...points].map((item) => ({ title: item.title, detail: item.description }))} />}
    />
  );
}

export function SolutionPainsSection({ pains }: { pains: Pains }) {
  if (pains.length === 0) return null;

  return (
    <PageSection
      title={SOLUTION_DETAIL_TEXT.painsTitle}
      bandClassName="bg-tint-peach"
      visual={<TiltedCardsVisual cards={pains.map((pain) => ({ title: pain.title, description: pain.description }))} />}
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {pains.map((pain, index) => (
          <li key={pain.id ?? index}>
            <AccentCard index={index} title={pain.title} description={pain.description} />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

export function SolutionHelpSection({ name, points }: { name: string; points: Points }) {
  if (points.length === 0) return null;

  return (
    <PageSection
      title={SOLUTION_DETAIL_TEXT.helpTitle}
      visualSide="left"
      visual={
        <PhoneVisual tone="lavender" title={name} accessory={<CalendarBadge />} rows={points.map((point) => ({ title: point.title }))} />
      }
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {points.map((point, index) => {
          const feature = typeof point.feature === "object" ? (point.feature as Feature | null) : null;

          return (
            <li key={point.id ?? index}>
              <AccentCard index={index} title={point.title} description={point.description}>
                {feature && (
                  <Link
                    href={`/fitur/${feature.slug}`}
                    className="relative mt-3 inline-block text-xs font-semibold underline underline-offset-4 hover:text-brand"
                  >
                    {SOLUTION_DETAIL_TEXT.featureLink} {feature.name}
                  </Link>
                )}
              </AccentCard>
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}

export function SolutionFaqSection({ faqs }: { faqs: NonNullable<Solution["faqs"]> }) {
  if (faqs.length === 0) return null;

  return <FaqSection tag={tagFor(SOLUTION_DETAIL_TEXT.faqTag)} title={SOLUTION_DETAIL_TEXT.faqTitle} items={faqs} />;
}

/** Halaman detail satu solusi: hero, masalah yang sering dihadapi, cara HRIS membantu, dan FAQ. */
export function SolutionDetail({ solution }: { solution: Solution }) {
  const pains = solution.pains ?? [];
  const points = solution.points ?? [];

  return (
    <>
      <SolutionHeroSection
        name={solution.name}
        title={solution.heroTitle}
        description={solution.heroDescription}
        pains={pains}
        points={points}
      />
      <SolutionPainsSection pains={pains} />
      <SolutionHelpSection name={solution.name} points={points} />
      <SolutionFaqSection faqs={solution.faqs ?? []} />
    </>
  );
}
