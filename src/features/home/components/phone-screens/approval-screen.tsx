'use client'

import React, { useRef } from 'react'

import { APPROVAL_SCREEN } from '../../content/home-content'
import { useApprovalChecklist } from '../../hooks/use-approval-checklist'

/** Layar HP: daftar approval yang disetujui satu per satu. Animasi diatur `useApprovalChecklist`. */
export const ApprovalScreen: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useApprovalChecklist(rootRef)

  return (
    <div ref={rootRef} className="flex h-full flex-col text-ink">
      <div className="bg-phone-lavender px-5 pb-6 pt-10 text-white">
        <p className="text-lg font-bold">{APPROVAL_SCREEN.title}</p>
        <p className="text-xs opacity-80">{APPROVAL_SCREEN.subtitle}</p>
      </div>

      <ul className="divide-y divide-black/5 px-4">
        {APPROVAL_SCREEN.items.map((item) => (
          <li key={item.id} data-check-item className="flex items-center gap-3 py-3.5">
            <span className="relative h-6 w-6 shrink-0 rounded-full border-2 border-accent-purple">
              <span
                data-check-fill
                className="absolute inset-0 grid place-items-center rounded-full bg-accent-purple opacity-0"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path
                    data-check-path
                    d="M5 12.5 L10 17.5 L19 7"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>

            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tint-lavender text-[10px] font-bold text-accent-purple">
              {item.initials}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{item.name}</p>
              <p className="truncate text-[11px] text-ink-muted">{item.detail}</p>
            </div>

            <span className="relative h-5 w-[68px] shrink-0">
              <span
                data-badge-pending
                className="absolute inset-0 grid place-items-center rounded-full bg-accent-yellow/30 text-[10px] font-semibold"
              >
                {APPROVAL_SCREEN.pendingLabel}
              </span>
              <span
                data-badge-done
                className="absolute inset-0 grid place-items-center rounded-full bg-accent-teal/30 text-[10px] font-semibold opacity-0"
              >
                {APPROVAL_SCREEN.doneLabel}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
