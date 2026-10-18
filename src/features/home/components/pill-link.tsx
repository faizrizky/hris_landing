import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

type PillLinkVariant = 'dark' | 'outline' | 'accent'

const PILL_VARIANT_CLASS: Record<PillLinkVariant, string> = {
  dark: 'bg-ink text-white hover:bg-ink/85',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-white',
  accent: 'bg-accent-purple text-white hover:bg-accent-purple/85',
}

interface PillLinkProps {
  href: string
  variant?: PillLinkVariant
  className?: string
  children: React.ReactNode
}

/** Tombol berbentuk pil yang berupa tautan. */
export const PillLink: React.FC<PillLinkProps> = ({
  href,
  variant = 'dark',
  className,
  children,
}) => (
  <Link
    href={href}
    className={cn(
      'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors',
      PILL_VARIANT_CLASS[variant],
      className,
    )}
  >
    {children}
  </Link>
)
