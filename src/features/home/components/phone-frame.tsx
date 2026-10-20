import React from 'react'

import { cn } from '@/utilities/ui'

type PhoneTone = 'sky' | 'lavender'

const PHONE_TONE_CLASS: Record<PhoneTone, string> = {
  sky: 'border-phone-sky bg-phone-sky',
  lavender: 'border-phone-lavender bg-phone-lavender',
}

interface PhoneFrameProps {
  tone: PhoneTone
  className?: string
  /** Bingkai tipis untuk tangkapan layar asli: tinggi mengikuti proporsi gambar, tanpa poni. */
  isScreenshot?: boolean
  children: React.ReactNode
}

const SCREENSHOT_ASPECT_CLASS = 'aspect-[560/1106]'

/** Bingkai HP sederhana dengan poni. Tinggi dibiarkan melebihi section agar bagian bawah terpotong. */
export const PhoneFrame: React.FC<PhoneFrameProps> = ({ tone, className, isScreenshot, children }) =>
  isScreenshot ? (
    <div
      className={cn(
        'relative w-[250px] rounded-[2.2rem] border-[5px] shadow-[0_30px_60px_-25px_rgba(60,60,140,0.45)]',
        PHONE_TONE_CLASS[tone],
        className,
      )}
    >
      <div className={cn('w-full overflow-hidden rounded-[1.8rem] bg-white', SCREENSHOT_ASPECT_CLASS)}>{children}</div>
    </div>
  ) : (
  <div
    className={cn(
      'relative w-[260px] rounded-[2.6rem] border-[10px] shadow-[0_30px_60px_-25px_rgba(60,60,140,0.45)]',
      PHONE_TONE_CLASS[tone],
      className,
    )}
  >
    <span
      aria-hidden
      className="absolute left-1/2 top-0 z-10 h-4 w-24 -translate-x-1/2 rounded-b-2xl bg-inherit"
    />
    <div className="h-[540px] overflow-hidden rounded-[2rem] bg-white">{children}</div>
  </div>
)
