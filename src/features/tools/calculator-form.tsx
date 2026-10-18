'use client'

import { CalendarDays, Lightbulb, RotateCcw, SlidersHorizontal, Wallet } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { ValidationError, number, object, string, type AnySchema } from 'yup'

import { CalculatorFieldInput } from './calculator-field-input'
import { CalculatorResult } from './calculator-result'
import { getCalculatorBySlug } from './registry'
import type { CalculationOutcome, CalculationValues, CalculatorDefinition, CalculatorField } from './types'
import { FIELD_KIND } from './types'

const MAX_MONEY = 1_000_000_000_000
const DEFAULT_SECTION = 'Data dasar'

const buildFieldSchema = (field: CalculatorField): AnySchema => {
  if (field.kind === FIELD_KIND.SELECT) {
    return string().required('Pilih salah satu').oneOf((field.options ?? []).map((option) => option.value))
  }

  const min = field.min ?? 0
  const max = field.max ?? MAX_MONEY

  return number()
    .transform((parsed, original) => (original === '' ? undefined : parsed))
    .typeError('Isi dengan angka')
    .required('Wajib diisi')
    .min(min, `Minimal ${min}`)
    .max(max, `Maksimal ${max}`)
}

const getInitialValues = (fields: readonly CalculatorField[]): CalculationValues =>
  Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? '']))

/** Kelompokkan isian berurutan yang punya judul bagian sama. */
const groupBySection = (fields: readonly CalculatorField[]) =>
  fields.reduce<{ title: string; fields: CalculatorField[] }[]>((groups, field) => {
    const title = field.section ?? DEFAULT_SECTION
    const last = groups[groups.length - 1]

    if (last && last.title === title) last.fields.push(field)
    else groups.push({ title, fields: [field] })

    return groups
  }, [])

const SECTION_ICON = {
  [FIELD_KIND.MONEY]: Wallet,
  [FIELD_KIND.NUMBER]: CalendarDays,
  [FIELD_KIND.SELECT]: SlidersHorizontal,
} as const

const validateValues = (calculator: CalculatorDefinition, values: CalculationValues) => {
  const schema = object(Object.fromEntries(calculator.fields.map((field) => [field.name, buildFieldSchema(field)])))

  try {
    schema.validateSync(values, { abortEarly: false })
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error

    const errors: Record<string, string> = {}

    error.inner.forEach((issue) => {
      if (issue.path && !errors[issue.path]) errors[issue.path] = issue.message
    })

    return { errors, outcome: null as CalculationOutcome | null }
  }

  return { errors: {} as Record<string, string>, outcome: calculator.calculate(values) }
}

interface CalculatorFormProps {
  slug: string
}

const CalculatorFormBody: React.FC<{ calculator: CalculatorDefinition }> = ({ calculator }) => {
  const [values, setValues] = useState<CalculationValues>(() => getInitialValues(calculator.fields))
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Hasil dihitung langsung dari isian: tidak perlu tombol "Hitung" dan tidak ada state turunan.
  const { errors, outcome } = useMemo(() => validateValues(calculator, values), [calculator, values])
  const sections = groupBySection(calculator.fields)

  const handleChange = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }))
  const handleBlur = (name: string) => setTouched((current) => ({ ...current, [name]: true }))
  const handleReset = () => {
    setValues(getInitialValues(calculator.fields))
    setTouched({})
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <form onSubmit={(event) => event.preventDefault()} noValidate className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-34px_rgba(60,60,140,0.35)] md:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-3 text-xl font-extrabold">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-tint-lavender text-sm font-bold text-accent-purple">1</span>
              Data dasar
            </h2>
            <button type="button" onClick={handleReset} className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted transition-colors hover:text-ink">
              <RotateCcw aria-hidden className="h-3.5 w-3.5" />
              Atur ulang
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {sections.map((section) => {
              const SectionIcon = SECTION_ICON[section.fields[0].kind]
              const isPaired = section.fields.length === 2 && section.fields.every((field) => field.kind === FIELD_KIND.NUMBER)
              const hasTitle = section.fields.length > 1

              return (
                <div key={section.title} role="group" aria-label={section.title}>
                  {hasTitle && (
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink">
                      <SectionIcon aria-hidden className="h-4 w-4 text-accent-purple" />
                      {section.title}
                    </h3>
                  )}
                  <div className={isPaired ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4'}>
                    {section.fields.map((field) => (
                      <CalculatorFieldInput
                        key={field.name}
                        field={field}
                        value={values[field.name]}
                        error={touched[field.name] ? errors[field.name] : undefined}
                        onChange={(value) => handleChange(field.name, value)}
                        onBlur={() => handleBlur(field.name)}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </form>

        {calculator.tip && (
          <div className="flex gap-3 rounded-3xl bg-tint-lavender p-5 text-sm leading-relaxed">
            <Lightbulb aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-purple" />
            <div>
              <p className="font-bold">Tahukah Anda?</p>
              <p className="mt-1 text-ink-soft">{calculator.tip}</p>
            </div>
          </div>
        )}
      </div>

      <CalculatorResult calculator={calculator} outcome={outcome} />
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
