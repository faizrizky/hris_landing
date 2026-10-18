'use client'

import { ChevronDown } from 'lucide-react'
import React, { useRef } from 'react'

import type { SectionTagContent } from '../content/tones'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { SectionTag } from './section-tag'

interface FaqSectionProps {
  anchor?: string | null
  tag?: SectionTagContent | null
  title: string
  items: { id?: string | null; question: string; answer: string }[]
}

/** FAQ memakai elemen <details> bawaan sehingga bisa dibuka dengan keyboard tanpa JavaScript. */
export const FaqSection: React.FC<FaqSectionProps> = ({ anchor, tag, title, items }) => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)

  return (
    <section ref={rootRef} id={anchor ?? undefined} className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div data-gsap-reveal className="text-center">
            {tag && <SectionTag label={tag.label} tone={tag.tone} />}
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              {title}
            </h2>
          </div>

          <div className="mt-10 divide-y divide-black/10 rounded-2xl border border-black/5 bg-white shadow-[0_14px_34px_-24px_rgba(20,20,60,0.35)]">
            {items.map((faq) => (
              <details key={faq.id ?? faq.question} data-gsap-reveal className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
