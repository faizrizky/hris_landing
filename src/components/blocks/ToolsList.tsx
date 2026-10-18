import { tagFor } from "@/features/home/content/tones";
import { AccentCard } from "@/features/site/components/accent-card";
import { PageSection } from "@/features/site/components/page-section";
import { CalculatorBadge } from "@/features/site/visuals/badge-sets";
import { PanelVisual } from "@/features/site/visuals/panel-visual";
import { CALCULATORS, UPCOMING_CALCULATORS } from "@/features/tools/registry";
import type { Page } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "toolsList" }>;

/** Daftar kalkulator HR. Kalkulatornya ada di kode; judul dan teks pembuka dari CMS. */
export function ToolsListBlock({ block }: { block: Block; ctx: BlockContext }) {
  return (
    <PageSection
      title={block.header.title}
      description={block.header.description ?? undefined}
      tag={tagFor(block.tag)}
      visual={
        <PanelVisual
          panelClassName="bg-tint-lavender"
          badge={<CalculatorBadge />}
          chips={CALCULATORS.map((calculator) => calculator.title)}
        />
      }
    >
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CALCULATORS.map((calculator, index) => (
          <li key={calculator.slug}>
            <AccentCard
              index={index}
              title={calculator.title}
              description={calculator.summary}
              href={`/tools/${calculator.slug}`}
            />
          </li>
        ))}
        {UPCOMING_CALCULATORS.map((calculator, index) => (
          <li key={calculator.slug} className="opacity-80">
            <AccentCard
              index={CALCULATORS.length + index}
              title={calculator.title}
              description={calculator.summary}
              badge="Segera hadir"
            />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
