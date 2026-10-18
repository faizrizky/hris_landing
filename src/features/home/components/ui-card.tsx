import React from 'react'

import { cn } from '@/utilities/ui'

import type { AccentColor, UiCardContent } from '../content/home-content'

const ACCENT_BAR_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

type UiCardProps = Omit<UiCardContent, 'id'> & { className?: string }

/** Kartu putih kecil dengan garis aksen di kiri, seperti kartu tugas di referensi. */
export const UiCard: React.FC<UiCardProps> = ({
  accent,
  title,
  subtitle,
  lines,
  footer,
  className,
}) => (
  <div
    className={cn(
      'relative rounded-xl bg-white p-4 pl-5 text-ink shadow-[0_10px_30px_-12px_rgba(20,20,60,0.25)]',
      className,
    )}
  >
    <span
      aria-hidden
      className={cn('absolute bottom-3 left-0 top-3 w-1 rounded-full', ACCENT_BAR_CLASS[accent])}
    />
    <p className="text-sm font-bold leading-tight">{title}</p>
    {subtitle && <p className="mt-0.5 text-xs font-medium text-accent-purple">{subtitle}</p>}
    <ul className="mt-2 space-y-0.5 text-xs text-ink-muted">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
    {footer && <p className="mt-3 text-right text-[11px] font-medium text-ink-muted">{footer}</p>}
  </div>
)
