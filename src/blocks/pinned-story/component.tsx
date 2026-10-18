'use client'

import React, { useRef } from 'react'

import { Media } from '@/components/Media'
import type { PinnedStoryBlock as PinnedStoryBlockProps } from '@/payload-types'

import { usePinnedStoryAnimation } from './use-pinned-story-animation'

/**
 * Kelas `is-pinned` ditambahkan ke <section> oleh hook saat mode pin aktif
 * (lihat PINNED_CLASS_NAME). Ditulis literal di bawah agar terbaca Tailwind.
 */
export const PinnedStoryBlock: React.FC<PinnedStoryBlockProps> = ({ steps }) => {
  const rootRef = useRef<HTMLElement>(null)
  const backgroundColors = steps.map((step) => step.backgroundColor)

  usePinnedStoryAnimation(rootRef, backgroundColors)

  if (steps.length === 0) return null

  return (
    <section
      ref={rootRef}
      className="group/story relative w-full overflow-hidden md:h-screen"
      style={{ backgroundColor: backgroundColors[0] }}
    >
      {steps.map((step) => {
        const chips = step.chips ?? []

        return (
          <article
            key={step.id}
            data-story-panel
            className="group-[.is-pinned]/story:absolute group-[.is-pinned]/story:inset-0 group-[.is-pinned]/story:!bg-transparent"
            style={{ backgroundColor: step.backgroundColor }}
          >
            <div className="container grid items-center gap-8 py-16 md:grid-cols-2 group-[.is-pinned]/story:h-full group-[.is-pinned]/story:py-0">
              <div>
                <h2 className="text-3xl font-semibold md:text-5xl">{step.title}</h2>
                <p className="mt-4 text-lg text-foreground/70">{step.description}</p>
                {chips.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <li
                        key={chip.id}
                        data-story-chip
                        className="rounded-full bg-white/80 px-3 py-1 text-sm font-medium shadow-sm"
                      >
                        {chip.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-center">
                <Media
                  resource={step.screenshot}
                  imgClassName="max-h-[70vh] w-auto rounded-[2rem] border border-border shadow-xl"
                />
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
