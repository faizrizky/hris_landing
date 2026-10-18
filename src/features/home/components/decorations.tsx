import React from 'react'

import { cn } from '@/utilities/ui'

type DotTone = 'teal' | 'orange'

const DOT_TONE_CLASS: Record<DotTone, string> = {
  teal: 'text-accent-teal',
  orange: 'text-accent-orange',
}

const DOT_GRID_SIZE_PX = 6
const DOT_RADIUS_PX = 1.4

interface DotGridProps {
  tone: DotTone
  columns: number
  rows: number
  className?: string
}

/** Kisi titik kecil dekoratif. */
export const DotGrid: React.FC<DotGridProps> = ({ tone, columns, rows, className }) => (
  <svg
    aria-hidden
    className={cn(DOT_TONE_CLASS[tone], className)}
    width={columns * DOT_GRID_SIZE_PX * 2}
    height={rows * DOT_GRID_SIZE_PX * 2}
    viewBox={`0 0 ${columns * DOT_GRID_SIZE_PX * 2} ${rows * DOT_GRID_SIZE_PX * 2}`}
    fill="currentColor"
  >
    {Array.from({ length: rows }).flatMap((_, row) =>
      Array.from({ length: columns }).map((__, column) => (
        <circle
          key={`${row}-${column}`}
          cx={column * DOT_GRID_SIZE_PX * 2 + DOT_GRID_SIZE_PX}
          cy={row * DOT_GRID_SIZE_PX * 2 + DOT_GRID_SIZE_PX}
          r={DOT_RADIUS_PX}
        />
      )),
    )}
  </svg>
)

interface CurvedLineProps {
  className?: string
}

/** Garis lengkung tipis hitam yang digambar saat terlihat (atribut data-draw). */
export const CurvedLine: React.FC<CurvedLineProps> = ({ className }) => (
  <svg
    aria-hidden
    className={cn('text-ink', className)}
    width="180"
    height="160"
    viewBox="0 0 180 160"
    fill="none"
  >
    <path
      data-draw
      d="M150 10 C 20 0, -10 110, 70 150 C 120 170, 130 100, 90 70"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
)

export const BrandLogo: React.FC<{ name: string; tone: 'dark' | 'light'; className?: string }> = ({
  name,
  tone,
  className,
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight',
      tone === 'dark' ? 'text-ink' : 'text-white',
      className,
    )}
  >
    <svg aria-hidden width="22" height="30" viewBox="0 0 22 30">
      <circle cx="11" cy="8" r="8" className="fill-accent-teal" />
      <circle cx="11" cy="22" r="8" className="fill-accent-purple" />
    </svg>
    {name}
  </span>
)
