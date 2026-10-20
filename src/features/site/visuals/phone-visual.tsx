import React from 'react'

import { appIcon, type IconComponent } from '@/components/app-icon'

import { PhoneFrame } from '@/features/home/components/phone-frame'
import { getInitials } from '@/features/home/content/tones'
import { cn } from '@/utilities/ui'

const PHONE_CROP_HEIGHT_CLASS = 'h-[330px] md:h-[400px]'
/** Tangkapan layar asli tampil utuh (tidak terpotong), supaya semua baris di layarnya terlihat. */
const PHONE_FULL_HEIGHT_CLASS = 'h-[530px]'
const MAX_PHONE_ROWS = 5
const ROW_ICONS: readonly IconComponent[] = [appIcon('clock'), appIcon('leave'), appIcon('document'), appIcon('payslip'), appIcon('shield')]
const ROW_ICON_TINTS = ['bg-accent-teal', 'bg-accent-orange', 'bg-accent-purple', 'bg-accent-blue', 'bg-accent-yellow'] as const

export interface PhoneRow {
  title: string
  detail?: string
  badge?: string
}

/** Tangkapan layar aplikasi yang mengisi HP, menggantikan daftar baris. */
export interface PhoneScreen {
  src: string
  alt: string
}

interface PhoneVisualProps {
  tone: 'sky' | 'lavender'
  title: string
  rows: PhoneRow[]
  /** Objek melayang di samping HP. */
  accessory: React.ReactNode
  screen?: PhoneScreen | null
}

/** HP dengan daftar bercentang yang terpotong di bawah, dan objek melayang di sampingnya. */
export const PhoneVisual: React.FC<PhoneVisualProps> = ({ tone, title, rows, accessory, screen }) => (
  <div aria-hidden className={cn('relative mx-auto w-full max-w-[420px] overflow-hidden', screen ? PHONE_FULL_HEIGHT_CLASS : PHONE_CROP_HEIGHT_CLASS)}>
    <div data-parallax="0.12" className="absolute left-1/2 top-6 -translate-x-1/2">
      <div data-phone className="relative">
        <PhoneFrame tone={tone} isScreenshot={Boolean(screen)}>
          {screen ? (
            // eslint-disable-next-line @next/next/no-img-element -- tangkapan layar dari CMS, ukurannya tetap
            <img src={screen.src} alt={screen.alt} loading="lazy" className="h-full w-full object-cover object-top" />
          ) : (
          <div className="flex h-full flex-col text-ink">
            <div className={cn('px-5 pb-6 pt-10 text-white', tone === 'sky' ? 'bg-accent-blue' : 'bg-phone-lavender')}>
              <p className="truncate text-lg font-bold">{title}</p>
            </div>
            <ul className="divide-y divide-black/5 px-4">
              {rows.slice(0, MAX_PHONE_ROWS).map((row, index) => {
                const RowIcon = ROW_ICONS[index % ROW_ICONS.length]

                return (
                <li key={index} className="flex items-center gap-3 py-3.5">
                  <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full', ROW_ICON_TINTS[index % ROW_ICON_TINTS.length])}>
                    <RowIcon aria-hidden className="h-3.5 w-3.5 text-white" strokeWidth={2.6} />
                  </span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tint-lavender text-[10px] font-bold text-accent-purple">
                    {getInitials(row.title)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">{row.title}</p>
                    {row.detail && <p className="truncate text-[11px] text-ink-muted">{row.detail}</p>}
                  </div>
                  {row.badge && (
                    <span className="shrink-0 rounded-full bg-accent-teal/30 px-2 py-0.5 text-[10px] font-semibold">
                      {row.badge}
                    </span>
                  )}
                </li>
                )
              })}
            </ul>
          </div>
          )}
        </PhoneFrame>
        <div data-pop className="absolute -right-8 top-24 md:-right-14">
          <div data-float>{accessory}</div>
        </div>
      </div>
    </div>
  </div>
)
