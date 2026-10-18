import React from 'react'

import { cn } from '@/utilities/ui'

import type { CalculatorField } from './types'
import { FIELD_KIND } from './types'

const MAX_SEGMENTED_OPTIONS = 3
const UNIT_IN_LABEL = /\s*\([^)]*\)\s*$/
const THOUSANDS_SEPARATOR = /\B(?=(\d{3})+(?!\d))/g

/** 5000000 → "5.000.000" untuk tampilan isian uang. */
const formatMoneyInput = (digits: string): string => digits.replace(THOUSANDS_SEPARATOR, '.')

const INPUT_SHELL_CLASS =
  'flex items-center rounded-2xl border bg-white px-4 transition-colors focus-within:border-accent-blue focus-within:ring-4 focus-within:ring-accent-blue/15'

interface CalculatorFieldInputProps {
  field: CalculatorField
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
}

/** Satu isian kalkulator: uang berawalan Rp, angka bersatuan, dan pilihan (tombol bila sedikit, dropdown bila banyak). */
export const CalculatorFieldInput: React.FC<CalculatorFieldInputProps> = ({ field, value, error, onChange, onBlur }) => {
  const inputId = `calc-${field.name}`
  // Satuan sudah tampil di dalam kolom, jadi "(hari)" di akhir label tidak diulang.
  const label = field.unit ? field.label.replace(UNIT_IN_LABEL, '') : field.label
  const describedBy = error ? `${inputId}-error` : field.hint ? `${inputId}-hint` : undefined
  const shellClass = cn(INPUT_SHELL_CLASS, error ? 'border-accent-orange' : 'border-line')

  const control = (() => {
    if (field.kind === FIELD_KIND.SELECT) {
      const options = field.options ?? []

      if (options.length <= MAX_SEGMENTED_OPTIONS) {
        return (
          <div role="radiogroup" aria-labelledby={`${inputId}-label`} className="mt-1.5 grid gap-2 sm:grid-cols-2">
            {options.map((option) => {
              const isSelected = option.value === value

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onChange(option.value)}
                  className={cn(
                    'rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors',
                    isSelected ? 'border-accent-blue bg-tint-sky text-accent-deep' : 'border-line bg-white text-ink-soft hover:border-accent-blue/50',
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        )
      }

      return (
        <select
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className={cn(shellClass, 'mt-1.5 h-12 w-full text-sm font-semibold outline-none')}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }

    const isMoney = field.kind === FIELD_KIND.MONEY

    return (
      <div className={cn(shellClass, 'mt-1.5 h-12 gap-2')}>
        {isMoney && <span className="text-sm font-bold text-ink-muted">Rp</span>}
        <input
          id={inputId}
          type="text"
          inputMode={isMoney ? 'numeric' : 'decimal'}
          autoComplete="off"
          placeholder={field.placeholder ?? (isMoney ? '0' : '0')}
          value={isMoney ? formatMoneyInput(value) : value}
          onChange={(event) => onChange(isMoney ? event.target.value.replace(/\D/g, '') : event.target.value.replace(/[^\d.,]/g, '').replace(',', '.'))}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="nums h-full min-w-0 flex-1 bg-transparent text-base font-semibold outline-none placeholder:font-normal placeholder:text-ink-muted/60"
        />
        {field.unit && <span className="shrink-0 text-sm text-ink-muted">{field.unit}</span>}
      </div>
    )
  })()

  return (
    <div>
      <span id={`${inputId}-label`}>
        <label htmlFor={inputId} className="text-xs font-semibold text-ink-soft">
          {label}
        </label>
      </span>
      {control}
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 text-xs font-semibold text-accent-orange">
          {error}
        </p>
      ) : (
        field.hint && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs leading-relaxed text-ink-muted">
            {field.hint}
          </p>
        )
      )}
    </div>
  )
}
