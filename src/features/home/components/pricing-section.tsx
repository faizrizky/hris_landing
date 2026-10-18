'use client'

import { Check } from 'lucide-react'
import React, { useRef } from 'react'

import { PlanCard, type PricingPlan } from '@/features/site/components/plan-card'
import type { Home } from '@/payload-types'

import type { SectionTags } from '../content/tones'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { PillLink } from './pill-link'
import { SectionTag } from './section-tag'

const PLAN_PREVIEW_FEATURE_COUNT = 4
const PRICING_HREF = '/harga'

interface PricingSectionProps {
  tags: SectionTags
  home: Home
  plans: PricingPlan[]
}

/** Harga: kartu paket ringkas (Basic sampai Suite), poin penawaran, dan tautan ke halaman harga lengkap. */
export const PricingSection: React.FC<PricingSectionProps> = ({ tags, home, plans }) => {
  const rootRef = useRef<HTMLElement>(null)
  const points = home.offerPoints ?? []

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} id="harga" className="bg-white py-10 md:py-16">
      <div className="bg-tint-lavender py-16 md:py-20">
        <div className="container">
          <div data-gsap-reveal className="mx-auto max-w-2xl text-center">
            <SectionTag label={tags.pricing.label} tone={tags.pricing.tone} />
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{home.offerTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{home.offerDescription}</p>
          </div>

          {plans.length > 0 && (
            <ul className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <li key={plan.id ?? plan.name}>
                  <PlanCard plan={plan} maxFeatures={PLAN_PREVIEW_FEATURE_COUNT} />
                </li>
              ))}
            </ul>
          )}

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
          <div className="mt-8 text-center">
            <PillLink href={PRICING_HREF}>{home.offerAction}</PillLink>
          </div>
        </div>
      </div>
    </section>
  )
}
