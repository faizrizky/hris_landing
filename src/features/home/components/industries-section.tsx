'use client'

import React, { useRef } from 'react'

import { cn } from '@/utilities/ui'

import { INDUSTRIES, INDUSTRIES_SECTION, type AccentColor } from '../content/home-content'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { SectionTag } from './section-tag'

const ACCENT_BAR_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

/** Solusi per industri: kartu ringkas berisi kebutuhan khas tiap jenis usaha. */
export const IndustriesSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} id={INDUSTRIES_SECTION.id} className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <div data-reveal>
            <SectionTag label={INDUSTRIES_SECTION.tag.label} tone={INDUSTRIES_SECTION.tag.tone} />
          </div>
          <h2 data-reveal className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            {INDUSTRIES_SECTION.title}
          </h2>
          <p data-reveal className="mt-4 text-sm leading-relaxed text-ink-muted">
            {INDUSTRIES_SECTION.description}
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <li
              key={industry.id}
              data-reveal
              className="relative rounded-2xl border border-black/5 bg-white p-5 pl-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgba(20,20,60,0.4)]"
            >
              <span
                aria-hidden
                className={cn(
                  'absolute bottom-4 left-0 top-4 w-1 rounded-full',
                  ACCENT_BAR_CLASS[industry.accent],
                )}
              />
              <h3 className="text-base font-bold">{industry.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{industry.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {industry.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full bg-tint-lavender px-2.5 py-0.5 text-[10px] font-medium"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
