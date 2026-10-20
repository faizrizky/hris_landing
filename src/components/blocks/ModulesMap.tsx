import { ModulesSection } from "@/features/home/components/modules-section";
import { tagFor } from "@/features/home/content/tones";
import type { Feature, Page } from "@/types/cms";

import { tintClass } from "./shared";
import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "modulesMap" }>;

/** Peta fitur: pilihan di blok bila ada, jika tidak semua fitur sesuai urutannya. */
export function ModulesMapBlock({ block, ctx }: { block: Block; ctx: BlockContext }) {
  const chosen = (block.features ?? []).filter((item): item is Feature => typeof item === "object");
  const features = chosen.length > 0 ? chosen : ctx.data.features;

  if (features.length === 0) return null;

  return (
    <ModulesSection
      anchor={block.anchor}
      tag={tagFor(block.tag)}
      title={block.header.title}
      description={block.header.description}
      tintClassName={tintClass(block.tint) || "bg-tint-sky"}
      features={features}
    />
  );
}
