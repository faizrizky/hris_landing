import { PricingSection } from "@/features/home/components/pricing-section";
import { tagFor } from "@/features/home/content/tones";
import type { Page } from "@/types/cms";

import { firstButton, tintClass } from "./shared";
import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "pricing" }>;

export function PricingBlock({ block }: { block: Block; ctx: BlockContext }) {
  return (
    <PricingSection
      anchor={block.anchor}
      variant={block.variant}
      tag={tagFor(block.tag)}
      title={block.header.title}
      description={block.header.description}
      tintClassName={tintClass(block.tint) || undefined}
      plans={block.plans ?? []}
      addonNote={block.addonNote}
      points={block.points}
      action={firstButton(block.buttons)}
    />
  );
}
