'use client'

import React, { useRef } from 'react'

import { cn } from '@/utilities/ui'

import type { SectionTagContent } from '../content/tones'
import { useDrawLines } from '../hooks/use-draw-lines'
import { useFloat } from '../hooks/use-float'
import { useParallax } from '../hooks/use-parallax'
import { usePhoneEntrance } from '../hooks/use-phone-entrance'
import { useRevealOnScroll } from '../hooks/use-reveal-on-scroll'
import { CurvedLine } from './decorations'
import { PillLink } from './pill-link'
import { SectionTag } from './section-tag'

const PHONE_PARALLAX_SPEED = 0.18

interface FeatureBandProps {
  id?: string | null
  tag?: SectionTagContent | null
  title: string
  description?: string | null
  action?: { label: string; href: string } | null
  tintClassName: string
  /** Objek melayang di sudut HP. */
  accessory: React.ReactNode
  /** Layar HP yang ditampilkan di dalam bingkai. */
  children: React.ReactNode
}

/** Pita berwarna dengan HP di kiri (terpotong di tepi pita) dan teks di kanan. */
export const FeatureBand: React.FC<FeatureBandProps> = ({
  id,
  tag,
  title,
  description,
  action,
  tintClassName,
  accessory,
  children,
}) => {
  const rootRef = useRef<HTMLElement>(null)

  useRevealOnScroll(rootRef)
  useParallax(rootRef)
  useDrawLines(rootRef)
  usePhoneEntrance(rootRef)
  useFloat(rootRef)

  return (
    <section ref={rootRef} id={id ?? undefined} className="bg-white py-10 md:py-16">
      <div className={cn('relative overflow-hidden', tintClassName)}>
        <div className="container grid items-center gap-8 md:h-[460px] md:grid-cols-2">
          <div className="relative order-2 h-[360px] md:order-1 md:h-full">
            <div
              data-parallax={PHONE_PARALLAX_SPEED}
              className="absolute left-1/2 top-10 -translate-x-1/2 md:left-[18%] md:top-12 md:translate-x-0"
            >
              <div data-phone className="relative">
                {children}
                <div data-pop className="absolute -right-8 top-24 md:-right-12">
                  <div data-float>{accessory}</div>
                </div>
              </div>
            </div>
            <CurvedLine className="absolute -left-6 top-16 hidden md:block" />
          </div>

          <div className="order-1 py-10 md:order-2 md:py-0">
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
        </div>
      </div>
    </section>
  )
}
