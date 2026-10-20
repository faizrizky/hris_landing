import { tagFor } from "@/features/home/content/tones";
import { AccentCard } from "@/features/site/components/accent-card";
import { PageSection } from "@/features/site/components/page-section";
import { SOLUTION_TYPE, SOLUTION_TYPE_LABEL, type SolutionTypeId } from "@/features/site/content/labels";
import { ChartBadge, UsersBadge } from "@/features/site/visuals/badge-sets";
import { PanelVisual } from "@/features/site/visuals/panel-visual";
import type { Page } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "solutionCatalog" }>;

const GROUP_ORDER: SolutionTypeId[] = [SOLUTION_TYPE.INDUSTRY, SOLUTION_TYPE.SCALE];

/** Daftar solusi per jenis (industri dan skala bisnis), masing-masing dengan gambar sendiri. */
export function SolutionCatalogBlock({ block, ctx }: { block: Block; ctx: BlockContext }) {
  const tag = tagFor(block.tag);

  return (
    <>
      {GROUP_ORDER.map((typeId, groupIndex) => {
        const items = ctx.data.solutions.filter((solution) => solution.type === typeId);

        if (items.length === 0) return null;

        const isOdd = groupIndex % 2 === 1;

        return (
          <PageSection
            key={typeId}
            title={SOLUTION_TYPE_LABEL[typeId]}
            tag={groupIndex === 0 ? tag : undefined}
            bandClassName={isOdd ? "bg-tint-sky" : undefined}
            visualSide={isOdd ? "left" : "right"}
            visual={
              <PanelVisual
                panelClassName={isOdd ? "bg-tint-peach" : "bg-tint-lavender"}
                badge={isOdd ? <ChartBadge /> : <UsersBadge />}
                chips={items.map((solution) => solution.name)}
              />
            }
          >
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((solution, index) => (
                <li key={solution.id}>
                  <AccentCard
                    index={index}
                    title={solution.name}
                    description={solution.tagline}
                    href={`/solusi/${solution.slug}`}
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
