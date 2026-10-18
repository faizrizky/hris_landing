'use client'

import { Check } from 'lucide-react'
import React, { useRef } from 'react'

import { DEMO_HREF } from '@/features/site/content/labels'
import type { Home } from '@/payload-types'

import { SECTION_TAGS } from '../content/tones'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { PillLink } from './pill-link'
import { SectionTag } from './section-tag'

interface PricingSectionProps {
  home: Home
}

/** Harga: tanpa angka, mengarahkan ke penawaran sesuai jumlah karyawan. */
export const PricingSection: React.FC<PricingSectionProps> = ({ home }) => {
  const rootRef = useRef<HTMLElement>(null)
  const points = home.offerPoints ?? []

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} id="harga" className="bg-white py-10 md:py-16">
      <div className="bg-tint-lavender py-16 md:py-20">
        <div className="container">
          <div
            data-gsap-reveal
            className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)] md:p-12"
          >
            <SectionTag label={SECTION_TAGS.pricing.label} tone={SECTION_TAGS.pricing.tone} />
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{home.offerTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{home.offerDescription}</p>
            <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
              {points.map((point) => (
                <li key={point.id ?? point.text} className="flex items-center gap-3 text-sm">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-teal/25">
                    <Check aria-hidden className="h-3 w-3" />
                  </span>
                  {point.text}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PillLink href={DEMO_HREF}>{home.offerAction}</PillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
