'use client'

import React, { useRef } from 'react'

import { DEMO_HREF, REQUEST_CARDS, REQUESTS_SECTION } from '../content/home-content'
import { useDrawLines } from '../hooks/use-draw-lines'
import { useFloat } from '../hooks/use-float'
import { useParallax } from '../hooks/use-parallax'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { CurvedLine, DotGrid } from './decorations'
import { PillLink } from './pill-link'
import { SectionTag } from './section-tag'
import { UiCard } from './ui-card'

const BELL_PARALLAX_SPEED = 0.3
const BOARD_PARALLAX_SPEED = 0.08

/** Section pengajuan: teks di kiri, papan kartu pengajuan di kanan dengan ikon notifikasi melayang. */
export const RequestsSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)
  useParallax(rootRef)
  useFloat(rootRef)
  useDrawLines(rootRef)

  return (
    <section ref={rootRef} id={REQUESTS_SECTION.id} className="relative overflow-hidden bg-white py-16 md:py-24">
      <DotGrid tone="teal" columns={9} rows={3} className="absolute left-[46%] top-6 hidden md:block" />

      <div className="container grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div data-reveal>
            <SectionTag label={REQUESTS_SECTION.tag.label} tone={REQUESTS_SECTION.tag.tone} />
          </div>
          <h2 data-reveal className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            {REQUESTS_SECTION.title}
          </h2>
          <p data-reveal className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
            {REQUESTS_SECTION.description}
          </p>
          <div data-reveal className="mt-8">
            <PillLink href={DEMO_HREF}>{REQUESTS_SECTION.ctaLabel}</PillLink>
          </div>
        </div>

        <div className="relative">
          <div data-parallax={BOARD_PARALLAX_SPEED} className="rounded-2xl bg-tint-peach p-5 md:p-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {REQUEST_CARDS.map(({ id, ...card }) => (
                <div key={id} data-reveal>
                  <UiCard {...card} />
                </div>
              ))}
            </div>
          </div>

          <div
            data-parallax={BELL_PARALLAX_SPEED}
            className="absolute -bottom-8 -left-4 md:-left-10"
          >
            <div data-float>
              <svg aria-hidden width="96" height="104" viewBox="0 0 96 104" fill="none">
                <path
                  d="M48 8c-18 0-30 13-30 31v18l-8 14c-1.5 3 .5 6 4 6h68c3.500 0 5.500-3 4-6l-8-14V39C78 21 66 8 48 8z"
                  className="fill-accent-purple"
                />
                <path d="M36 82a12 12 0 0 0 24 0z" className="fill-phone-lavender" />
                <circle cx="70" cy="22" r="11" className="fill-accent-orange" />
              </svg>
            </div>
          </div>
          <CurvedLine className="absolute -bottom-14 right-0 hidden md:block" />
        </div>
      </div>

      <div className="container mt-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p data-reveal className="max-w-[220px] text-base font-bold leading-snug">
          {REQUESTS_SECTION.stripTitle}
        </p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {REQUESTS_SECTION.stripItems.map((name) => (
            <li key={name} data-reveal className="text-lg font-bold tracking-tight text-ink-muted/80">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
