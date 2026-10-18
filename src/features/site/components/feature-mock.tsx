import React from 'react'

import type { Feature } from '@/types/cms'

interface FeatureMockProps {
  mock: Feature['mock']
}

/** Contoh tampilan fitur di aplikasi, dibangun di HTML. Fragmen antarmuka (data-ui), bukan tangkapan layar. */
export const FeatureMock: React.FC<FeatureMockProps> = ({ mock }) => (
  <div data-ui className="min-h-[220px] w-full border border-[var(--ui-line)] bg-white p-5">
    <p className="font-bold">{mock.title}</p>
    <ul className="mt-4">
      {(mock.rows ?? []).map((row) => (
        <li key={row.id ?? row.label} className="flex items-baseline justify-between gap-4 px-3 py-3 odd:bg-paper-2">
          <span>
            <span className="block font-semibold leading-tight">{row.label}</span>
            <span className="block text-ink-soft">{row.detail}</span>
          </span>
          <span className="shrink-0 font-semibold">{row.status}</span>
        </li>
      ))}
    </ul>
  </div>
)
