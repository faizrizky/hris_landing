import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

type PillLinkVariant = 'dark' | 'outline' | 'accent'

const PILL_VARIANT_CLASS: Record<PillLinkVariant, string> = {
  dark: 'bg-ink text-white hover:bg-ink/85',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-white',
  accent: 'bg-accent-purple text-white hover:bg-accent-purple/85',
}

const EXTERNAL_HREF = /^(https?:|mailto:|tel:)/i

interface PillLinkProps {
  href: string
  variant?: PillLinkVariant
  className?: string
  children: React.ReactNode
}

/** Tombol berbentuk pil yang berupa tautan. Tautan luar (https, mailto, tel) memakai <a> biasa. */
export const PillLink: React.FC<PillLinkProps> = ({ href, variant = 'dark', className, children }) => {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors',
    PILL_VARIANT_CLASS[variant],
    className,
  )

  if (EXTERNAL_HREF.test(href)) {
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
