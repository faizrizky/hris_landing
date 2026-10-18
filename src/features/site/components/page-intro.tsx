import Link from 'next/link'
import React from 'react'

interface PageIntroProps {
  title: string
  sentence?: string
  action?: { label: string; href: string }
  note?: string
}

/** Pembuka halaman dalam: satu judul besar (maksimal dua baris), satu kalimat, satu aksi. */
export const PageIntro: React.FC<PageIntroProps> = ({ title, sentence, action, note }) => (
  <section className="wrap pb-[calc(var(--section)/3)] pt-32 md:pt-44">
    <h1 className="t-big lines max-w-[18ch] md:max-w-[22ch]">
      <span className="line">
        <span data-line>{title}</span>
      </span>
    </h1>
    {note && (
      <p data-rise style={{ '--i': 2 } as React.CSSProperties} className="mt-6 font-semibold text-ink-soft">
        {note}
      </p>
    )}
    {sentence && (
      <p data-rise style={{ '--i': 3 } as React.CSSProperties} className="t-statement mt-8 max-w-[44ch]">
        {sentence}
      </p>
    )}
    {action && (
      <Link data-rise style={{ '--i': 4 } as React.CSSProperties} href={action.href} className="btn mt-10">
        {action.label}
      </Link>
    )}
  </section>
)
