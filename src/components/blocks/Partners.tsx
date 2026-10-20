import { PageSection } from "@/features/site/components/page-section";
import { asMedia } from "@/lib/cms/media";
import type { Page, Partner } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "partners" }>;

const populatedPartners = (items: (number | Partner)[] | null | undefined) =>
  (items ?? []).filter((item): item is Partner => typeof item === "object");

/** Logo partner dalam dua baris. Tidak dirender bila belum ada logo. */
export function PartnersBlock({ block }: { block: Block; ctx: BlockContext }) {
  const rows = [populatedPartners(block.rowOne), populatedPartners(block.rowTwo)].filter((row) => row.length > 0);

  if (rows.length === 0) return null;

  return (
    <PageSection title={block.header.title} description={block.header.description ?? undefined}>
      <div className="space-y-6">
        {rows.map((row, index) => (
          <ul key={index} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {row.map((partner) => {
              const logo = asMedia(partner.logo);

              return (
                <li key={partner.id} title={block.showTooltip ? partner.name : undefined}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- logo dari CMS */}
                  {logo ? <img src={logo.url ?? ""} alt={logo.alt || partner.name} className="h-10 w-auto" /> : partner.name}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </PageSection>
  );
}
