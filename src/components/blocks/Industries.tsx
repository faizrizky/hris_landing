import { IndustriesSection } from "@/features/home/components/industries-section";
import { tagFor } from "@/features/home/content/tones";
import type { Page, Solution } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "industries" }>;

/** Solusi industri: pilihan di blok bila ada, jika tidak semua solusi yang dicentang "Tampilkan di beranda". */
export function IndustriesBlock({ block, ctx }: { block: Block; ctx: BlockContext }) {
  const chosen = (block.solutions ?? []).filter((item): item is Solution => typeof item === "object");
  const solutions = chosen.length > 0 ? chosen : ctx.data.solutions.filter((solution) => solution.showOnHome);

  if (solutions.length === 0) return null;

  return (
    <IndustriesSection
      anchor={block.anchor}
      tag={tagFor(block.tag)}
      title={block.header.title}
      description={block.header.description}
      solutions={solutions}
    />
  );
}
