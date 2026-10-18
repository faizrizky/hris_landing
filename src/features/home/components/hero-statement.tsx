import Link from 'next/link'
import React from 'react'

import { DEMO_HREF } from '@/features/site/content/labels'
import type { Home } from '@/payload-types'

interface HeroStatementProps {
  home: Home
}

/** Layar pertama: dua baris pernyataan raksasa, satu kalimat, satu aksi. Tanpa gambar. */
export const HeroStatement: React.FC<HeroStatementProps> = ({ home }) => (
  <section aria-labelledby="judul-utama" className="wrap flex min-h-svh flex-col justify-between pb-7 pt-[18svh]">
    <h1 id="judul-utama" className="t-display lines">
      <span className="line text-left">
        <span data-line style={{ '--i': 0 } as React.CSSProperties}>
          {home.heroLineOne}
        </span>
      </span>
      <span className="line text-left md:text-right">
        <span data-line style={{ '--i': 1 } as React.CSSProperties}>
          {home.heroLineTwo}
        </span>
      </span>
    </h1>

    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <p data-rise style={{ '--i': 3 } as React.CSSProperties} className="t-statement max-w-[44ch]">
        {home.heroSentence}
      </p>
      <Link data-rise style={{ '--i': 4 } as React.CSSProperties} href={DEMO_HREF} className="btn w-full md:w-auto">
        {home.heroAction}
      </Link>
    </div>
  </section>
)
