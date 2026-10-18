import React from 'react'

import type { Home } from '@/payload-types'

import { ResultFragment } from './ui-fragments'

interface CallResponseProps {
  heading: string
  steps: NonNullable<Home['howSteps']>
}

/** Urutan ditunjukkan sebagai apa yang diberikan dan apa yang kembali, dalam satu kolom sempit. */
export const CallResponse: React.FC<CallResponseProps> = ({ heading, steps }) => (
  <section className="py-[calc(var(--section)/2)]" aria-labelledby="judul-cara-kerja">
    <div className="wrap grid12">
      <h2 id="judul-cara-kerja" data-reveal className="t-head col-span-12 md:col-span-6 md:col-start-4">
        {heading}
      </h2>

      <ol className="col-span-12 mt-14 space-y-[88px] md:col-span-9 md:col-start-4">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1

          return (
            <li key={step.id ?? step.sentence} data-reveal>
              <p className="t-statement max-w-[560px] font-medium">{step.sentence}</p>
              <p className="mt-4 max-w-[560px] bg-paper-2 px-5 py-4">{step.call}</p>
              <div className={isLast ? 'mt-5 md:w-[min(760px,100%)]' : 'mt-5 max-w-[560px] md:pl-14'}>
                <ResultFragment
                  title={step.resultTitle}
                  figure={step.resultFigure}
                  lines={(step.resultLines ?? []).map((line) => line.text)}
                  status={step.resultStatus}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  </section>
)
