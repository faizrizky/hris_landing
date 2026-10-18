'use client'

import React, { useRef } from 'react'

import { DEMO_HREF } from '@/features/site/content/labels'

import { useHeroIntro } from '../hooks/use-hero-intro'
import { useHeroShowcase } from '../hooks/use-hero-showcase'
import { useParallax } from '../hooks/use-parallax'
import { HeroShowcase, type HeroMockup } from './hero-showcase'
import { PillLink } from './pill-link'
import { TrustPoints } from './trust-points'

const SHOWCASE_PARALLAX_SPEED = 0.1

interface HeroSectionProps {
  titleLineOne?: string | null
  titleLineTwo?: string | null
  description?: string | null
  buttons?: { label: string; href: string; style?: 'fill' | 'stroke' | null }[] | null
  mockup?: HeroMockup | null
  trustPoints?: { id?: string | null; title: string; description?: string | null }[] | null
}

const splitWords = (line: string) => line.split(' ').filter(Boolean)

/** Hero beranda: judul dan CTA di kiri, mockup isometrik di kanan, empat kartu keunggulan di bawahnya. */
export const HeroSection: React.FC<HeroSectionProps> = ({
  titleLineOne,
  titleLineTwo,
  description,
  buttons,
  mockup,
  trustPoints,
}) => {
  const rootRef = useRef<HTMLElement>(null)
  const titleLines = [
    { text: titleLineOne ?? '', isAccent: false },
    { text: titleLineTwo ?? '', isAccent: true },
  ].filter((line) => line.text)
  const actions = buttons && buttons.length > 0 ? buttons : [{ label: 'Minta demo', href: DEMO_HREF, style: 'fill' as const }]

  useHeroIntro(rootRef)
  useParallax(rootRef)
  useHeroShowcase(rootRef)

  return (
    <section
      ref={rootRef}
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-b from-tint-sky via-white to-white pb-10 pt-28 md:pb-12 md:pt-32"
    >
      <div
        aria-hidden
        className="absolute -right-24 top-16 h-[520px] w-[520px] rounded-full bg-accent-blue/10 blur-3xl"
      />

      <div className="container relative grid items-center gap-10 md:grid-cols-[0.9fr_1.3fr]">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {titleLines.map((line) => (
              <span key={line.text} className={`block whitespace-nowrap ${line.isAccent ? 'text-brand' : ''}`}>
                {splitWords(line.text).map((word) => (
                  <span key={word} className="mr-3 inline-block overflow-hidden align-bottom md:mr-4">
                    <span data-hero-word className="inline-block">
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          {description && (
            <p data-hero-fade className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
              {description}
            </p>
          )}
          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-6">
            {actions.map((button, index) =>
              index === 0 ? (
                <PillLink key={button.label} href={button.href} className="px-8 py-3.5">
                  {button.label}
                </PillLink>
              ) : (
                <PillLink key={button.label} href={button.href} variant="outline" className="px-6 py-3">
                  {button.label}
                </PillLink>
              ),
            )}
          </div>
        </div>

        {mockup && (
          <div data-parallax={SHOWCASE_PARALLAX_SPEED}>
            <HeroShowcase mockup={mockup} />
          </div>
        )}
      </div>

      {trustPoints && trustPoints.length > 0 && (
        <div className="container relative mt-10 md:mt-6">
          <TrustPoints points={trustPoints} />
        </div>
      )}
    </section>
  )
}
