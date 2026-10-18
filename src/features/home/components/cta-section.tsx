'use client'

import { Check } from 'lucide-react'
import React, { useRef } from 'react'

import { useParallax } from '../hooks/use-parallax'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { PillLink } from './pill-link'

const BIG_SHAPE_PARALLAX_SPEED = 0.2
const SMALL_SHAPE_PARALLAX_SPEED = 0.4

interface CtaSectionProps {
  title: string
  description?: string | null
  action?: { label: string; href: string } | null
  guarantees: { id?: string | null; text: string }[]
}

/** Ajakan penutup gelap dengan bentuk geometris. Footer situs menyambung tepat di bawahnya. */
export const CtaSection: React.FC<CtaSectionProps> = ({ title, description, action, guarantees }) => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)
  useParallax(rootRef)

  return (
    <section ref={rootRef} className="home-cta relative overflow-hidden rounded-t-[2.5rem] bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          data-parallax={BIG_SHAPE_PARALLAX_SPEED}
          className="absolute left-[14%] top-[6%] h-[420px] w-[420px] rounded-tl-full bg-night-shape"
        />
        <div
          data-parallax={SMALL_SHAPE_PARALLAX_SPEED}
          className="absolute bottom-[8%] left-[32%] h-52 w-52 rounded-tl-full bg-night-shape"
        />
        <div
          data-parallax={SMALL_SHAPE_PARALLAX_SPEED}
          className="absolute right-0 top-0 h-[360px] w-[360px] bg-night-shape [clip-path:polygon(0_0,100%_0,100%_100%)]"
        />
      </div>

      <div className="container relative pb-14 pt-24 md:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 data-gsap-reveal className="text-3xl font-extrabold leading-tight md:text-4xl">
            {title}
          </h2>
          {description && (
            <p data-gsap-reveal className="mt-4 text-sm text-white/80">
              {description}
            </p>
          )}
          {action && (
            <div data-gsap-reveal className="mt-8">
              <PillLink href={action.href} variant="accent" className="px-8 py-3.5">
                {action.label}
              </PillLink>
            </div>
          )}
          {guarantees.length > 0 && (
            <ul className="mx-auto mt-12 grid max-w-xl gap-3 text-left sm:grid-cols-2">
              {guarantees.map((item, index) => (
                <li
                  key={item.id ?? index}
                  data-gsap-reveal
                  className="flex items-start gap-3 rounded-xl bg-white/5 p-4 text-xs leading-relaxed text-white/90"
                >
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" />
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
