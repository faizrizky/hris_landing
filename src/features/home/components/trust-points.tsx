import { BadgeCheck, Database, ScanFace, WifiOff, type LucideIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'

import type { Home } from '@/payload-types'

const TRUST_ICONS: readonly LucideIcon[] = [ScanFace, WifiOff, Database, BadgeCheck]

const TRUST_ICON_TINT_CLASSES = [
  'bg-accent-teal/20 text-ink',
  'bg-accent-orange/20 text-accent-orange',
  'bg-accent-blue/15 text-accent-blue',
  'bg-accent-purple/20 text-accent-purple',
] as const

interface TrustPointsProps {
  points: NonNullable<Home['trustPoints']>
}

/** Empat keunggulan di dasar hero. Kemunculannya diatur animasi intro hero lewat `data-hero-fade`. */
export const TrustPoints: React.FC<TrustPointsProps> = ({ points }) => (
  <ul aria-label="Keunggulan utama" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {points.map((point, index) => {
      const Icon = TRUST_ICONS[index % TRUST_ICONS.length]

      return (
        <li
          key={point.id ?? point.title}
          data-hero-fade
          className="flex gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(20,20,60,0.3)]"
        >
          <span
            className={cn(
              'grid h-11 w-11 shrink-0 place-items-center rounded-xl',
              TRUST_ICON_TINT_CLASSES[index % TRUST_ICON_TINT_CLASSES.length],
            )}
          >
            <Icon aria-hidden className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold leading-snug">{point.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{point.description}</p>
          </div>
        </li>
      )
    })}
  </ul>
)
