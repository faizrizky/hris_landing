'use client'

import React, { useRef } from 'react'

import { useFaceScan } from '../../hooks/use-face-scan'

interface FaceClockScreenProps {
  title?: string | null
  date?: string | null
  chips: string[]
  buttonLabel?: string | null
}

/** Layar HP: simulasi absen dengan verifikasi wajah. Animasi diatur `useFaceScan`. */
export const FaceClockScreen: React.FC<FaceClockScreenProps> = ({ title, date, chips, buttonLabel }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  useFaceScan(rootRef)

  return (
    <div ref={rootRef} className="flex h-full flex-col items-center px-5 pt-10 text-ink">
      <p className="text-sm font-bold">{title}</p>
      <p className="text-xs text-ink-muted">{date}</p>

      <div className="relative mt-6 h-40 w-40">
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-phone-sky" />
        <div data-face-ok className="absolute inset-0 rounded-full border-4 border-accent-teal" />
        <svg aria-hidden viewBox="0 0 64 64" className="absolute inset-0 m-auto h-20 w-20 text-phone-sky" fill="currentColor">
          <circle cx="32" cy="24" r="12" />
          <path d="M10 58c2-14 12-20 22-20s20 6 22 20z" />
        </svg>
        <div className="absolute inset-3 overflow-hidden rounded-full">
          <div
            data-scan-line
            className="h-0.5 w-full bg-accent-teal shadow-[0_0_12px_2px_var(--color-accent-teal)] motion-reduce:hidden"
          />
        </div>
        <svg aria-hidden viewBox="0 0 24 24" className="absolute inset-0 m-auto h-14 w-14" fill="none">
          <path
            data-face-check
            d="M5 12.5 L10 17.5 L19 7"
            stroke="var(--color-accent-teal)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <ul className="mt-6 flex flex-col items-center gap-2">
        {chips.map((chip) => (
          <li key={chip} data-face-chip className="rounded-full bg-tint-cyan px-3 py-1 text-xs font-medium text-ink">
            {chip}
          </li>
        ))}
      </ul>

      {buttonLabel && (
        <span className="mt-6 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold text-white">{buttonLabel}</span>
      )}
    </div>
  )
}
