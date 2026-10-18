'use client'

import React, { useRef } from 'react'

import { cn } from '@/utilities/ui'

import { getInitials, type SectionTagContent } from '../content/tones'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { useTestimonialCards } from '../hooks/use-testimonial-cards'
import { SectionTag } from './section-tag'

const STAR_COUNT = 5
const MAX_TESTIMONIALS = 3

type TestimonialTone = 'yellow' | 'cyan' | 'pink'

const TESTIMONIAL_TONE_CLASS: Record<TestimonialTone, string> = {
  yellow: 'bg-card-yellow',
  cyan: 'bg-card-cyan',
  pink: 'bg-card-pink',
}

export interface TestimonialItem {
  id?: string | null
  quote: string
  name: string
  role: string
  tone?: TestimonialTone | null
  rotationDeg?: number | null
}

interface TestimonialsSectionProps {
  anchor?: string | null
  tag?: SectionTagContent | null
  title: string
  testimonials: TestimonialItem[]
}

/** Testimoni asli: kartu pastel miring yang jatuh bertahap. */
export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ anchor, tag, title, testimonials }) => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)
  useTestimonialCards(rootRef)

  return (
    <section ref={rootRef} id={anchor ?? undefined} className="bg-white py-16 md:py-28">
      <div className="container grid items-center gap-12 md:grid-cols-[0.6fr_1.4fr]">
        <div>
          {tag && (
            <div data-gsap-reveal>
              <SectionTag label={tag.label} tone={tag.tone} />
            </div>
          )}
          <h2 data-gsap-reveal className="mt-4 text-3xl font-extrabold leading-snug md:text-4xl">
            {title}
          </h2>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, MAX_TESTIMONIALS).map((testimonial) => (
            <li
              key={testimonial.id ?? testimonial.name}
              data-testimonial
              style={{ rotate: `${testimonial.rotationDeg ?? 0}deg` }}
              className={cn(
                'rounded-2xl p-6 shadow-[0_14px_30px_-16px_rgba(20,20,60,0.3)]',
                TESTIMONIAL_TONE_CLASS[testimonial.tone ?? 'yellow'],
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
