import { tagFor } from "@/features/home/content/tones";
import { AccentCard } from "@/features/site/components/accent-card";
import { PageSection } from "@/features/site/components/page-section";
import {
  FEATURE_CATEGORY_DESCRIPTION,
  FEATURE_CATEGORY_LABEL,
  FEATURE_CATEGORY_ORDER,
  FEATURE_STATUS,
  FEATURE_STATUS_LABEL,
  type FeatureStatus,
} from "@/features/site/content/labels";
import { CategoryBadge } from "@/features/site/visuals/badge-sets";
import { PanelVisual } from "@/features/site/visuals/panel-visual";
import type { Page } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "featureCatalog" }>;

/** Daftar fitur per kategori; tiap kelompok punya gambar sendiri dan bergantian kiri-kanan. */
export function FeatureCatalogBlock({ block, ctx }: { block: Block; ctx: BlockContext }) {
  const tag = tagFor(block.tag);

  return (
    <>
      {FEATURE_CATEGORY_ORDER.map((categoryId, groupIndex) => {
        const items = ctx.data.features.filter((feature) => feature.category === categoryId);

        if (items.length === 0) return null;

        const isOdd = groupIndex % 2 === 1;

        return (
          <PageSection
            key={categoryId}
            title={FEATURE_CATEGORY_LABEL[categoryId]}
            description={FEATURE_CATEGORY_DESCRIPTION[categoryId]}
            tag={groupIndex === 0 ? tag : undefined}
            bandClassName={isOdd ? "bg-tint-sky" : undefined}
            visualSide={isOdd ? "left" : "right"}
            visual={
              <PanelVisual
                panelClassName={isOdd ? "bg-tint-lavender" : "bg-tint-peach"}
                badge={<CategoryBadge category={categoryId} />}
                chips={items.map((feature) => feature.name)}
              />
            }
          >
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((feature, index) => (
                <li key={feature.id}>
                  <AccentCard
                    index={index}
                    title={feature.name}
                    description={feature.shortDescription}
                    href={`/fitur/${feature.slug}`}
                    badge={
                      feature.availability === FEATURE_STATUS.AVAILABLE
                        ? undefined
                        : FEATURE_STATUS_LABEL[feature.availability as FeatureStatus]
                    }
                  />
                </li>
              ))}
            </ul>
          </PageSection>
        );
      })}
    </>
  );
}
