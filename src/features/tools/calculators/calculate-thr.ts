import { formatDecimal, formatRupiah, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

const MONTHS_PER_YEAR = 12

const THR_STATUS = {
  NOT_ELIGIBLE: 'Belum berhak',
  PRORATED: 'Proporsional (pro-rata)',
  FULL: 'Penuh (1 bulan upah)',
} as const

export const thrCalculator: CalculatorDefinition = {
  slug: 'kalkulator-thr',
  title: 'Kalkulator THR',
  summary: 'Perkirakan THR keagamaan berdasarkan masa kerja, penuh maupun proporsional.',
  basis: 'PP 36/2021 dan Permenaker 6/2016 tentang THR keagamaan.',
  fields: [
    {
      name: 'salary',
      label: 'Gaji pokok ditambah tunjangan tetap',
      kind: FIELD_KIND.MONEY,
      hint: 'Tunjangan tidak tetap, seperti uang makan atau transport kehadiran, tidak ikut dihitung.',
      min: 1,
    },
    { name: 'years', label: 'Tahun', kind: FIELD_KIND.NUMBER, min: 0, max: 50, step: 1, defaultValue: '0' },
    { name: 'months', label: 'Bulan', kind: FIELD_KIND.NUMBER, min: 0, max: 11, step: 1, defaultValue: '0' },
  ],
  calculate: (values) => {
    const salary = toNumber(values.salary)
    const totalMonths = toNumber(values.years) * MONTHS_PER_YEAR + toNumber(values.months)
    const workPeriod = `${formatDecimal(totalMonths)} bulan`

    if (totalMonths < 1) {
      return {
        status: THR_STATUS.NOT_ELIGIBLE,
        rows: [
          { label: 'Total THR diterima', value: formatRupiah(0), isPrimary: true },
          { label: 'Dasar upah (pokok + tetap)', value: formatRupiah(salary) },
          { label: 'Masa kerja', value: workPeriod },
        ],
        note: 'Masa kerja kurang dari 1 bulan belum berhak atas THR.',
      }
    }

    const isFull = totalMonths >= MONTHS_PER_YEAR

    return {
      status: isFull ? THR_STATUS.FULL : THR_STATUS.PRORATED,
      rows: [
        { label: 'Total THR diterima', value: formatRupiah(isFull ? salary : (totalMonths / MONTHS_PER_YEAR) * salary), isPrimary: true },
        { label: 'Dasar upah (pokok + tetap)', value: formatRupiah(salary) },
        { label: 'Masa kerja', value: workPeriod },
      ],
      formula: isFull ? '1 × Upah sebulan' : `(${formatDecimal(totalMonths)} bulan / 12) × Upah sebulan`,
      note: isFull
        ? 'Karena masa kerja 12 bulan atau lebih, THR dibayar penuh sebesar 1 bulan upah.'
        : `Karena masa kerja kurang dari 12 bulan (${workPeriod}), THR dihitung secara proporsional.`,
    }
  },
}
