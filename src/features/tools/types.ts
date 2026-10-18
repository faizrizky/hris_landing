export const FIELD_KIND = {
  MONEY: 'money',
  NUMBER: 'number',
  SELECT: 'select',
} as const

export type FieldKind = (typeof FIELD_KIND)[keyof typeof FIELD_KIND]

export interface SelectOption {
  label: string
  value: string
}

export interface CalculatorField {
  name: string
  label: string
  kind: FieldKind
  hint?: string
  min?: number
  max?: number
  step?: number
  defaultValue?: string
  options?: readonly SelectOption[]
}

export interface ResultRow {
  label: string
  value: string
  /** Baris utama yang ditonjolkan. */
  isPrimary?: boolean
}

export type CalculationValues = Record<string, string>

export type CalculationOutcome = { rows: ResultRow[]; note?: string } | { error: string }

export interface CalculatorDefinition {
  slug: string
  title: string
  summary: string
  /** Dasar aturan yang dipakai. Kosong jika rumusnya murni matematika. */
  basis?: string
  fields: readonly CalculatorField[]
  calculate: (values: CalculationValues) => CalculationOutcome
}

export interface UpcomingCalculator {
  slug: string
  title: string
  summary: string
}
