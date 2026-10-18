import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { tagFor } from "@/features/home/content/tones";
import type { Page } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "testimonials" }>;

/** Testimoni asli. Tidak dirender bila belum ada isinya. */
export function TestimonialsBlock({ block }: { block: Block; ctx: BlockContext }) {
  const items = block.items ?? [];

  if (items.length === 0) return null;

  return (
    <TestimonialsSection anchor={block.anchor} tag={tagFor(block.tag)} title={block.header.title} testimonials={items} />
  );
}
