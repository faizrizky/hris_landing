'use client'

import Link from 'next/link'
import React, { useRef } from 'react'

import { DEMO_HREF } from '@/features/site/content/labels'
import type { Home } from '@/payload-types'

import { useHeroIntro } from '../hooks/use-hero-intro'
import { useHeroShowcase } from '../hooks/use-hero-showcase'
import { useParallax } from '../hooks/use-parallax'
import { HeroShowcase } from './hero-showcase'
import { PillLink } from './pill-link'
import { TrustPoints } from './trust-points'

const SHOWCASE_PARALLAX_SPEED = 0.1

interface HeroSectionProps {
  home: Home
}

const splitWords = (line: string) => line.split(' ').filter(Boolean)

/** Hero: judul dan CTA di kiri, mockup isometrik di kanan, empat kartu keunggulan di bawahnya. */
export const HeroSection: React.FC<HeroSectionProps> = ({ home }) => {
  const rootRef = useRef<HTMLElement>(null)
  const titleLines = [
    { text: home.heroLineOne, isAccent: false },
    { text: home.heroLineTwo, isAccent: true },
  ]

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
          <p data-hero-fade className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
            {home.heroDescription}
          </p>
          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-6">
            <PillLink href={DEMO_HREF} className="px-8 py-3.5">
              {home.heroPrimaryAction}
            </PillLink>
            <Link
              href={home.heroSecondaryHref}
              className="text-sm font-semibold underline underline-offset-4 transition-colors hover:text-brand"
            >
              {home.heroSecondaryAction}
            </Link>
          </div>
        </div>

        <div data-parallax={SHOWCASE_PARALLAX_SPEED}>
          <HeroShowcase home={home} />
        </div>
      </div>

      <div className="container relative mt-10 md:mt-6">
        <TrustPoints points={home.trustPoints ?? []} />
      </div>
    </section>
  )
}
