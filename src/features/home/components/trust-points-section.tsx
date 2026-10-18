'use client'

import { BadgeCheck, Database, ScanFace, WifiOff, type LucideIcon } from 'lucide-react'
import React, { useRef } from 'react'

import { cn } from '@/utilities/ui'

import { TRUST_POINTS, type TrustIcon } from '../content/home-content'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'

const TRUST_ICON: Record<TrustIcon, LucideIcon> = {
  face: ScanFace,
  offline: WifiOff,
  database: Database,
  approval: BadgeCheck,
}

const TRUST_ICON_TINT_CLASSES = [
  'bg-accent-teal/20 text-ink',
  'bg-accent-orange/20 text-accent-orange',
  'bg-accent-blue/15 text-accent-blue',
  'bg-accent-purple/20 text-accent-purple',
] as const

/** Empat poin kepercayaan tepat di bawah hero, seperti pada KantorKu. */
export const TrustPointsSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} aria-label="Keunggulan utama" className="bg-white pb-6 pt-2 md:pb-10">
      <div className="container">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point, index) => {
            const Icon = TRUST_ICON[point.icon]

            return (
              <li
                key={point.id}
                data-reveal
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
      </div>
    </section>
  )
}
