"use client";

import { CalendarCheck, CloudDownload, Headset, MessageCircle, Rocket, ShieldCheck, SlidersHorizontal, Sparkles, Users, Wrench } from "lucide-react";
import { useRef } from "react";

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
  users: (className: string) => <Users aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  message: (className: string) => <MessageCircle aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  calendar: (className: string) => <CalendarCheck aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
  shield: (className: string) => <ShieldCheck aria-hidden className={className} strokeWidth={ICON_STROKE_WIDTH} />,
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

function PromoCard({ card }: { card: Card }) {
  const isWide = card.size === "wide";
  const isTall = card.size === "tall";

  return (
    <li
      data-gsap-reveal
      className={cn(
        "flex gap-5 rounded-3xl border border-black/5 p-7 shadow-[0_18px_44px_-30px_rgba(60,60,140,0.45)] transition-transform duration-300 hover:-translate-y-1",
        TONE_CLASS[card.tone ?? "lavender"] ?? TONE_CLASS.lavender,
        isWide ? "flex-row items-center" : "flex-col",
        isTall && "justify-between",
        SIZE_CLASS[card.size ?? "normal"] ?? SIZE_CLASS.normal,
      )}
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-2xl bg-white/70 text-accent-deep",
          isTall ? "h-24 w-24 self-center" : isWide ? "h-20 w-20" : "h-14 w-14",
        )}
      >
        {renderIcon(card.icon, isTall ? "h-11 w-11" : isWide ? "h-9 w-9" : "h-6 w-6")}
      </span>
      <div>
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
