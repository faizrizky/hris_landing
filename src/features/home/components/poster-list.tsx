import Link from 'next/link'
import React from 'react'

import type { Solution } from '@/payload-types'

interface PosterListProps {
  solutions: Solution[]
}

/** Daftar industri disusun seperti poster: nama raksasa di kiri, satu fakta kecil di kanan. */
export const PosterList: React.FC<PosterListProps> = ({ solutions }) => (
  <section className="bg-night py-20 text-paper md:py-28" aria-label="Solusi per industri">
    <ul className="wrap">
      {solutions.map((solution, index) => {
        const detail = solution.points?.[0]?.title ?? solution.tagline

        return (
          <li key={solution.id} data-reveal style={{ '--i': index } as React.CSSProperties}>
            <Link
              href={`/solusi/${solution.slug}`}
              className="group flex flex-col gap-1 py-1 transition-colors lg:flex-row lg:items-baseline lg:justify-between lg:gap-8"
            >
              <span className="t-display lowercase group-hover:text-accent group-focus-visible:text-accent">
                {solution.name}
              </span>
              <span className="text-paper/70 lg:shrink-0">{detail}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  </section>
)
