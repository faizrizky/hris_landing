import { tagFor } from "@/features/home/content/tones";
import { AccentCard } from "@/features/site/components/accent-card";
import { PageSection } from "@/features/site/components/page-section";
import type { Page } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "workflow" }>;

/** Langkah berurutan; nomor (1, 2, …) dibuat otomatis. */
export function WorkflowBlock({ block }: { block: Block; ctx: BlockContext }) {
  return (
    <PageSection title={block.header.title} description={block.header.description ?? undefined} tag={tagFor(block.tag)}>
      <ol className="grid gap-5 md:grid-cols-3">
        {(block.steps ?? []).map((step, index) => (
          <li key={step.id ?? step.title}>
            <AccentCard index={index} title={`${index + 1}. ${step.title}`} description={step.description ?? undefined} />
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
