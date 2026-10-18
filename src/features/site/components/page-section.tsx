'use client'

import React, { useRef } from 'react'

import { SectionTag } from '@/features/home/components/section-tag'
import type { SectionTagContent } from '@/features/home/content/tones'
import { useFloat } from '@/features/home/hooks/use-float'
import { useParallax } from '@/features/home/hooks/use-parallax'
import { usePhoneEntrance } from '@/features/home/hooks/use-phone-entrance'
import { cn } from '@/utilities/ui'

interface PageSectionProps {
  title?: string
  description?: string
  tag?: SectionTagContent
  /** Pita latar penuh, seperti pita warna di beranda. */
  bandClassName?: string
  ariaLabel?: string
  /** Gambar beranimasi di samping judul. Bergerak saat bagian ini masuk layar. */
  visual?: React.ReactNode
  visualSide?: 'left' | 'right'
  children: React.ReactNode
}

/** Bagian halaman dalam: judul bertag (dan gambar di sampingnya bila ada), isi di bawah. Pita latar opsional. */
export const PageSection: React.FC<PageSectionProps> = ({
  title,
  description,
  tag,
  bandClassName,
  ariaLabel,
  visual,
  visualSide = 'right',
  children,
}) => {
  const rootRef = useRef<HTMLElement>(null)

  useParallax(rootRef)
  useFloat(rootRef)
  usePhoneEntrance(rootRef)

  return (
    <section ref={rootRef} aria-label={ariaLabel ?? title} className={cn('overflow-hidden py-12 md:py-20', bandClassName)}>
      <div className="container">
        <div className={cn(visual && 'grid items-center gap-10 md:grid-cols-2')}>
          {title && (
            <div className={cn('max-w-2xl', visual && visualSide === 'left' && 'md:order-2')}>
              {tag && (
                <div data-reveal>
                  <SectionTag label={tag.label} tone={tag.tone} />
                </div>
              )}
              <h2 data-reveal className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                {title}
              </h2>
              {description && (
                <p data-reveal className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {description}
                </p>
              )}
            </div>
          )}
          {visual && <div className={cn(visualSide === 'left' && 'md:order-1')}>{visual}</div>}
        </div>
        <div className={cn(title && 'mt-10')}>{children}</div>
      </div>
    </section>
  )
}
