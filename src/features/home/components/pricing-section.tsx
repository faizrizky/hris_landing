'use client'

import { Check } from 'lucide-react'
import React, { useRef } from 'react'

import { PlanCard, type PricingPlan } from '@/features/site/components/plan-card'
import { cn } from '@/utilities/ui'

import type { SectionTagContent } from '../content/tones'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { PillLink } from './pill-link'
import { SectionTag } from './section-tag'

const PLAN_PREVIEW_FEATURE_COUNT = 4

interface PricingSectionProps {
  anchor?: string | null
  variant?: 'full' | 'compact' | null
  tag?: SectionTagContent | null
  title: string
  description?: string | null
  tintClassName?: string
  plans: PricingPlan[]
  addonNote?: string | null
  points?: { id?: string | null; text: string }[] | null
  action?: { label: string; href: string } | null
}

/** Harga: kartu paket (lengkap atau ringkas), poin penawaran, catatan tambahan, dan tautan ke halaman harga. */
export const PricingSection: React.FC<PricingSectionProps> = ({
  anchor,
  variant,
  tag,
  title,
  description,
  tintClassName = 'bg-tint-lavender',
  plans,
  addonNote,
  points,
  action,
}) => {
  const rootRef = useRef<HTMLElement>(null)
  const isCompact = variant === 'compact'

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} id={anchor ?? undefined} className="bg-white py-10 md:py-16">
      <div className={cn('py-16 md:py-20', tintClassName)}>
        <div className="container">
          <div data-gsap-reveal className="mx-auto max-w-2xl text-center">
            {tag && <SectionTag label={tag.label} tone={tag.tone} />}
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{title}</h2>
            {description && <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{description}</p>}
          </div>

          {plans.length > 0 && (
            <ul className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <li key={plan.id ?? plan.name}>
                  <PlanCard plan={plan} maxFeatures={isCompact ? PLAN_PREVIEW_FEATURE_COUNT : undefined} />
                </li>
              ))}
            </ul>
          )}

          {addonNote && <p className="mt-8 text-center text-sm text-ink-muted">{addonNote}</p>}

          {points && points.length > 0 && (
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
              {points.map((point) => (
                <li key={point.id ?? point.text} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-teal/25">
                    <Check aria-hidden className="h-3 w-3" />
                  </span>
                  {point.text}
                </li>
              ))}
            </ul>
          )}

          {action && (
            <div className="mt-8 text-center">
              <PillLink href={action.href}>{action.label}</PillLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
