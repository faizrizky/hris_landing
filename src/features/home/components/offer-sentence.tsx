import Link from 'next/link'
import React from 'react'

import { DEMO_HREF } from '@/features/site/content/labels'

interface OfferSentenceProps {
  sentence: string
  action: string
  included: string[]
}

/** Seluruh penawaran dalam satu kalimat besar. Belum ada daftar harga, jadi tidak ada angka yang dikarang. */
export const OfferSentence: React.FC<OfferSentenceProps> = ({ sentence, action, included }) => (
  <section className="bg-paper-2 py-[calc(var(--section)/2)]" aria-labelledby="judul-penawaran">
    <div className="wrap">
      <h2 id="judul-penawaran" data-reveal className="t-big max-w-[18ch] md:max-w-[26ch]">
        {sentence}
      </h2>
      <div className="mt-14 grid12 gap-y-10">
        <ul data-reveal className="col-span-12 space-y-1 text-[1.0625rem] md:col-span-6">
          {included.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="col-span-12 md:col-span-4 md:col-start-9">
          <Link href={DEMO_HREF} className="btn w-full md:w-auto">
            {action}
          </Link>
        </div>
      </div>
    </div>
  </section>
)
