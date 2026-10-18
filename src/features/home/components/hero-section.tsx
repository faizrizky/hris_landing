'use client'

import React, { useRef } from 'react'

import { cn } from '@/utilities/ui'

import { DEMO_HREF, HERO_CARDS, HERO_CONTENT } from '../content/home-content'
import { useDrawLines } from '../hooks/use-draw-lines'
import { useFloat } from '../hooks/use-float'
import { useHeroIntro } from '../hooks/use-hero-intro'
import { useParallax } from '../hooks/use-parallax'
import { CurvedLine, DotGrid } from './decorations'
import { PillLink } from './pill-link'
import { UiCard } from './ui-card'

/** Hero: judul besar di kiri, kumpulan kartu melayang dengan parallax di kanan. */
export const HeroSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null)

  useHeroIntro(rootRef)
  useParallax(rootRef)
  useFloat(rootRef)
  useDrawLines(rootRef)

  return (
    <section
      ref={rootRef}
      id="beranda"
      className="relative overflow-hidden bg-white pb-16 pt-32 md:pb-24 md:pt-40"
    >
      <div
        aria-hidden
        className="absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-tint-peach"
      />
      <div
        aria-hidden
        className="absolute bottom-8 right-[26%] hidden h-72 w-72 rounded-full bg-accent-teal/20 md:block"
      />
      <DotGrid tone="teal" columns={7} rows={7} className="absolute bottom-6 left-4 hidden md:block" />

      <div className="container relative grid items-center gap-12 md:grid-cols-[1fr_1.15fr]">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            {HERO_CONTENT.titleWords.map((word) => (
              <span key={word} className="mr-3 inline-block overflow-hidden align-bottom md:mr-4">
                <span data-hero-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p data-hero-fade className="mt-6 max-w-md text-sm leading-relaxed text-ink-muted">
            {HERO_CONTENT.description}
          </p>
          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
            <PillLink href={DEMO_HREF}>{HERO_CONTENT.primaryCta}</PillLink>
            <PillLink href={DEMO_HREF} variant="outline">
              {HERO_CONTENT.secondaryCta}
            </PillLink>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 md:block md:h-[470px]">
          <CurvedLine className="absolute left-[24%] top-[-2%] hidden md:block" />
          <DotGrid
            tone="orange"
            columns={6}
            rows={4}
            className="absolute left-[8%] top-[28%] hidden md:block"
          />
          {HERO_CARDS.map(({ id, positionClass, parallaxSpeed, ...card }) => (
            <div
              key={id}
              data-parallax={parallaxSpeed}
              className={cn('md:absolute', positionClass)}
            >
              <div data-hero-card>
                <div data-float>
                  <UiCard {...card} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
