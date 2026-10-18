import React from 'react'

import { PillLink } from '@/features/home/components/pill-link'
import { SectionTag } from '@/features/home/components/section-tag'
import type { SectionTagContent } from '@/features/home/content/tones'

interface PageIntroProps {
  title: string
  sentence?: string
  tag?: SectionTagContent
  action?: { label: string; href: string }
  note?: string
}

/** Pembuka halaman dalam, selaras dengan hero beranda: latar sky memudar, label, judul, kalimat, satu tombol. */
export const PageIntro: React.FC<PageIntroProps> = ({ title, sentence, tag, action, note }) => (
  <section className="bg-gradient-to-b from-tint-sky via-white to-white pb-12 pt-32 md:pb-16 md:pt-40">
    <div className="container">
      {tag && <SectionTag label={tag.label} tone={tag.tone} />}
      <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">{title}</h1>
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
  </section>
)
