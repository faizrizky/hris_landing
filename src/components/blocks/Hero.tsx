import { HeroSection } from "@/features/home/components/hero-section";
import { tagFor } from "@/features/home/content/tones";
import { PageIntro } from "@/features/site/components/page-intro";
import type { Page } from "@/types/cms";

import type { BlockContext } from "./types";
import { VisualFromBlock, type VisualBlockData } from "./visual";

type Block = Extract<Page["layout"][number], { blockType: "hero" }>;

/** Hero: beranda (judul dua baris + mockup isometrik) atau pembuka halaman dalam (teks + gambar beranimasi). */
export function HeroBlock({ block, ctx }: { block: Block; ctx: BlockContext }) {
  if (block.variant === "home") {
    return (
      <HeroSection
        titleLineOne={block.titleLineOne}
        titleLineTwo={block.titleLineTwo}
        description={block.description}
        buttons={block.buttons}
        mockup={block.mockup}
        trustPoints={block.trustPoints}
      />
    );
  }

  return (
    <PageIntro
      title={block.title ?? ""}
      sentence={block.description ?? undefined}
      tag={tagFor(block.tag)}
      note={block.note ?? undefined}
      buttons={block.buttons ?? []}
      visual={<VisualFromBlock visual={block.visual as VisualBlockData} ctx={ctx} />}
    />
  );
}
