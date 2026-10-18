'use client'

import React, { useRef } from 'react'

import { PillLink } from '@/features/home/components/pill-link'
import { SectionTag } from '@/features/home/components/section-tag'
import type { SectionTagContent } from '@/features/home/content/tones'
import { useHeroShowcase } from '@/features/home/hooks/use-hero-showcase'
import { useParallax } from '@/features/home/hooks/use-parallax'

const VISUAL_PARALLAX_SPEED = 0.1

interface PageIntroProps {
  title: string
  sentence?: string
  tag?: SectionTagContent
  action?: { label: string; href: string }
  note?: string
  /** Mockup isometrik di kanan (PageVisual). Tanpa ini, pembuka hanya teks. */
  visual?: React.ReactNode
}

/** Pembuka halaman dalam, selaras dengan hero beranda: teks di kiri, mockup isometrik beranimasi di kanan. */
export const PageIntro: React.FC<PageIntroProps> = ({ title, sentence, tag, action, note, visual }) => {
  const rootRef = useRef<HTMLElement>(null)

  useHeroShowcase(rootRef)
  useParallax(rootRef)

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-tint-sky via-white to-white pb-12 pt-32 md:pb-16 md:pt-36"
    >
      <div className="container grid items-center gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          {tag && <SectionTag label={tag.label} tone={tag.tone} />}
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {note && <p className="mt-4 text-sm font-semibold text-accent-orange">{note}</p>}
          {sentence && <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">{sentence}</p>}
          {action && (
            <div className="mt-8">
              <PillLink href={action.href} className="px-8 py-3.5">
                {action.label}
              </PillLink>
            </div>
          )}
        </div>
        {visual && <div data-parallax={VISUAL_PARALLAX_SPEED}>{visual}</div>}
      </div>
    </section>
  )
}
