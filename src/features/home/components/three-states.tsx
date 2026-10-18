'use client'

import React, { useState } from 'react'

import type { Home } from '@/payload-types'

import { RequestRow } from './ui-fragments'

interface ThreeStatesProps {
  heading: string
  states: Home['showcaseStates']
  row: Home['showcaseRow']
}

/**
 * Satu baris pengajuan ditampilkan tiga kali, bertumpuk: saat masuk, saat dibuka atasan, saat selesai.
 * Salinan tengah hidup: tombol Setujui mengubahnya menjadi keadaan selesai.
 */
export const ThreeStates: React.FC<ThreeStatesProps> = ({ heading, states, row }) => {
  const [isApproved, setIsApproved] = useState(false)

  const rowProps = { ...row }

  return (
    <section className="py-[calc(var(--section)/2)]" aria-labelledby="judul-tiga-keadaan">
      <div className="wrap grid12">
        <h2 id="judul-tiga-keadaan" data-reveal className="t-head col-span-12 md:col-span-6 md:col-start-4">
          {heading}
        </h2>
      </div>

      <div className="wrap mt-16 space-y-14 md:mt-24">
        <div data-reveal className="grid12 items-center gap-y-3">
          <p className="col-span-12 text-ink-soft md:col-span-3 md:text-right md:text-[1.5rem]">{states.arrive}</p>
          <div className="col-span-12 md:col-span-6">
            <RequestRow {...rowProps} state="pending" />
          </div>
        </div>

        <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="grid12 items-center gap-y-3">
          <p className="col-span-12 text-ink-soft md:col-span-3 md:text-right md:text-[1.5rem]">
            {isApproved ? states.done : states.hover}
          </p>
          <div className="col-span-12 md:col-span-6" aria-live="polite">
            <RequestRow {...rowProps} state={isApproved ? 'done' : 'open'} onApprove={() => setIsApproved(true)} />
            {isApproved && (
              <button type="button" onClick={() => setIsApproved(false)} className="link mt-2 text-ink-soft">
                Ulangi
              </button>
            )}
          </div>
        </div>

        <div data-reveal style={{ '--i': 2 } as React.CSSProperties} className="grid12 items-center gap-y-3">
          <p className="col-span-12 text-ink-soft md:col-span-3 md:text-right md:text-[1.5rem]">{states.done}</p>
          <div className="col-span-12 md:col-span-6">
            <RequestRow {...rowProps} state="done" />
          </div>
        </div>
      </div>
    </section>
  )
}
