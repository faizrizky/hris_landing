import { formatDecimal, formatRupiah, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

const MONTHS_PER_YEAR = 12

export const bonusCalculator: CalculatorDefinition = {
  slug: 'kalkulator-bonus',
  title: 'Kalkulator bonus',
  summary: 'Hitung bonus berdasarkan kelipatan gaji dan masa kerja.',
  fields: [
    { name: 'salary', label: 'Gaji per bulan', kind: FIELD_KIND.MONEY, min: 1 },
    {
      name: 'multiple',
      label: 'Kelipatan gaji',
      kind: FIELD_KIND.NUMBER,
      hint: 'Contoh: 1 untuk satu kali gaji, 0,5 untuk setengah kali gaji.',
      min: 0,
      max: 24,
      step: 0.25,
    },
    {
      name: 'months',
      label: 'Masa kerja dalam periode bonus (bulan)',
      kind: FIELD_KIND.NUMBER,
      hint: '12 untuk setahun penuh. Kurang dari 12 dihitung proporsional.',
      min: 0,
      max: 12,
      step: 1,
      defaultValue: '12',
    },
  ],
  calculate: (values) => {
    const months = Math.min(toNumber(values.months), MONTHS_PER_YEAR)
    const bonus = toNumber(values.salary) * toNumber(values.multiple) * (months / MONTHS_PER_YEAR)

    return {
      rows: [
        { label: 'Bonus', value: formatRupiah(bonus), isPrimary: true },
        { label: 'Cara hitung', value: `Gaji × ${formatDecimal(toNumber(values.multiple))} × ${formatDecimal(months)}/12` },
      ],
    }
  },
}
