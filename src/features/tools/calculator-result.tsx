import { Scale } from 'lucide-react'
import React from 'react'

import type { CalculationOutcome, CalculationSuccess, CalculatorDefinition, ResultRow } from './types'

const FORMULA_ROW_LABEL = 'Cara hitung'

/** "Kalkulator pesangon" → "Pesangon". */
const toToolName = (title: string): string => {
  const name = title.replace(/^Kalkulator /, '')

  return name.charAt(0).toUpperCase() + name.slice(1)
}

const splitRows = (outcome: CalculationSuccess) => {
  const total = outcome.rows.find((row) => row.isPrimary)
  const formulaRow = outcome.rows.find((row) => row.label === FORMULA_ROW_LABEL)
  const details = outcome.rows.filter((row): row is ResultRow => !row.isPrimary && row.label !== FORMULA_ROW_LABEL)

  return { total, details, formula: outcome.formula ?? formulaRow?.value }
}

interface CalculatorResultProps {
  calculator: CalculatorDefinition
  outcome: CalculationOutcome | null
}

const basisItems = (calculator: CalculatorDefinition): readonly string[] =>
  calculator.legalBasis ?? (calculator.basis ? [calculator.basis] : [])

/** Kartu gelap "Rincian perhitungan": status, ringkasan angka, rumus, total, dan dasar perhitungan. Terisi saat isian valid. */
export const CalculatorResult: React.FC<CalculatorResultProps> = ({ calculator, outcome }) => {
  const basis = basisItems(calculator)

  return (
    <aside aria-live="polite" className="rounded-3xl bg-night p-7 text-white shadow-[0_30px_70px_-30px_rgba(36,144,239,0.45)] lg:sticky lg:top-24 md:p-8">
      <h2 className="text-xl font-extrabold">Rincian perhitungan</h2>
      <p className="mt-1 text-sm text-accent-teal">{toToolName(calculator.title)}</p>
      <div className="mt-5 border-t border-white/10 pt-5">
        {!outcome && (
          <p className="rounded-2xl border border-dashed border-white/20 p-5 text-sm leading-relaxed text-white/70">
            Isi data di sebelah kiri. Rincian, rumus, dan hasilnya muncul di sini secara otomatis.
          </p>
        )}

        {outcome && 'error' in outcome && (
          <p role="alert" className="rounded-2xl bg-accent-orange/20 p-5 text-sm font-semibold">
            {outcome.error}
          </p>
        )}

        {outcome && 'rows' in outcome && <ResultBody outcome={outcome} />}
      </div>

      {basis.length > 0 && (
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
            <Scale aria-hidden className="h-4 w-4" />
            Dasar perhitungan
          </p>
          <ol className="mt-3 space-y-2.5 text-sm text-white/80">
            {basis.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-bold">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </aside>
  )
}

const ResultBody: React.FC<{ outcome: CalculationSuccess }> = ({ outcome }) => {
  const { total, details, formula } = splitRows(outcome)

  return (
    <div className="space-y-3">
      {outcome.status && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3 text-xs">
          <span className="font-bold uppercase tracking-wider text-white/60">Status</span>
          <span className="rounded-full bg-accent-purple/30 px-3 py-1 font-bold uppercase tracking-wide">{outcome.status}</span>
        </div>
      )}

      {details.map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-white/60">{row.label}</span>
          <span className="nums max-w-[60%] text-right text-sm font-bold">{row.value}</span>
        </div>
      ))}

      {formula && (
        <div className="rounded-2xl border-l-4 border-accent-purple bg-white/5 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white/60">Rumus perhitungan</p>
          <p className="nums mt-2 rounded-lg bg-black/30 px-3 py-2 font-mono text-xs">{formula}</p>
        </div>
      )}

      {outcome.note && <p className="px-1 text-xs italic leading-relaxed text-white/70">{outcome.note}</p>}

      {total && (
        <div className="rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple px-5 py-5">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">{total.label}</p>
          <p className="nums mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">{total.value}</p>
        </div>
      )}
    </div>
  )
}
