import React from 'react'

import { cn } from '@/utilities/ui'

import type { TagTone } from '../content/tones'

const TAG_TONE_CLASS: Record<TagTone, string> = {
  orange: 'bg-accent-orange text-white',
  purple: 'bg-accent-purple text-white',
  teal: 'bg-accent-teal text-ink',
  yellow: 'bg-accent-yellow text-ink',
}

interface SectionTagProps {
  label: string
  tone: TagTone
  className?: string
}

/** Label pil kecil di atas judul section. */
export const SectionTag: React.FC<SectionTagProps> = ({ label, tone, className }) => (
  <span
    className={cn(
      'inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold tracking-wider',
      TAG_TONE_CLASS[tone],
      className,
    )}
  >
    {label}
  </span>
)
