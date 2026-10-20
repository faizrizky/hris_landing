import { Check } from "lucide-react";

import { FaqSection } from "@/features/home/components/faq-section";
import { tagFor } from "@/features/home/content/tones";
import { AccentCard } from "@/features/site/components/accent-card";
import { FeatureMock } from "@/features/site/components/feature-mock";
import { PageIntro } from "@/features/site/components/page-intro";
import { PageSection } from "@/features/site/components/page-section";
import {
  DEMO_HREF,
  FEATURE_STATUS,
  FEATURE_STATUS_LABEL,
  type FeatureCategoryId,
  type FeatureStatus,
} from "@/features/site/content/labels";
import { CalendarBadge, CategoryBadge, ChartBadge } from "@/features/site/visuals/badge-sets";
import { PanelVisual } from "@/features/site/visuals/panel-visual";
import { PhoneVisual } from "@/features/site/visuals/phone-visual";
import { asMedia } from "@/lib/cms/media";
import type { Feature } from "@/types/cms";

/** Teks tetap halaman detail fitur. Isi utamanya (judul, manfaat, blok, FAQ) dari dokumen fitur di CMS. */
export const FEATURE_DETAIL_TEXT = {
  tag: "FITUR",
  demoAction: "Minta demo",
  benefitsTitle: "Manfaat utama",
  faqTag: "FAQ",
  faqTitle: "Pertanyaan umum",
  relatedTitle: "Fitur terkait",
} as const;

type Mock = Feature["mock"];

/** Layar aplikasi dari CMS menjadi isi HP; kosong bila belum diunggah. */
const toPhoneScreen = (field: Mock["screen"]) => {
  const media = asMedia(field);

  return media?.url ? { src: media.url, alt: media.alt || "Layar aplikasi HRIS" } : null;
};

export function FeatureHeroSection({
  title,
  description,
  availability,
  category,
  mock,
}: {
  title: string;
  description?: string | null;
  availability?: string | null;
  category: string;
  mock: Mock;
}) {
  return (
    <PageIntro
      title={title}
      tag={tagFor(FEATURE_DETAIL_TEXT.tag)}
      sentence={description ?? undefined}
      note={!availability || availability === FEATURE_STATUS.AVAILABLE ? undefined : FEATURE_STATUS_LABEL[availability as FeatureStatus]}
      buttons={[{ label: FEATURE_DETAIL_TEXT.demoAction, href: DEMO_HREF, style: "fill" }]}
      visual={
        <PhoneVisual
          tone="sky"
          title={mock.title}
          accessory={<CategoryBadge category={category as FeatureCategoryId} />}
          screen={toPhoneScreen(mock.screen)}
          rows={(mock.rows ?? []).map((row) => ({ title: row.label, detail: row.detail, badge: row.status }))}
        />
      }
    />
  );
}

export function FeatureBenefitsSection({
  benefits,
  category,
}: {
  benefits: NonNullable<Feature["benefits"]>;
  category: string;
}) {
  if (benefits.length === 0) return null;

  return (
    <PageSection
      title={FEATURE_DETAIL_TEXT.benefitsTitle}
      visual={
        <PanelVisual
          panelClassName="bg-tint-sky"
          badge={<CategoryBadge category={category as FeatureCategoryId} />}
          chips={benefits.map((benefit) => benefit.title)}
        />
      }
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <li key={benefit.id ?? index}>
            <AccentCard index={index} title={benefit.title} description={benefit.description} />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

export function FeatureBlocksSection({
  blocks,
  mock,
}: {
  blocks: NonNullable<Feature["blocks"]>;
  mock: Mock;
}) {
  return (
    <>
      {blocks.map((block, index) => (
        <PageSection
          key={block.id ?? index}
          title={block.title}
          description={block.description}
          bandClassName={index % 2 === 0 ? "bg-tint-sky" : undefined}
          visualSide={index % 2 === 0 ? "right" : "left"}
          visual={
            index === 0 ? (
              <FeatureMock mock={mock} />
            ) : (
              <PhoneVisual
                tone={index % 2 === 0 ? "sky" : "lavender"}
                title={block.title}
                accessory={index % 2 === 0 ? <ChartBadge /> : <CalendarBadge />}
                rows={(block.points ?? []).map((point) => ({ title: point.text }))}
              />
            )
          }
        >
          <ul className="grid gap-3 md:grid-cols-2">
            {(block.points ?? []).map((point, index) => (
              <li key={point.id ?? index} data-reveal className="flex items-start gap-2 text-sm">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" />
                {point.text}
              </li>
            ))}
          </ul>
        </PageSection>
      ))}
    </>
  );
}

export function FeatureFaqSection({ faqs }: { faqs: NonNullable<Feature["faqs"]> }) {
  if (faqs.length === 0) return null;

  return <FaqSection tag={tagFor(FEATURE_DETAIL_TEXT.faqTag)} title={FEATURE_DETAIL_TEXT.faqTitle} items={faqs} />;
}

export function FeatureRelatedSection({ related }: { related: Feature[] }) {
  if (related.length === 0) return null;

  return (
    <PageSection title={FEATURE_DETAIL_TEXT.relatedTitle} bandClassName="bg-tint-lavender">
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {related.map((item, index) => (
          <li key={item.id}>
            <AccentCard index={index} title={item.name} description={item.shortDescription} href={`/fitur/${item.slug}`} />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

/** Halaman detail satu fitur: hero berHP, manfaat, blok penjelasan, FAQ, dan fitur terkait. */
export function FeatureDetail({ feature }: { feature: Feature }) {
  const related = (feature.related ?? []).filter((item): item is Feature => typeof item === "object");

  return (
    <>
      <FeatureHeroSection
        title={feature.heroTitle}
        description={feature.heroDescription}
        availability={feature.availability}
        category={feature.category}
        mock={feature.mock}
      />
      <FeatureBenefitsSection benefits={feature.benefits ?? []} category={feature.category} />
      <FeatureBlocksSection blocks={feature.blocks ?? []} mock={feature.mock} />
      <FeatureFaqSection faqs={feature.faqs ?? []} />
      <FeatureRelatedSection related={related} />
    </>
  );
}
