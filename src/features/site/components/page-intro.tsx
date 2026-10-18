'use client'

import React, { useRef } from 'react'

import { PillLink } from '@/features/home/components/pill-link'
import { SectionTag } from '@/features/home/components/section-tag'
import type { SectionTagContent } from '@/features/home/content/tones'
import { useFloat } from '@/features/home/hooks/use-float'
import { useHeroShowcase } from '@/features/home/hooks/use-hero-showcase'
import { useParallax } from '@/features/home/hooks/use-parallax'
import { useVisualEntrance } from '@/features/home/hooks/use-visual-entrance'
import { usePhoneIntro } from '@/features/home/hooks/use-phone-intro'

const VISUAL_PARALLAX_SPEED = 0.1

interface PageIntroProps {
  title: string
  sentence?: string
  tag?: SectionTagContent
  buttons?: { label: string; href: string; style?: 'fill' | 'stroke' | null }[]
  note?: string
  /** Visual di kanan (isometrik, papan kartu, HP, dan lainnya). Tanpa ini, pembuka hanya teks. */
  visual?: React.ReactNode
}

/** Pembuka halaman dalam, selaras dengan hero beranda (setinggi layar, jadi bagian di bawahnya baru beranimasi saat di-scroll): teks di kiri, mockup isometrik beranimasi di kanan. */
export const PageIntro: React.FC<PageIntroProps> = ({ title, sentence, tag, buttons = [], note, visual }) => {
  const rootRef = useRef<HTMLElement>(null)

  useHeroShowcase(rootRef)
  useParallax(rootRef)
  useVisualEntrance(rootRef)
  useFloat(rootRef)
  usePhoneIntro(rootRef)

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-tint-sky via-white to-white pb-16 pt-28 md:pt-32"
    >
      <div className="container grid w-full items-center gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          {tag && <SectionTag label={tag.label} tone={tag.tone} />}
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {note && <p className="mt-4 text-sm font-semibold text-accent-orange">{note}</p>}
          {sentence && <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">{sentence}</p>}
          {buttons.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {buttons.map((button) => (
                <PillLink
                  key={`${button.label}-${button.href}`}
                  href={button.href}
                  variant={button.style === 'stroke' ? 'outline' : 'dark'}
                  className="px-8 py-3.5"
                >
                  {button.label}
                </PillLink>
              ))}
            </div>
          )}
        </div>
        {visual && <div data-parallax={VISUAL_PARALLAX_SPEED}>{visual}</div>}
      </div>
    </section>
  )
}
