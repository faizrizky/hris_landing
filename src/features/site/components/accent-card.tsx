import Link from 'next/link'
import React from 'react'

import { getAccentByIndex, type AccentColor } from '@/features/home/content/tones'
import { cn } from '@/utilities/ui'

const ACCENT_BAR_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

interface AccentCardProps {
  index: number
  title: string
  description?: string
  /** Bila diisi, seluruh kartu menjadi tautan. */
  href?: string
  badge?: string
  children?: React.ReactNode
}

/** Kartu putih dengan garis aksen di kiri, sama dengan kartu di beranda. */
export const AccentCard: React.FC<AccentCardProps> = ({ index, title, description, href, badge, children }) => (
  <div
    data-reveal
    style={{ '--i': Math.min(index, 4) } as React.CSSProperties}
    className={cn(
      'relative rounded-2xl border border-black/5 bg-white p-6 pl-7 shadow-[0_14px_34px_-22px_rgba(20,20,60,0.35)]',
      href && 'transition-transform duration-300 hover:-translate-y-1',
    )}
  >
    <span
      aria-hidden
      className={cn('absolute bottom-4 left-0 top-4 w-1 rounded-full', ACCENT_BAR_CLASS[getAccentByIndex(index)])}
    />
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-base font-bold leading-snug">
        {href ? (
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      {badge && (
        <span className="shrink-0 rounded-full bg-accent-yellow/35 px-2.5 py-0.5 text-[10px] font-semibold">
          {badge}
        </span>
      )}
    </div>
    {description && <p className="mt-2 text-xs leading-relaxed text-ink-muted">{description}</p>}
    {children}
  </div>
)
