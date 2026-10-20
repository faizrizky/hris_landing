import { formatRupiah, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

const DIVISOR_FIVE_DAY_WEEK = 21
const DIVISOR_SIX_DAY_WEEK = 25

export const dailyWageCalculator: CalculatorDefinition = {
  slug: 'kalkulator-upah-harian',
  title: 'Kalkulator upah harian',
  summary: 'Ubah gaji bulanan menjadi upah per hari.',
  basis: 'PP 36/2021: upah sehari = upah sebulan dibagi 25 (6 hari kerja) atau 21 (5 hari kerja).',
  fields: [
    { name: 'salary', label: 'Gaji per bulan', kind: FIELD_KIND.MONEY, min: 1 },
    {
      name: 'workDays',
      label: 'Hari kerja per minggu',
      kind: FIELD_KIND.SELECT,
      defaultValue: '5',
      options: [
        { label: '5 hari kerja', value: '5' },
        { label: '6 hari kerja', value: '6' },
      ],
    },
  ],
  calculate: (values) => {
    const divisor = values.workDays === '6' ? DIVISOR_SIX_DAY_WEEK : DIVISOR_FIVE_DAY_WEEK

    return {
      rows: [
        { label: 'Upah harian', value: formatRupiah(toNumber(values.salary) / divisor), isPrimary: true },
        { label: 'Pembagi', value: `${divisor} hari` },
      ],
    }
  },
}
