'use client'

import React, { useState } from 'react'
import { ValidationError, number, object, string, type AnySchema } from 'yup'

import { cn } from '@/utilities/ui'

import { getCalculatorBySlug } from './registry'
import type { CalculationOutcome, CalculationValues, CalculatorDefinition, CalculatorField } from './types'
import { FIELD_KIND } from './types'

const MAX_MONEY = 1_000_000_000_000

const buildFieldSchema = (field: CalculatorField): AnySchema => {
  if (field.kind === FIELD_KIND.SELECT) {
    return string().required('Pilih salah satu').oneOf((field.options ?? []).map((option) => option.value))
  }

  const min = field.min ?? 0
  const max = field.max ?? MAX_MONEY

  return number()
    .typeError('Isi dengan angka')
    .required('Wajib diisi')
    .min(min, `Minimal ${min}`)
    .max(max, `Maksimal ${max}`)
}

const getInitialValues = (fields: readonly CalculatorField[]): CalculationValues =>
  Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? '']))

interface CalculatorFormProps {
  slug: string
}

interface CalculatorFormBodyProps {
  calculator: CalculatorDefinition
}

const CalculatorFormBody: React.FC<CalculatorFormBodyProps> = ({ calculator }) => {
  const [values, setValues] = useState<CalculationValues>(() => getInitialValues(calculator.fields))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [outcome, setOutcome] = useState<CalculationOutcome | null>(null)

  const schema = object(Object.fromEntries(calculator.fields.map((field) => [field.name, buildFieldSchema(field)])))

  const handleChange = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await schema.validate(values, { abortEarly: false })
    } catch (error) {
      if (!(error instanceof ValidationError)) throw error

      const nextErrors: Record<string, string> = {}

      error.inner.forEach((issue) => {
        if (issue.path && !nextErrors[issue.path]) nextErrors[issue.path] = issue.message
      })

      setErrors(nextErrors)
      setOutcome(null)

      return
    }

    setErrors({})
    setOutcome(calculator.calculate(values))
  }

  return (
    <div className="grid12 gap-y-10">
      <form onSubmit={handleSubmit} noValidate className="col-span-12 space-y-6 lg:col-span-6">
        {calculator.fields.map((field, index) => {
          const error = errors[field.name]

          return (
            <div key={field.name} style={{ '--i': index } as React.CSSProperties}>
              <label htmlFor={`calc-${field.name}`} className="block font-semibold">
                {field.label}
              </label>
              {field.hint && <p className="mt-0.5 text-ink-soft">{field.hint}</p>}
              {field.kind === FIELD_KIND.SELECT ? (
                <select
                  id={`calc-${field.name}`}
                  value={values[field.name]}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  className="field mt-2"
                >
                  {(field.options ?? []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`calc-${field.name}`}
                  type="number"
                  inputMode={field.kind === FIELD_KIND.MONEY ? 'numeric' : 'decimal'}
                  min={field.min}
                  max={field.max}
                  step={field.step ?? 1}
                  value={values[field.name]}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `calc-${field.name}-error` : undefined}
                  className={cn('field mt-2', error && 'ring-2 ring-ink')}
                />
              )}
              {error && (
                <p id={`calc-${field.name}-error`} role="alert" className="mt-1 font-semibold">
                  {error}
                </p>
              )}
            </div>
          )
        })}
        <button
          type="submit"          style={{ '--i': calculator.fields.length } as React.CSSProperties}
          className="btn w-full md:w-auto"
        >
          Hitung
        </button>
      </form>

      <div className="col-span-12 lg:col-span-5 lg:col-start-8" aria-live="polite">
        {outcome && 'error' in outcome && <p role="alert" className="font-semibold">{outcome.error}</p>}
        {outcome && 'rows' in outcome && (
          <dl className="rounded-2xl bg-tint-sky p-6">
            {outcome.rows.map((row) => (
              <div key={row.label} className={cn('py-2', row.isPrimary && 'pb-5')}>
                <dt className="text-ink-soft">{row.label}</dt>
                <dd className={cn(row.isPrimary ? 't-head nums mt-1' : 'nums font-semibold')}>{row.value}</dd>
              </div>
            ))}
            {outcome.note && <p className="mt-3 max-w-[44ch] text-ink-soft">{outcome.note}</p>}
          </dl>
        )}
      </div>
    </div>
  )
}

/**
 * Form kalkulator generik: validasi Yup dari definisi field, hasil dihitung fungsi murni milik kalkulator.
 * Menerima slug (bukan objek kalkulator) karena fungsi tidak bisa dikirim dari server ke klien.
 */
export const CalculatorForm: React.FC<CalculatorFormProps> = ({ slug }) => {
  const calculator = getCalculatorBySlug(slug)

  return calculator ? <CalculatorFormBody calculator={calculator} /> : null
}
