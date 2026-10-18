import { tagFor } from "@/features/home/content/tones";
import { AccentCard } from "@/features/site/components/accent-card";
import { PageSection } from "@/features/site/components/page-section";
import { cn } from "@/utilities/ui";
import type { Page } from "@/types/cms";

import { tintClass } from "./shared";
import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "featureGrid" }>;

const COLUMN_CLASS: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGridBlock({ block }: { block: Block; ctx: BlockContext }) {
  return (
    <PageSection
      title={block.header.title}
      description={block.header.description ?? undefined}
      tag={tagFor(block.tag)}
      bandClassName={tintClass(block.tint) || undefined}
    >
      <ul className={cn("grid gap-5", COLUMN_CLASS[block.columns ?? "3"])}>
        {(block.items ?? []).map((item, index) => (
          <li key={item.id ?? item.title}>
            <AccentCard
              index={index}
              title={item.title}
              description={item.description ?? undefined}
              badge={item.badge ?? undefined}
              href={item.href || undefined}
            />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
