'use client'

import React, { useRef } from 'react'

import type { SectionTagContent } from '../content/tones'
import { getAccentByIndex } from '../content/tones'
import { useDrawLines } from '../hooks/use-draw-lines'
import { useFloat } from '../hooks/use-float'
import { useParallax } from '../hooks/use-parallax'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { BellBadge } from './accessories'
import { CurvedLine, DotGrid } from './decorations'
import { PillLink } from './pill-link'
import { SectionTag } from './section-tag'
import { UiCard } from './ui-card'

const BELL_PARALLAX_SPEED = 0.3
const BOARD_PARALLAX_SPEED = 0.08

interface RequestsSectionProps {
  anchor?: string | null
  tag?: SectionTagContent | null
  title: string
  description?: string | null
  action?: { label: string; href: string } | null
  cards: { id?: string | null; title: string; subtitle?: string | null; status?: string | null }[]
  stripTitle?: string | null
  stripItems: { id?: string | null; text: string }[]
}

/** Pengajuan: teks di kiri, papan kartu di kanan dengan ikon notifikasi melayang, lalu baris ringkasan. */
export const RequestsSection: React.FC<RequestsSectionProps> = ({
  anchor,
  tag,
  title,
  description,
  action,
  cards,
  stripTitle,
  stripItems,
}) => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)
  useParallax(rootRef)
  useFloat(rootRef)
  useDrawLines(rootRef)

  return (
    <section ref={rootRef} id={anchor ?? undefined} className="relative overflow-hidden bg-white py-16 md:py-24">
      <DotGrid tone="teal" columns={9} rows={3} className="absolute left-[46%] top-6 hidden md:block" />

      <div className="container grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          {tag && (
            <div data-gsap-reveal>
              <SectionTag label={tag.label} tone={tag.tone} />
            </div>
          )}
          <h2 data-gsap-reveal className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            {title}
          </h2>
          {description && (
            <p data-gsap-reveal className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
              {description}
            </p>
          )}
          {action && (
            <div data-gsap-reveal className="mt-8">
              <PillLink href={action.href}>{action.label}</PillLink>
            </div>
          )}
        </div>

        <div className="relative">
          <div data-parallax={BOARD_PARALLAX_SPEED} className="rounded-2xl bg-tint-peach p-5 md:p-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {cards.map((card, index) => (
                <div key={card.id ?? index} data-gsap-reveal>
                  <UiCard
                    accent={getAccentByIndex(index)}
                    title={card.title}
                    subtitle={card.status ?? undefined}
                    lines={card.subtitle ? [card.subtitle] : []}
                  />
                </div>
              ))}
            </div>
          </div>

          <div data-parallax={BELL_PARALLAX_SPEED} className="absolute -bottom-8 -left-4 md:-left-10">
            <div data-float>
              <BellBadge />
            </div>
          </div>
          <CurvedLine className="absolute -bottom-14 right-0 hidden md:block" />
        </div>
      </div>

      {(stripTitle || stripItems.length > 0) && (
        <div className="container mt-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {stripTitle && (
            <p data-gsap-reveal className="max-w-[220px] text-base font-bold leading-snug">
              {stripTitle}
            </p>
          )}
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {stripItems.map((item, index) => (
              <li key={item.id ?? index} data-gsap-reveal className="text-lg font-bold tracking-tight text-ink-muted/80">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
