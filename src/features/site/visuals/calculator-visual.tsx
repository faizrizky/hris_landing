import React from 'react'

import { DotGrid } from '@/features/home/components/decorations'
import { getAccentByIndex, type AccentColor } from '@/features/home/content/tones'
import { cn } from '@/utilities/ui'

const ACCENT_BAR_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

interface CalculatorVisualProps {
  title: string
  /** Kalkulator lain sebagai daftar tab; yang aktif ditandai. */
  tabs: string[]
}

/** Panel kalkulator: judul, kolom isian kosong, dan tombol hitung. Tanpa angka karangan. */
export const CalculatorVisual: React.FC<CalculatorVisualProps> = ({ title, tabs }) => (
  <div aria-hidden className="relative mx-auto w-full max-w-[440px] py-6">
    <DotGrid tone="orange" columns={8} rows={3} className="absolute -right-2 -top-2 hidden md:block" />
    <div data-enter="rise" data-parallax="0.1">
      <div data-float className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)]">
      <p className="text-base font-extrabold">{title}</p>
      <div className="mt-5 space-y-3">
        <div className="h-11 rounded-xl border border-black/10 bg-tint-sky" />
        <div className="h-11 rounded-xl border border-black/10 bg-tint-sky" />
        <div className="grid h-11 place-items-center rounded-full bg-ink text-xs font-semibold text-white">Hitung</div>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {tabs.slice(0, 3).map((tab, index) => (
          <li key={index} className="flex items-center gap-1.5 rounded-full bg-tint-lavender px-2.5 py-1 text-[10px] font-medium">
            <span className={cn('h-1.5 w-1.5 rounded-full', ACCENT_BAR_CLASS[getAccentByIndex(index)])} />
            {tab}
          </li>
        ))}
      </ul>
      </div>
    </div>
  </div>
)
