"use client";

import { CloudDownload, Headset, MessageCircle, Rocket, SlidersHorizontal, Sparkles, Wrench } from "lucide-react";
import { useRef } from "react";

import { AppIcon } from "@/components/app-icon";
import { useRevealOnScroll } from "@/features/home/hooks/use-reveal-on-scroll";
import type { Page } from "@/types/cms";
import { cn } from "@/utilities/ui";

import { tintClass } from "./shared";
import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "promoBento" }>;
type Card = NonNullable<Block["cards"]>[number];

const ICON_STROKE_WIDTH = 1.8;

const ICON_RENDERERS = {
  headset: (className: string) => <Headset aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  cloudDownload: (className: string) => <CloudDownload aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  wrench: (className: string) => <Wrench aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  settings: (className: string) => <SlidersHorizontal aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  rocket: (className: string) => <Rocket aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  users: (className: string) => <AppIcon name="user" className={className} />,
  message: (className: string) => <MessageCircle aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  calendar: (className: string) => <AppIcon name="calendar" className={className} />,
  shield: (className: string) => <AppIcon name="shield" className={className} />,
  sparkles: (className: string) => <Sparkles aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
} as const;

const renderIcon = (name: string | null | undefined, className: string) =>
  (ICON_RENDERERS[(name ?? "sparkles") as keyof typeof ICON_RENDERERS] ?? ICON_RENDERERS.sparkles)(className);

const TONE_CLASS: Record<string, string> = {
  lavender: "bg-tint-lavender",
  yellow: "bg-card-yellow",
  sky: "bg-tint-sky",
  peach: "bg-tint-peach",
  cyan: "bg-tint-cyan",
};

const SIZE_CLASS: Record<string, string> = {
  normal: "lg:col-span-3",
  wide: "lg:col-span-6",
  tall: "lg:col-span-3 lg:row-span-2",
};

const RING_SIZES = ["h-24 w-24", "h-40 w-40", "h-56 w-56"] as const;
const ART_SIZE_CLASS: Record<string, string> = {
  normal: "h-28",
  wide: "min-h-36 w-44 self-stretch",
  tall: "min-h-56 flex-1",
};
const ICON_SIZE_CLASS: Record<string, string> = {
  normal: "h-14 w-14 rounded-2xl",
  wide: "h-20 w-20 rounded-3xl",
  tall: "h-24 w-24 rounded-[1.75rem]",
};
const ICON_GLYPH_CLASS: Record<string, string> = { normal: "h-7 w-7", wide: "h-10 w-10", tall: "h-12 w-12" };

/** Panel ilustrasi: lingkaran konsentris, ikon besar dalam ubin putih, dan dua chip kecil melayang. */
function PromoArt({ card, size }: { card: Card; size: string }) {
  return (
    <div className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-white/55", ART_SIZE_CLASS[size] ?? ART_SIZE_CLASS.normal)} aria-hidden>
      {RING_SIZES.map((ring) => (
        <span key={ring} className={cn("absolute rounded-full border border-white/90", ring)} />
      ))}
      <span className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-accent-blue/40" />
      <span className="absolute bottom-5 right-6 h-3.5 w-3.5 rounded-full bg-accent-yellow/70" />
      <span className="absolute bottom-4 left-6 h-2 w-8 rounded-full bg-accent-purple/30" />
      <span
        className={cn(
          "relative grid place-items-center bg-white text-accent-deep shadow-[0_14px_30px_-12px_rgba(36,144,239,0.55)] transition-transform duration-300 group-hover:scale-110",
          ICON_SIZE_CLASS[size] ?? ICON_SIZE_CLASS.normal,
        )}
      >
        {renderIcon(card.icon, ICON_GLYPH_CLASS[size] ?? ICON_GLYPH_CLASS.normal)}
      </span>
      <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-bold text-ok shadow-sm">✓</span>
    </div>
  );
}

function PromoCard({ card }: { card: Card }) {
  const size = card.size ?? "normal";
  const isWide = size === "wide";

  return (
    <li
      data-gsap-reveal
      className={cn(
        "group flex gap-5 rounded-3xl border border-black/5 p-5 shadow-[0_18px_44px_-30px_rgba(60,60,140,0.45)] transition-transform duration-300 hover:-translate-y-1",
        TONE_CLASS[card.tone ?? "lavender"] ?? TONE_CLASS.lavender,
        isWide ? "flex-col sm:flex-row sm:items-center" : "flex-col",
        SIZE_CLASS[size] ?? SIZE_CLASS.normal,
      )}
    >
      <PromoArt card={card} size={size} />
      <div className={cn(!isWide && "px-1 pb-1")}>
        <h3 className="text-lg font-extrabold leading-snug text-accent-deep">{card.title}</h3>
        {card.description && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.description}</p>}
      </div>
    </li>
  );
}

/** Promo / keunggulan: judul dengan kata berwarna, lalu kartu bento berukuran beda dengan ikon dan warna pastel. */
export function PromoBentoBlock({ block }: { block: Block; ctx: BlockContext }) {
  const rootRef = useRef<HTMLElement>(null);
  const highlight = typeof block.highlight === "string" ? block.highlight : "";

  useRevealOnScroll(rootRef);

  return (
    <section ref={rootRef} className={cn("py-12 md:py-20", tintClass(block.tint))}>
      <div className="container">
        <div data-gsap-reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
            {highlight && <span className="text-accent-deep">{highlight} </span>}
            {block.header.title}
          </h2>
          {block.header.description && <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">{block.header.description}</p>}
        </div>
        <ul className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {(block.cards ?? []).map((card, index) => (
            <PromoCard key={card.id ?? index} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
}
