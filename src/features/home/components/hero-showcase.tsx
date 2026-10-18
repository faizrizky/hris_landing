import { Check } from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'

import { HERO_SHOWCASE, type AccentColor } from '../content/home-content'

type Tone = AccentColor

const TONE_BG_CLASS: Record<Tone, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

const TONE_SOFT_BG_CLASS: Record<Tone, string> = {
  teal: 'bg-accent-teal/20',
  orange: 'bg-accent-orange/20',
  purple: 'bg-accent-purple/20',
  blue: 'bg-accent-blue/20',
  yellow: 'bg-accent-yellow/30',
}

/** Tinggi sumbu Z tiap layer pada layar lebar (px). Layer di atas tampak melayang lebih tinggi. */
const LAYER_Z_PX = { dashboard: 0, phone: 60, cardLeave: 90, cardPayslip: 110 } as const

const getLayerStyle = (zPx: number) => ({ '--z': `${zPx}px` }) as React.CSSProperties

/**
 * `--lift` dan `--float` dianimasikan GSAP (use-hero-showcase). Transform 3D hanya aktif di layar
 * lebar; di mobile hanya dashboard yang tampil datar.
 */
const LAYER_CLASS =
  'md:[transform:translateZ(calc(var(--z)_+_var(--lift,0px)_+_var(--float,0px)))]'

/** Mockup produk isometrik: dashboard HR, HP, dan dua kartu notifikasi yang melayang. */
export const HeroShowcase: React.FC = () => {
  const { dashboard, phone, floatingCards } = HERO_SHOWCASE

  return (
    <div
      aria-hidden
      className="relative mx-auto h-auto w-full max-w-[520px] md:h-[500px] md:max-w-none md:[perspective:1600px]"
    >
      <div className="relative md:absolute md:left-1/2 md:top-1/2 md:h-[360px] md:w-[540px] md:-translate-x-1/2 md:-translate-y-1/2 md:[transform-style:preserve-3d] md:[transform:rotateX(50deg)_rotateZ(-32deg)_scale(1.12)]">
        <div
          data-iso-layer
          style={getLayerStyle(LAYER_Z_PX.dashboard)}
          className={cn(
            LAYER_CLASS,
            'relative w-full rounded-2xl bg-white p-4 shadow-[0_40px_70px_-25px_rgba(20,40,110,0.4)] md:absolute md:left-0 md:top-14 md:w-[470px]',
          )}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-orange" />
            <span className="h-2 w-2 rounded-full bg-accent-yellow" />
            <span className="h-2 w-2 rounded-full bg-accent-teal" />
            <p className="ml-2 text-[11px] font-bold">{dashboard.title}</p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {dashboard.stats.map((stat) => (
              <div key={stat.id} className="rounded-xl bg-tint-sky p-2.5">
                <p className="text-[9px] text-ink-muted">{stat.label}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-extrabold">
                  <span className={cn('h-2 w-2 rounded-full', TONE_BG_CLASS[stat.accent])} />
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex h-16 items-end gap-1.5 rounded-xl bg-tint-sky p-2.5">
            {dashboard.chartBars.map((height, index) => (
              <span
                key={`${height}-${index}`}
                style={{ height: `${height}%` }}
                className="w-full rounded-t bg-accent-blue/70"
              />
            ))}
          </div>

          <ul className="mt-3 space-y-1.5">
            {dashboard.rows.map((row) => (
              <li key={row.id} className="flex items-center gap-2 text-[10px]">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-tint-lavender text-[8px] font-bold text-accent-purple">
                  {row.initials}
                </span>
                <span className="flex-1 font-semibold">{row.name}</span>
                <span
                  className={cn('rounded-full px-2 py-0.5 font-medium', TONE_SOFT_BG_CLASS[row.tone])}
                >
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-iso-layer
          style={getLayerStyle(LAYER_Z_PX.phone)}
          className={cn(
            LAYER_CLASS,
            'hidden h-[290px] w-[150px] rounded-[1.6rem] border-[6px] border-phone-lavender bg-white p-3 text-center shadow-[0_30px_50px_-20px_rgba(60,60,160,0.45)] md:absolute md:left-[400px] md:top-[-18px] md:block',
          )}
        >
          <p className="mt-4 text-[10px] font-bold">{phone.title}</p>
          <p className="text-[8px] text-ink-muted">{phone.subtitle}</p>
          <div className="mx-auto mt-4 grid h-20 w-20 place-items-center rounded-full border-4 border-accent-teal">
            <Check className="h-9 w-9 text-accent-teal" strokeWidth={3} />
          </div>
          <ul className="mt-4 flex flex-col items-center gap-1.5">
            {phone.chips.map((chip) => (
              <li key={chip} className="rounded-full bg-tint-cyan px-2.5 py-0.5 text-[9px] font-medium">
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {floatingCards.map((card, index) => (
          <div
            key={card.id}
            data-iso-layer
            style={getLayerStyle(index === 0 ? LAYER_Z_PX.cardLeave : LAYER_Z_PX.cardPayslip)}
            className={cn(
              LAYER_CLASS,
              'relative hidden w-[200px] rounded-xl bg-white p-3 pl-4 shadow-[0_24px_40px_-18px_rgba(20,30,80,0.45)] md:absolute md:block',
              index === 0 ? 'md:left-[-10px] md:top-[330px]' : 'md:left-[250px] md:top-[345px]',
            )}
          >
            <span
              className={cn(
                'absolute bottom-2.5 left-0 top-2.5 w-1 rounded-full',
                TONE_BG_CLASS[card.accent],
              )}
            />
            <p className="text-[11px] font-bold">{card.title}</p>
            <p className="mt-0.5 text-[9px] text-ink-muted">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
