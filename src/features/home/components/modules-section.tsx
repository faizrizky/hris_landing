'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'
import React, { useRef } from 'react'

import type { FeatureSummary } from '@/features/cms/loaders'
import {
  FEATURE_CATEGORY_DESCRIPTION,
  FEATURE_CATEGORY_LABEL,
  FEATURE_CATEGORY_ORDER,
  FEATURE_STATUS,
  FEATURE_STATUS_LABEL,
  type FeatureStatus,
} from '@/features/site/content/labels'
import type { Home } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { SECTION_TAGS, getAccentByIndex, type AccentColor } from '../content/tones'
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

interface ModulesSectionProps {
  home: Home
  features: FeatureSummary[]
}

/** Peta modul per kategori fitur: yang sudah berjalan ditandai, yang belum ditandai sebagai rencana. */
export const ModulesSection: React.FC<ModulesSectionProps> = ({ home, features }) => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)

  const groups = FEATURE_CATEGORY_ORDER.map((category) => ({
    category,
    items: features.filter((feature) => feature.category === category),
  })).filter((group) => group.items.length > 0)

  return (
    <section ref={rootRef} id="fitur" className="bg-white py-10 md:py-16">
      <div className="bg-tint-sky py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl">
            <div data-gsap-reveal>
              <SectionTag label={SECTION_TAGS.modules.label} tone={SECTION_TAGS.modules.tone} />
            </div>
            <h2 data-gsap-reveal className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              {home.modulesTitle}
            </h2>
            <p data-gsap-reveal className="mt-4 text-sm leading-relaxed text-ink-muted">
              {home.modulesDescription}
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, index) => {
              const isPlannedGroup = group.items.every((item) => item.status === FEATURE_STATUS.PLANNED)
              const groupStatus: FeatureStatus = isPlannedGroup
                ? FEATURE_STATUS.PLANNED
                : group.items.every((item) => item.status === FEATURE_STATUS.AVAILABLE)
                  ? FEATURE_STATUS.AVAILABLE
                  : FEATURE_STATUS.PARTIAL

              return (
                <li
                  key={group.category}
                  data-gsap-reveal
                  className={cn(
                    'relative rounded-2xl bg-white p-6 pl-7 shadow-[0_14px_34px_-20px_rgba(20,20,60,0.35)]',
                    isPlannedGroup && 'opacity-80',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'absolute bottom-4 left-0 top-4 w-1 rounded-full',
                      ACCENT_BAR_CLASS[getAccentByIndex(index)],
                    )}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold leading-snug">{FEATURE_CATEGORY_LABEL[group.category]}</h3>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                        STATUS_PILL_CLASS[groupStatus],
                      )}
                    >
                      {FEATURE_STATUS_LABEL[groupStatus]}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                    {FEATURE_CATEGORY_DESCRIPTION[group.category]}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {group.items.map((feature) => (
                      <li key={feature.id} className="flex items-start gap-2 text-xs">
                        <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-teal" />
                        <Link href={`/fitur/${feature.slug}`} className="hover:text-brand">
                          {feature.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
