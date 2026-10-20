import { ApprovalScreen } from "@/features/home/components/phone-screens/approval-screen";
import { FaceClockScreen } from "@/features/home/components/phone-screens/face-clock-screen";
import { PhoneFrame } from "@/features/home/components/phone-frame";
import { FeatureBand } from "@/features/home/components/feature-band";
import { tagFor } from "@/features/home/content/tones";
import { ChartBadge } from "@/features/site/visuals/badge-sets";
import { asMedia } from "@/lib/cms/media";
import type { Page } from "@/types/cms";

import { firstButton, tintClass } from "./shared";
import type { BlockContext } from "./types";
import { accessoryNode } from "./visual";

type Block = Extract<Page["layout"][number], { blockType: "featureBand" }>;

/** Pita warna dengan HP (layar absen wajah atau layar approval) dan teks di sampingnya. */
export function FeatureBandBlock({ block }: { block: Block; ctx: BlockContext }) {
  const isFace = block.screen === "faceScan";
  const screenImage = asMedia(block.screenImage);

  return (
    <FeatureBand
      id={block.anchor}
      tag={tagFor(block.tag)}
      title={block.header.title}
      description={block.header.description}
      action={firstButton(block.buttons)}
      tintClassName={tintClass(block.tint ?? (isFace ? "sky" : "lavender")) || "bg-tint-sky"}
      accessory={accessoryNode(block.accessory) ?? <ChartBadge />}
    >
      <PhoneFrame tone={isFace ? "sky" : "lavender"}>
        {screenImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- tangkapan layar dari CMS, ukurannya tetap
          <img src={screenImage.url ?? ""} alt={screenImage.alt || "Layar aplikasi HRIS"} loading="lazy" className="h-full w-full object-cover object-top" />
        ) : isFace ? (
          <FaceClockScreen
            title={block.screenTitle}
            date={block.screenSubtitle}
            chips={block.chips ?? []}
            buttonLabel={block.screenButton}
          />
        ) : (
          <ApprovalScreen
            title={block.screenTitle}
            subtitle={block.screenSubtitle}
            pendingLabel={block.pendingLabel}
            doneLabel={block.doneLabel}
            items={block.items ?? []}
          />
        )}
      </PhoneFrame>
    </FeatureBand>
  );
}
