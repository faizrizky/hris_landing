import React from 'react'

import { getAccentByIndex, type AccentColor } from '@/features/home/content/tones'
import { cn } from '@/utilities/ui'

const MAX_CHIPS = 4
const CHIP_POSITION_CLASSES = [
  'left-4 top-5',
  'right-4 top-16',
  'left-8 bottom-16',
  'right-6 bottom-5',
] as const

const ACCENT_DOT_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

interface PanelVisualProps {
  /** Kelas warna latar panel, mis. `bg-tint-sky`. */
  panelClassName: string
  /** Lencana besar di tengah. */
  badge: React.ReactNode
  /** Label yang melayang di sekeliling lencana. */
  chips: string[]
}

/** Panel berwarna dengan lencana besar di tengah dan label melayang di sekelilingnya. */
export const PanelVisual: React.FC<PanelVisualProps> = ({ panelClassName, badge, chips }) => (
  <div aria-hidden className={cn('relative mx-auto h-[300px] w-full max-w-[440px] overflow-hidden rounded-3xl', panelClassName)}>
    <div data-parallax="0.12" className="absolute inset-0 grid place-items-center">
      <div className="scale-[1.5]">
        <div data-enter="pop">
          <div data-float>{badge}</div>
        </div>
      </div>
    </div>
    {chips.slice(0, MAX_CHIPS).map((chip, index) => (
      <div
        key={chip}
        data-parallax={index % 2 === 0 ? '0.25' : '0.08'}
        className={cn('absolute max-w-[60%]', CHIP_POSITION_CLASSES[index])}
      >
        <div data-enter="rise">
        <div
          data-float
          className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold shadow-[0_10px_24px_-12px_rgba(20,20,60,0.35)]"
        >
          <span className={cn('h-2 w-2 shrink-0 rounded-full', ACCENT_DOT_CLASS[getAccentByIndex(index)])} />
          <span className="truncate">{chip}</span>
        </div>
        </div>
      </div>
    ))}
  </div>
)
