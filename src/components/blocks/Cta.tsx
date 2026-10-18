import { CtaSection } from "@/features/home/components/cta-section";
import type { Page } from "@/types/cms";

import { firstButton } from "./shared";
import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "cta" }>;

export function CtaBlock({ block }: { block: Block; ctx: BlockContext }) {
  return (
    <CtaSection
      title={block.header.title}
      description={block.header.description}
      action={firstButton(block.buttons)}
      guarantees={block.guarantees ?? []}
    />
  );
}
