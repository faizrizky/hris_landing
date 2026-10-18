import React from 'react'

import { cn } from '@/utilities/ui'

interface StatusPillProps {
  label: string
  isDone: boolean
  className?: string
}

/** Kapsul status pengajuan: hijau tosca bila selesai, kuning bila masih menunggu. */
export const StatusPill: React.FC<StatusPillProps> = ({ label, isDone, className }) => (
  <span
    className={cn(
      'rounded-full px-2 py-0.5 font-medium',
      isDone ? 'bg-accent-teal/25' : 'bg-accent-yellow/30',
      className,
    )}
  >
    {label}
  </span>
)
