'use client'

import React, { useRef } from 'react'

import { cn } from '@/utilities/ui'

import { TESTIMONIALS, TESTIMONIALS_SECTION } from '../content/home-content'
import type { TestimonialContent } from '../content/home-content'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { useTestimonialCards } from '../hooks/use-testimonial-cards'
import { SectionTag } from './section-tag'

const STAR_COUNT = 5

const TESTIMONIAL_TONE_CLASS: Record<TestimonialContent['tone'], string> = {
  yellow: 'bg-card-yellow',
  cyan: 'bg-card-cyan',
  pink: 'bg-card-pink',
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

/** Testimoni: kartu pastel miring yang jatuh bertahap. Isinya masih contoh dan ditandai jelas. */
export const TestimonialsSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)
  useTestimonialCards(rootRef)

  return (
    <section ref={rootRef} id={TESTIMONIALS_SECTION.id} className="bg-white py-16 md:py-28">
      <div className="container grid items-center gap-12 md:grid-cols-[0.6fr_1.4fr]">
        <div>
          <div data-reveal>
            <SectionTag
              label={TESTIMONIALS_SECTION.tag.label}
              tone={TESTIMONIALS_SECTION.tag.tone}
            />
          </div>
          <h2 data-reveal className="mt-4 text-3xl font-extrabold leading-snug md:text-4xl">
            {TESTIMONIALS_SECTION.title}
          </h2>
          <p data-reveal className="mt-4 text-xs text-ink-muted">
            {TESTIMONIALS_SECTION.placeholderNote}
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li
              key={testimonial.id}
              data-testimonial
              style={{ rotate: `${testimonial.rotationDeg}deg` }}
              className={cn(
                'rounded-2xl p-6 shadow-[0_14px_30px_-16px_rgba(20,20,60,0.3)]',
                TESTIMONIAL_TONE_CLASS[testimonial.tone],
              )}
            >
              <p aria-label={`${STAR_COUNT} dari ${STAR_COUNT} bintang`} className="text-sm tracking-widest">
                {'★'.repeat(STAR_COUNT)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">{testimonial.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-xs font-bold text-accent-purple">
                  {getInitials(testimonial.name)}
                </span>
                <div>
                  <p className="text-xs font-bold">{testimonial.name}</p>
                  <p className="text-[11px] text-ink-muted">{testimonial.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
