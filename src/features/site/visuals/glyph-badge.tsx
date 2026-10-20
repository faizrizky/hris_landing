import React, { useId } from 'react'

import type { IconComponent } from '@/components/app-icon'
import type { AccentColor } from '@/features/home/content/tones'
import { cn } from '@/utilities/ui'

export type BadgeShape = 'shield' | 'circle' | 'square' | 'hexagon'

const BADGE_SIZE_PX = 96
const GLYPH_SIZE_PX = 40

const SHAPE_PATH: Record<BadgeShape, string> = {
  shield: 'M48 4 L86 18 V52 C86 78 68 96 48 104 C28 96 10 78 10 52 V18 Z',
  circle: 'M48 4 a44 44 0 1 0 0.01 0 Z',
  square: 'M24 6 H72 A18 18 0 0 1 90 24 V72 A18 18 0 0 1 72 90 H24 A18 18 0 0 1 6 72 V24 A18 18 0 0 1 24 6 Z',
  hexagon: 'M48 4 L88 26 V70 L48 92 L8 70 V26 Z',
}

const SHAPE_VIEWBOX_HEIGHT: Record<BadgeShape, number> = { shield: 108, circle: 96, square: 96, hexagon: 96 }

const ACCENT_FILL_CLASS: Record<AccentColor, string> = {
  teal: 'fill-accent-teal',
  orange: 'fill-accent-orange',
  purple: 'fill-accent-purple',
  blue: 'fill-accent-blue',
  yellow: 'fill-accent-yellow',
}

interface GlyphBadgeProps {
  icon: IconComponent
  accent: AccentColor
  shape: BadgeShape
  className?: string
}

/** Lencana datar berwarna aksen dengan separuh kanan lebih gelap dan satu ikon putih: gaya sama dengan badge beranda. */
export const GlyphBadge: React.FC<GlyphBadgeProps> = ({ icon: Icon, accent, shape, className }) => {
  const clipId = useId()
  const height = SHAPE_VIEWBOX_HEIGHT[shape]

  return (
    <div aria-hidden className={cn('relative', className)} style={{ width: BADGE_SIZE_PX, height: (BADGE_SIZE_PX * height) / 96 }}>
      <svg viewBox={`0 0 96 ${height}`} className="absolute inset-0 h-full w-full">
        <defs>
          <clipPath id={clipId}>
            <path d={SHAPE_PATH[shape]} />
          </clipPath>
        </defs>
        <path d={SHAPE_PATH[shape]} className={ACCENT_FILL_CLASS[accent]} />
        <rect x="48" y="0" width="48" height={height} clipPath={`url(#${clipId})`} className="fill-black/10" />
      </svg>
      <Icon
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
        size={GLYPH_SIZE_PX}
        strokeWidth={2.4}
      />
    </div>
  )
}
