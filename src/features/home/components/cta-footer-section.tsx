'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'
import React, { useRef } from 'react'

import { BRAND_NAME, CTA_SECTION, DEMO_GUARANTEES, DEMO_HREF } from '../content/home-content'
import { useParallax } from '../hooks/use-parallax'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { BrandLogo } from './decorations'
import { PillLink } from './pill-link'

const BIG_SHAPE_PARALLAX_SPEED = 0.2
const SMALL_SHAPE_PARALLAX_SPEED = 0.4

/** Penutup gelap: ajakan demo dengan bentuk geometris, dilanjutkan footer. */
export const CtaFooterSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)
  useParallax(rootRef)

  return (
    <section ref={rootRef} className="relative overflow-hidden rounded-t-[2.5rem] bg-night text-white">
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
          <h2 data-reveal className="text-3xl font-extrabold leading-tight md:text-4xl">
            {CTA_SECTION.title}
          </h2>
          <p data-reveal className="mt-4 text-sm text-white/80">
            {CTA_SECTION.subtitle}
          </p>
          <div data-reveal className="mt-8">
            <PillLink href={DEMO_HREF} variant="accent" className="px-8 py-3.5">
              {CTA_SECTION.buttonLabel}
            </PillLink>
          </div>
          <ul className="mx-auto mt-12 grid max-w-xl gap-3 text-left sm:grid-cols-2">
            {DEMO_GUARANTEES.map((guarantee) => (
              <li
                key={guarantee}
                data-reveal
                className="flex items-start gap-3 rounded-xl bg-white/5 p-4 text-xs leading-relaxed text-white/90"
              >
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" />
                {guarantee}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div data-reveal>
            <BrandLogo name={BRAND_NAME} tone="light" />
            <p className="mt-6 max-w-xs text-sm text-white/80">{CTA_SECTION.footerTagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {CTA_SECTION.columns.map((column) => (
              <nav key={column.title} data-reveal aria-label={column.title}>
                <p className="text-xs font-bold tracking-wider">{column.title}</p>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
