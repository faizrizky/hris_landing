import React from "react";

import {
  BellBadge,
  CheckCircleBadge,
  ShieldCheckBadge,
} from "@/features/home/components/accessories";
import { PageVisual, type PageVisualRow } from "@/features/site/components/page-visual";
import { FEATURE_STATUS, FEATURE_STATUS_LABEL, type FeatureStatus } from "@/features/site/content/labels";
import {
  CalculatorBadge,
  CalendarBadge,
  ChartBadge,
  ChatBadge,
  UsersBadge,
  WalletBadge,
} from "@/features/site/visuals/badge-sets";
import { BoardVisual } from "@/features/site/visuals/board-visual";
import { CalculatorVisual } from "@/features/site/visuals/calculator-visual";
import { GlyphBadge } from "@/features/site/visuals/glyph-badge";
import { OfferVisual } from "@/features/site/visuals/offer-visual";
import { PanelVisual } from "@/features/site/visuals/panel-visual";
import { PhoneVisual } from "@/features/site/visuals/phone-visual";
import { ShieldVisual } from "@/features/site/visuals/shield-visual";
import { TiltedCardsVisual } from "@/features/site/visuals/tilted-cards-visual";
import { CALCULATORS } from "@/features/tools/registry";
import { appIcon } from "@/components/app-icon";
import { asMedia, type MediaField } from "@/lib/cms/media";

import type { BlockContext } from "./types";

type Tone = "sky" | "lavender" | "peach";

/** Bentuk data grup `visual` di CMS (sama untuk Hero, Section, dan Formulir Demo). */
export type VisualBlockData = {
  kind: "isometric" | "board" | "phone" | "offer" | "tilted" | "calculator" | "panel" | "shield" | "none";
  tone?: Tone | null;
  accessory?: string | null;
  title?: string | null;
  rowsSource?: "manual" | "features" | "solutions" | "calculators" | null;
  rows?: { title: string; detail?: string | null; badge?: string | null; id?: string | null }[] | null;
  screen?: MediaField;
} | null | undefined;

const BOARD_CLASS: Record<Tone, string> = {
  sky: "bg-tint-sky",
  lavender: "bg-tint-lavender",
  peach: "bg-tint-peach",
};

const ACCESSORIES: Record<string, () => React.ReactNode> = {
  bell: () => <BellBadge />,
  shield: () => <ShieldCheckBadge />,
  checkCircle: () => <CheckCircleBadge />,
  users: () => <UsersBadge />,
  calculator: () => <CalculatorBadge />,
  wallet: () => <WalletBadge />,
  chat: () => <ChatBadge />,
  chart: () => <ChartBadge />,
  calendar: () => <CalendarBadge />,
  clock: () => <GlyphBadge icon={appIcon('clock')} accent="orange" shape="square" />,
  document: () => <GlyphBadge icon={appIcon('document')} accent="blue" shape="square" />,
  lock: () => <GlyphBadge icon={appIcon('lock')} accent="purple" shape="hexagon" />,
  star: () => <GlyphBadge icon={appIcon('appraisal')} accent="yellow" shape="circle" />,
};

export const accessoryNode = (key: string | null | undefined) => (ACCESSORIES[key ?? "shield"] ?? ACCESSORIES.shield)();

const MAX_AUTO_ROWS = 6;

const toPhoneScreen = (field: MediaField) => {
  const media = asMedia(field);

  return media ? { src: media.url as string, alt: media.alt || "Layar aplikasi HRIS" } : null;
};

/** Baris isi visual: manual dari CMS, atau otomatis dari fitur, solusi, atau daftar kalkulator. */
export function resolveVisualRows(visual: NonNullable<VisualBlockData>, ctx: BlockContext): PageVisualRow[] {
  switch (visual.rowsSource) {
    case "features":
      return ctx.data.features.slice(0, MAX_AUTO_ROWS).map((feature) => ({
        title: feature.name,
        detail: feature.shortDescription,
        badge:
          feature.availability === FEATURE_STATUS.AVAILABLE
            ? undefined
            : FEATURE_STATUS_LABEL[feature.availability as FeatureStatus],
      }));
    case "solutions":
      return ctx.data.solutions.slice(0, MAX_AUTO_ROWS).map((solution) => ({ title: solution.name, detail: solution.tagline }));
    case "calculators":
      return CALCULATORS.slice(0, MAX_AUTO_ROWS).map((calculator) => ({ title: calculator.title, detail: calculator.summary }));
    default:
      return (visual.rows ?? []).map((row) => ({
        title: row.title,
        detail: row.detail ?? undefined,
        badge: row.badge ?? undefined,
      }));
  }
}

/** Gambar beranimasi sesuai pilihan di CMS. Kosong bila jenisnya "none". */
export function VisualFromBlock({ visual, ctx }: { visual: VisualBlockData; ctx: BlockContext }): React.ReactNode {
  if (!visual || visual.kind === "none") return undefined;

  const rows = resolveVisualRows(visual, ctx);
  const tone: Tone = visual.tone ?? "peach";
  const accessory = accessoryNode(visual.accessory);
  const title = visual.title ?? "";

  switch (visual.kind) {
    case "isometric":
      return <PageVisual title={title} rows={rows} />;
    case "board":
      return (
        <BoardVisual
          boardClassName={BOARD_CLASS[tone]}
          accessory={accessory}
          cards={rows.map((row) => ({ title: row.title, subtitle: row.badge, line: row.detail }))}
        />
      );
    case "phone":
      return <PhoneVisual tone={tone === "lavender" ? "lavender" : "sky"} title={title} accessory={accessory} rows={rows} screen={toPhoneScreen(visual.screen)} />;
    case "offer":
      return <OfferVisual title={title} steps={rows.map((row) => row.title)} />;
    case "tilted":
      return <TiltedCardsVisual cards={rows.map((row) => ({ title: row.title, description: row.detail ?? "" }))} />;
    case "calculator":
      return <CalculatorVisual title={title} tabs={rows.map((row) => row.title)} />;
    case "panel":
      return <PanelVisual panelClassName={BOARD_CLASS[tone]} badge={accessory} chips={rows.map((row) => row.title)} />;
    case "shield":
      return <ShieldVisual />;
    default:
      return undefined;
  }
}
