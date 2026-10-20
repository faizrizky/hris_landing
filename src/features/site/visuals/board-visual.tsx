import React from 'react'

import { DotGrid } from '@/features/home/components/decorations'
import { UiCard } from '@/features/home/components/ui-card'
import { getAccentByIndex } from '@/features/home/content/tones'
import { cn } from '@/utilities/ui'

const MAX_BOARD_CARDS = 6

export interface BoardCard {
  title: string
  subtitle?: string
  line?: string
}

interface BoardVisualProps {
  /** Kelas warna latar papan, mis. `bg-tint-peach`. */
  boardClassName: string
  cards: BoardCard[]
  /** Objek melayang di sudut kiri bawah papan. */
  accessory: React.ReactNode
}

/** Papan kartu berwarna dengan objek melayang, seperti papan pengajuan di beranda. */
export const BoardVisual: React.FC<BoardVisualProps> = ({ boardClassName, cards, accessory }) => (
  <div aria-hidden className="relative mx-auto w-full max-w-[520px] py-6">
    <DotGrid tone="teal" columns={8} rows={3} className="absolute -top-2 right-4 hidden md:block" />
    <div className={cn('rounded-2xl p-5 md:p-6', boardClassName)}>
      <ul className="grid grid-cols-2 gap-3">
        {cards.slice(0, MAX_BOARD_CARDS).map((card, index) => (
          <li key={index} data-enter="rise" className="min-w-0">
            <div data-float>
              <UiCard
                accent={getAccentByIndex(index)}
                title={card.title}
                subtitle={card.subtitle}
                lines={card.line ? [card.line] : []}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="absolute -bottom-4 -left-3 md:-left-8" data-parallax="0.3">
      <div data-enter="pop">
        <div data-float>{accessory}</div>
      </div>
    </div>
  </div>
)
