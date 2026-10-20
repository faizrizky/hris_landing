import type { ReactNode } from "react";

import { asMedia } from "@/lib/cms/media";
import { cn } from "@/utilities/ui";
import type { LayoutSectionBlock as Data } from "@/types/cms";

import { ElementView } from "./elements";
import type { BlockContext } from "./types";

const COLUMNS = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
} as const;
const GAP = { sm: "gap-4", md: "gap-8", lg: "gap-14" };
const PADDING = { sm: "py-10", md: "py-16 md:py-24", lg: "py-24 md:py-36" };
const WIDTH = { narrow: "max-w-3xl", default: "max-w-6xl", wide: "max-w-7xl" };
const BACKGROUND = {
  white: "bg-white",
  sky: "bg-tint-sky",
  lavender: "bg-tint-lavender",
  peach: "bg-tint-peach",
  night: "bg-night text-white",
  image: "bg-night text-white",
};

export const COLUMN_KEYS = ["column1", "column2", "column3", "column4"] as const;

/** Kerangka bagian bebas, dipakai situs dan editor visual (yang memberi area jatuh sebagai kolom). */
export function LayoutSectionView({ block, columns }: { block: Data; columns: ReactNode[] }) {
  const count = Number(block.columns ?? "2");
  const bgImage = block.background === "image" ? asMedia(block.backgroundImage)?.url : undefined;

  return (
    <section
      className={cn("relative isolate overflow-hidden px-4 md:px-8", BACKGROUND[block.background ?? "white"], PADDING[block.padding ?? "md"])}
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <div
        className={cn(
          "relative mx-auto grid w-full",
          WIDTH[block.width ?? "default"],
          COLUMNS[block.columns ?? "2"],
          GAP[block.gap ?? "md"],
          block.verticalAlign === "start" ? "items-start" : "items-center",
        )}
      >
        {columns.slice(0, count).map((column, i) => (
          <div key={i} className="hris-col flex min-w-0 flex-col gap-4">
            {column}
          </div>
        ))}
      </div>
    </section>
  );
}

export function LayoutSectionBlock({ block }: { block: Data; ctx: BlockContext }) {
  const columns = COLUMN_KEYS.map((key) =>
    (block[key] ?? []).map((element, i) => <ElementView key={element.id ?? i} element={element} />),
  );

  return <LayoutSectionView block={block} columns={columns} />;
}
