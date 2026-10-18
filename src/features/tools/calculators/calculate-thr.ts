import { formatRupiah, formatDecimal, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

const MONTHS_PER_YEAR = 12

export const thrCalculator: CalculatorDefinition = {
  slug: 'kalkulator-thr',
  title: 'Kalkulator THR',
  summary: 'Perkirakan THR keagamaan berdasarkan masa kerja.',
  basis: 'PP 36/2021 dan Permenaker 6/2016 tentang THR keagamaan.',
  fields: [
    {
      name: 'salary',
      label: 'Gaji pokok ditambah tunjangan tetap per bulan',
      kind: FIELD_KIND.MONEY,
      hint: 'Tunjangan tidak tetap, seperti uang makan, tidak ikut dihitung.',
      min: 1,
    },
    { name: 'months', label: 'Masa kerja (bulan)', kind: FIELD_KIND.NUMBER, min: 0, max: 600, step: 1 },
  ],
  calculate: (values) => {
    const salary = toNumber(values.salary)
    const months = toNumber(values.months)

    if (months < 1) return { rows: [{ label: 'THR', value: formatRupiah(0), isPrimary: true }], note: 'Masa kerja kurang dari 1 bulan belum berhak atas THR.' }

    const thr = months >= MONTHS_PER_YEAR ? salary : (months / MONTHS_PER_YEAR) * salary

    return {
      rows: [
        { label: 'THR', value: formatRupiah(thr), isPrimary: true },
        { label: 'Cara hitung', value: months >= MONTHS_PER_YEAR ? '1 bulan upah' : `${formatDecimal(months)}/12 × 1 bulan upah` },
      ],
      note: 'Dibayar paling lambat 7 hari sebelum hari raya keagamaan.',
    }
  },
}
