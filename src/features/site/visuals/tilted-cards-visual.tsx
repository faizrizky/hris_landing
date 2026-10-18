import React from 'react'

import { cn } from '@/utilities/ui'

const CARD_TONE_CLASSES = ['bg-card-yellow', 'bg-card-cyan', 'bg-card-pink'] as const
const CARD_ROTATIONS_DEG = [-4, 2, -2] as const
const MAX_CARDS = 3

export interface TiltedCard {
  title: string
  description: string
}

interface TiltedCardsVisualProps {
  cards: TiltedCard[]
}

/** Tiga kartu pastel miring bertumpuk, seperti kartu testimoni di beranda. */
export const TiltedCardsVisual: React.FC<TiltedCardsVisualProps> = ({ cards }) => (
  <div aria-hidden className="relative mx-auto flex w-full max-w-[460px] flex-col gap-4 py-4">
    {cards.slice(0, MAX_CARDS).map((card, index) => (
      <div
        key={card.title}
        data-float
        style={{ rotate: `${CARD_ROTATIONS_DEG[index]}deg` }}
        className={cn(
          'rounded-2xl p-5 shadow-[0_14px_30px_-16px_rgba(20,20,60,0.3)]',
          CARD_TONE_CLASSES[index],
          index === 1 && 'md:ml-10',
          index === 2 && 'md:ml-4',
        )}
      >
        <p className="text-sm font-bold">{card.title}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-muted">{card.description}</p>
      </div>
    ))}
  </div>
)
