'use client'

import { Check } from 'lucide-react'
import React, { useRef } from 'react'

import { DEMO_HREF, PRICING_SECTION } from '../content/home-content'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { PillLink } from './pill-link'
import { SectionTag } from './section-tag'

/** Harga: tanpa angka, mengarahkan ke penawaran sesuai jumlah karyawan. */
export const PricingSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} id={PRICING_SECTION.id} className="bg-white py-10 md:py-16">
      <div className="bg-tint-lavender py-16 md:py-20">
        <div className="container">
          <div
            data-reveal
            className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)] md:p-12"
          >
            <SectionTag label={PRICING_SECTION.tag.label} tone={PRICING_SECTION.tag.tone} />
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              {PRICING_SECTION.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
              {PRICING_SECTION.description}
            </p>
            <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
              {PRICING_SECTION.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-teal/25">
                    <Check aria-hidden className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PillLink href={DEMO_HREF}>{PRICING_SECTION.ctaLabel}</PillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
