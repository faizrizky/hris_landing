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
  /** Satuan di ujung kanan kolom isian, mis. "bulan" atau "jam". */
  unit?: string
  placeholder?: string
  /** Judul kelompok isian; field berurutan dengan judul sama berada dalam satu kartu kecil. */
  section?: string
}

export interface ResultRow {
  label: string
  value: string
  /** Baris utama yang ditonjolkan. */
  isPrimary?: boolean
}

export type CalculationValues = Record<string, string>

export interface CalculationSuccess {
  rows: ResultRow[]
  /** Penjelasan singkat di bawah rumus. */
  note?: string
  /** Label status hasil, mis. "Proporsional (pro-rata)". */
  status?: string
  /** Rumus dengan angka yang dimasukkan, mis. "(6 bulan / 12) × Upah sebulan". */
  formula?: string
}

export type CalculationOutcome = CalculationSuccess | { error: string }

export interface CalculatorDefinition {
  slug: string
  title: string
  summary: string
  /** Dasar aturan yang dipakai. Kosong jika rumusnya murni matematika. */
  basis?: string
  /** Butir dasar hukum atau rumus yang ditampilkan di kartu hasil. */
  legalBasis?: readonly string[]
  /** Info singkat "Tahukah Anda?" di bawah isian. */
  tip?: string
  fields: readonly CalculatorField[]
  calculate: (values: CalculationValues) => CalculationOutcome
}

export interface UpcomingCalculator {
  slug: string
  title: string
  summary: string
}
