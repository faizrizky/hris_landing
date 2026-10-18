import React from 'react'

import { SectionTag } from '@/features/home/components/section-tag'
import type { SectionTagContent } from '@/features/home/content/tones'
import { cn } from '@/utilities/ui'

interface PageSectionProps {
  title?: string
  description?: string
  tag?: SectionTagContent
  /** Pita latar penuh, seperti pita warna di beranda. */
  bandClassName?: string
  ariaLabel?: string
  children: React.ReactNode
}

/** Bagian halaman dalam: judul bertag di atas, isi di bawah. Pita latar opsional. */
export const PageSection: React.FC<PageSectionProps> = ({
  title,
  description,
  tag,
  bandClassName,
  ariaLabel,
  children,
}) => (
  <section aria-label={ariaLabel ?? title} className={cn('py-12 md:py-20', bandClassName)}>
    <div className="container">
      {title && (
        <div className="max-w-2xl">
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
      <div className={cn(title && 'mt-10')}>{children}</div>
    </div>
  </section>
)
