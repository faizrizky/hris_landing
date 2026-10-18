import { formatDecimal, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

const MONTHS_PER_YEAR = 12
const DEFAULT_ANNUAL_QUOTA = 12

export const proratedLeaveCalculator: CalculatorDefinition = {
  slug: 'kalkulator-cuti-proporsional',
  title: 'Kalkulator cuti proporsional',
  summary: 'Hitung hak cuti tahunan menurut masa kerja di tahun berjalan.',
  basis: 'Perkiraan pro-rata dari jatah cuti tahunan. Kebijakan perusahaan dapat berbeda.',
  fields: [
    {
      name: 'quota',
      label: 'Jatah cuti tahunan (hari)',
      kind: FIELD_KIND.NUMBER,
      min: 1,
      max: 60,
      step: 1,
      defaultValue: String(DEFAULT_ANNUAL_QUOTA),
    },
    { name: 'months', label: 'Masa kerja di tahun ini (bulan)', kind: FIELD_KIND.NUMBER, min: 0, max: 12, step: 1 },
    {
      name: 'taken',
      label: 'Cuti yang sudah diambil (hari)',
      kind: FIELD_KIND.NUMBER,
      min: 0,
      max: 60,
      step: 0.5,
      defaultValue: '0',
    },
  ],
  calculate: (values) => {
    const quota = toNumber(values.quota)
    const entitlement = (toNumber(values.months) / MONTHS_PER_YEAR) * quota
    const remaining = entitlement - toNumber(values.taken)

    return {
      rows: [
        { label: 'Hak cuti proporsional', value: `${formatDecimal(entitlement)} hari`, isPrimary: true },
        { label: 'Sisa cuti', value: `${formatDecimal(Math.max(0, remaining))} hari` },
      ],
      note: remaining < 0 ? 'Cuti yang diambil melebihi hak proporsional.' : undefined,
    }
  },
}
