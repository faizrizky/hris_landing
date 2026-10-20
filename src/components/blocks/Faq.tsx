import { FaqSection } from "@/features/home/components/faq-section";
import { tagFor } from "@/features/home/content/tones";
import type { Page } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "faq" }>;

export function FaqBlock({ block }: { block: Block; ctx: BlockContext }) {
  return <FaqSection anchor={block.anchor} tag={tagFor(block.tag)} title={block.header.title} items={block.items ?? []} />;
}
