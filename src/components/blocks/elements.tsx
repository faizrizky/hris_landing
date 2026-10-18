import type { ReactNode } from "react";

import { PillLink } from "@/features/home/components/pill-link";
import { SectionTag } from "@/features/home/components/section-tag";
import { AccentCard } from "@/features/site/components/accent-card";
import { asMedia } from "@/lib/cms/media";
import { cn } from "@/utilities/ui";
import type { LayoutSectionBlock } from "@/types/cms";

export type Element = NonNullable<LayoutSectionBlock["column1"]>[number];
type Of<T extends Element["blockType"]> = Extract<Element, { blockType: T }>;

/**
 * Setiap elemen berada di dalam bingkai: sendirian di halaman ia memakai container situs
 * (gutter dan lebar maksimal); di dalam kolom Layout Section bingkainya netral (lihat `.hris-el` di globals.css).
 */
export function ElementFrame({ children }: { children: ReactNode }) {
  return (
    <div className="hris-el">
      <div className="hris-el__inner">{children}</div>
    </div>
  );
}

// Token desain → kelas Tailwind. Editor memilih token, bukan CSS mentah, jadi apa pun yang dibangun
// di editor visual tetap sesuai desain di semua ukuran layar.
const ALIGN = { left: "text-left items-start", center: "text-center items-center", right: "text-right items-end" };
const JUSTIFY = { left: "justify-start", center: "justify-center", right: "justify-end" };
const HEADING_SIZE = {
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-6xl",
};
const HEADING_COLOR = { ink: "text-ink", accent: "text-brand", white: "text-white" };
const TEXT_SIZE = { sm: "text-xs", base: "text-sm", lg: "text-base" };
const TEXT_TONE = { default: "text-ink", muted: "text-ink-muted" };
const ASPECT = { video: "aspect-video", landscape: "aspect-[4/3]", square: "aspect-square", portrait: "aspect-[3/4]" };
const SPACER = { sm: "h-4", md: "h-8", lg: "h-14", xl: "h-24" };

export function BadgeView({ el }: { el: Of<"badge"> }) {
  return (
    <div className={cn("flex w-full", JUSTIFY[el.align ?? "left"])}>
      <SectionTag label={el.text} tone="orange" />
    </div>
  );
}

export function HeadingView({ el }: { el: Of<"heading"> }) {
  const Tag = el.level ?? "h2";

  return (
    <Tag
      className={cn(
        "w-full whitespace-pre-line font-extrabold leading-tight tracking-tight",
        HEADING_SIZE[el.size ?? "lg"],
        HEADING_COLOR[el.color ?? "ink"],
        ALIGN[el.align ?? "left"],
      )}
    >
      {el.text}
    </Tag>
  );
}

export function ParagraphView({ el }: { el: Of<"paragraph"> }) {
  return (
    <p
      className={cn(
        "w-full whitespace-pre-line leading-relaxed",
        TEXT_SIZE[el.size ?? "base"],
        TEXT_TONE[el.tone ?? "default"],
        ALIGN[el.align ?? "left"],
      )}
    >
      {el.text}
    </p>
  );
}

export function ImageView({ el }: { el: Of<"image"> }) {
  const media = asMedia(el.image);

  return (
    <figure className="flex w-full flex-col gap-2">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl bg-tint-sky",
          ASPECT[el.aspect ?? "video"],
          el.framed !== false && "shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)]",
        )}
      >
        {media && (
          // eslint-disable-next-line @next/next/no-img-element -- gambar dari CMS
          <img src={media.url ?? ""} alt={media.alt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>
      {el.caption && <figcaption className="text-xs leading-5 text-ink-muted">{el.caption}</figcaption>}
    </figure>
  );
}

export function ButtonView({ el }: { el: Of<"button"> }) {
  return (
    <div className={cn("flex w-full", JUSTIFY[el.align ?? "left"])}>
      <PillLink href={el.href} variant={el.style === "stroke" ? "outline" : "dark"}>
        {el.label}
      </PillLink>
    </div>
  );
}

export function CardView({ el }: { el: Of<"card"> }) {
  return <AccentCard index={0} title={el.title} description={el.description ?? undefined} href={el.href || undefined} />;
}

export function SpacerView({ el }: { el: Of<"spacer"> }) {
  return <div aria-hidden className={SPACER[el.size ?? "md"]} />;
}

function renderElement(element: Element) {
  switch (element.blockType) {
    case "badge":
      return <BadgeView el={element} />;
    case "heading":
      return <HeadingView el={element} />;
    case "paragraph":
      return <ParagraphView el={element} />;
    case "image":
      return <ImageView el={element} />;
    case "button":
      return <ButtonView el={element} />;
    case "card":
      return <CardView el={element} />;
    case "spacer":
      return <SpacerView el={element} />;
    default:
      return null;
  }
}

/** Elemen kecil di halaman atau di kolom Layout Section, dibungkus bingkai. */
export function ElementView({ element }: { element: Element }) {
  return <ElementFrame>{renderElement(element)}</ElementFrame>;
}
