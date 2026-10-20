'use client'

import Link from 'next/link'
import React, { useRef } from 'react'

import type { Solution } from '@/types/cms'
import { cn } from '@/utilities/ui'

import { getAccentByIndex, type AccentColor, type SectionTagContent } from '../content/tones'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { SectionTag } from './section-tag'

const ACCENT_BAR_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

interface IndustriesSectionProps {
  anchor?: string | null
  tag?: SectionTagContent | null
  title: string
  description?: string | null
  solutions: Solution[]
}

/** Solusi per industri: kartu ringkas yang menaut ke halaman solusinya. */
export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ anchor, tag, title, description, solutions }) => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} id={anchor ?? undefined} className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          {tag && (
            <div data-gsap-reveal>
              <SectionTag label={tag.label} tone={tag.tone} />
            </div>
          )}
          <h2 data-gsap-reveal className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            {title}
          </h2>
          {description && (
            <p data-gsap-reveal className="mt-4 text-sm leading-relaxed text-ink-muted">
              {description}
            </p>
          )}
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => (
            <li
              key={solution.id}
              data-gsap-reveal
              className="relative rounded-2xl border border-black/5 bg-white p-5 pl-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgba(20,20,60,0.4)]"
            >
              <span
                aria-hidden
                className={cn(
                  'absolute bottom-4 left-0 top-4 w-1 rounded-full',
                  ACCENT_BAR_CLASS[getAccentByIndex(index)],
                )}
              />
              <h3 className="text-base font-bold">
                <Link href={`/solusi/${solution.slug}`} className="after:absolute after:inset-0">
                  {solution.name}
                </Link>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{solution.tagline}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
