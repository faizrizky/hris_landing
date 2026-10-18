import { RequestsSection } from "@/features/home/components/requests-section";
import { tagFor } from "@/features/home/content/tones";
import type { Page } from "@/types/cms";

import { firstButton } from "./shared";
import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "requestsBoard" }>;

export function RequestsBoardBlock({ block }: { block: Block; ctx: BlockContext }) {
  return (
    <RequestsSection
      anchor={block.anchor}
      tag={tagFor(block.tag)}
      title={block.header.title}
      description={block.header.description}
      action={firstButton(block.buttons)}
      cards={block.cards ?? []}
      stripTitle={block.stripTitle}
      stripItems={block.stripItems ?? []}
    />
  );
}
