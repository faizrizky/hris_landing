import { tagFor } from "@/features/home/content/tones";
import { AccentCard } from "@/features/site/components/accent-card";
import { PageSection } from "@/features/site/components/page-section";
import { cn } from "@/utilities/ui";
import type { Page } from "@/types/cms";

import { tintClass } from "./shared";
import type { BlockContext } from "./types";
import { VisualFromBlock, type VisualBlockData } from "./visual";

type Block = Extract<Page["layout"][number], { blockType: "section" }>;

const COLUMN_CLASS: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

/** Bagian halaman dalam: judul bertag, gambar beranimasi di samping, lalu kartu bergaris aksen. */
export function SectionBlock({ block, ctx }: { block: Block; ctx: BlockContext }) {
  const items = block.items ?? [];

  return (
    <PageSection
      title={block.header.title}
      description={block.header.description ?? undefined}
      tag={tagFor(block.tag)}
      bandClassName={tintClass(block.tint) || undefined}
      visualSide={block.visualSide ?? "right"}
      visual={<VisualFromBlock visual={block.visual as VisualBlockData} ctx={ctx} />}
    >
      {items.length > 0 && (
        <ul className={cn("grid gap-5", COLUMN_CLASS[block.columns ?? "3"])}>
          {items.map((item, index) => (
            <li key={item.id ?? index}>
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
      )}
    </PageSection>
  );
}
