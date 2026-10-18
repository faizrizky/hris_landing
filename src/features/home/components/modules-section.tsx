'use client'

import { Check } from 'lucide-react'
import React, { useRef } from 'react'

import { cn } from '@/utilities/ui'

import {
  FEATURE_STATUS,
  FEATURE_STATUS_LABEL,
  LIFECYCLE_SECTION,
  MODULES,
  type AccentColor,
  type FeatureStatus,
} from '../content/home-content'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { SectionTag } from './section-tag'

const ACCENT_BAR_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

const STATUS_PILL_CLASS: Record<FeatureStatus, string> = {
  available: 'bg-accent-teal/25 text-ink',
  partial: 'bg-accent-yellow/35 text-ink',
  planned: 'bg-black/5 text-ink-muted',
}

/** Peta modul: modul yang sudah berjalan ditandai jelas, yang belum ditandai sebagai rencana. */
export const ModulesSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} id={LIFECYCLE_SECTION.id} className="bg-white py-10 md:py-16">
      <div className="bg-tint-sky py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl">
            <div data-reveal>
              <SectionTag label={LIFECYCLE_SECTION.tag.label} tone={LIFECYCLE_SECTION.tag.tone} />
            </div>
            <h2 data-reveal className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              {LIFECYCLE_SECTION.title}
            </h2>
            <p data-reveal className="mt-4 text-sm leading-relaxed text-ink-muted">
              {LIFECYCLE_SECTION.description}
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((module) => (
              <li
                key={module.id}
                data-reveal
                className={cn(
                  'relative rounded-2xl bg-white p-6 pl-7 shadow-[0_14px_34px_-20px_rgba(20,20,60,0.35)]',
                  module.status === FEATURE_STATUS.PLANNED && 'opacity-80',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute bottom-4 left-0 top-4 w-1 rounded-full',
                    ACCENT_BAR_CLASS[module.accent],
                  )}
                />
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold leading-snug">{module.title}</h3>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                      STATUS_PILL_CLASS[module.status],
                    )}
                  >
                    {FEATURE_STATUS_LABEL[module.status]}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{module.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {module.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs">
                      <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-teal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
