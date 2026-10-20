import { Check } from 'lucide-react'
import React from 'react'

import { getAccentByIndex, type AccentColor } from '@/features/home/content/tones'
import { cn } from '@/utilities/ui'

const TONE_BG_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

/** Tinggi sumbu Z tiap layer pada layar lebar (px). Sama dengan mockup hero beranda. */
const LAYER_Z_PX = { panel: 0, phone: 60, cardFirst: 90, cardSecond: 110 } as const
const MAX_PANEL_ROWS = 4
const MAX_CHIPS = 2

const getLayerStyle = (zPx: number) => ({ '--z': `${zPx}px` }) as React.CSSProperties

const LAYER_CLASS = 'md:[transform:translateZ(calc(var(--z)_+_var(--lift,0px)_+_var(--float,0px)))]'

export interface PageVisualRow {
  title: string
  detail?: string
  badge?: string
}

interface PageVisualProps {
  title: string
  rows: PageVisualRow[]
}

/**
 * Mockup isometrik untuk pembuka halaman dalam: panel daftar, HP dengan centang, dan kartu melayang.
 * Isinya diambil dari data halaman itu sendiri, jadi tidak ada klaim yang dikarang.
 * Animasi diatur `useHeroShowcase` dari PageIntro lewat atribut `data-iso-layer`.
 */
export const PageVisual: React.FC<PageVisualProps> = ({ title, rows }) => {
  const panelRows = rows.slice(0, MAX_PANEL_ROWS)
  const chips = rows.slice(0, MAX_CHIPS)
  const floatingCards = [rows[0], rows[1] ?? rows[0]].filter((row): row is PageVisualRow => Boolean(row))

  return (
    <div
      aria-hidden
      className="relative mx-auto h-auto w-full max-w-[460px] md:h-[440px] md:max-w-none md:[perspective:1600px]"
    >
      <div className="relative md:absolute md:left-1/2 md:top-1/2 md:h-[340px] md:w-[500px] md:-translate-x-1/2 md:-translate-y-1/2 md:[transform-style:preserve-3d] md:[transform:rotateX(50deg)_rotateZ(-32deg)_scale(1.05)]">
        <div
          data-iso-layer
          style={getLayerStyle(LAYER_Z_PX.panel)}
          className={cn(
            LAYER_CLASS,
            'relative w-full rounded-2xl bg-white p-4 shadow-[0_40px_70px_-25px_rgba(20,40,110,0.4)] md:absolute md:left-0 md:top-12 md:w-[430px]',
          )}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-orange" />
            <span className="h-2 w-2 rounded-full bg-accent-yellow" />
            <span className="h-2 w-2 rounded-full bg-accent-teal" />
            <p className="ml-2 text-[11px] font-bold">{title}</p>
          </div>
          <ul className="mt-3 space-y-2">
            {panelRows.map((row, index) => (
              <li key={index} className="flex items-center gap-2.5 rounded-xl bg-tint-sky p-2.5 text-[11px]">
                <span className={cn('h-2 w-2 shrink-0 rounded-full', TONE_BG_CLASS[getAccentByIndex(index)])} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{row.title}</span>
                  {row.detail && <span className="block truncate text-[10px] text-ink-muted">{row.detail}</span>}
                </span>
                {row.badge && (
                  <span className="shrink-0 rounded-full bg-accent-yellow/30 px-2 py-0.5 text-[10px] font-medium">
                    {row.badge}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-iso-layer
          style={getLayerStyle(LAYER_Z_PX.phone)}
          className={cn(
            LAYER_CLASS,
            'hidden h-[270px] w-[145px] rounded-[1.6rem] border-[6px] border-phone-lavender bg-white p-3 text-center shadow-[0_30px_50px_-20px_rgba(60,60,160,0.45)] md:absolute md:left-[360px] md:top-[-18px] md:block',
          )}
        >
          <p className="mt-4 text-[10px] font-bold">{title}</p>
          <div className="mx-auto mt-5 grid h-20 w-20 place-items-center rounded-full border-4 border-accent-teal">
            <Check className="h-9 w-9 text-accent-teal" strokeWidth={3} />
          </div>
          <ul className="mt-4 flex flex-col items-center gap-1.5">
            {chips.map((chip, chipIndex) => (
              <li key={chipIndex} className="max-w-full truncate rounded-full bg-tint-cyan px-2.5 py-0.5 text-[9px] font-medium">
                {chip.title}
              </li>
            ))}
          </ul>
        </div>

        {floatingCards.map((card, index) => (
          <div
            key={index}
            data-iso-layer
            style={getLayerStyle(index === 0 ? LAYER_Z_PX.cardFirst : LAYER_Z_PX.cardSecond)}
            className={cn(
              LAYER_CLASS,
              'relative hidden w-[190px] rounded-xl bg-white p-3 pl-4 shadow-[0_24px_40px_-18px_rgba(20,30,80,0.45)] md:absolute md:block',
              index === 0 ? 'md:left-[-10px] md:top-[320px]' : 'md:left-[230px] md:top-[335px]',
            )}
          >
            <span
              className={cn(
                'absolute bottom-2.5 left-0 top-2.5 w-1 rounded-full',
                TONE_BG_CLASS[getAccentByIndex(index + 1)],
              )}
            />
            <p className="truncate text-[11px] font-bold">{card.title}</p>
            {card.detail && <p className="mt-0.5 truncate text-[9px] text-ink-muted">{card.detail}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
