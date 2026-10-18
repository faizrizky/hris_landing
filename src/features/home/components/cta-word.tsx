import Link from 'next/link'
import React from 'react'

import { DEMO_HREF } from '@/features/site/content/labels'

interface CtaWordProps {
  word: string
  sentence: string
}

/** Seluruh pita adalah tautan: satu kata kerja raksasa. Saat disorot, warna bidang dan kata bertukar. */
export const CtaWord: React.FC<CtaWordProps> = ({ word, sentence }) => (
  <Link
    href={DEMO_HREF}
    aria-label={`${word}. ${sentence}`}
    className="group relative flex min-h-[46svh] flex-col justify-between overflow-hidden bg-accent px-[var(--margin)] pb-3 pt-6 text-ink transition-colors duration-[var(--t-hover)] hover:bg-ink hover:text-accent focus-visible:bg-ink focus-visible:text-accent md:min-h-[60svh]"
  >
    <span className="flex items-start justify-between gap-6">
      <span className="max-w-[28ch] text-[1.0625rem] font-medium md:text-[1.25rem]">{sentence}</span>
      <svg aria-hidden viewBox="0 0 48 48" width="48" height="48" className="shrink-0 max-md:size-8" fill="none">
        <path d="M12 36 36 12M16 12h20v20" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      </svg>
    </span>
    <span
      aria-hidden
      className="block whitespace-nowrap text-[clamp(7rem,30vw,38rem)] font-extrabold leading-[0.78] tracking-[-0.07em]"
    >
      {word}
    </span>
  </Link>
)
