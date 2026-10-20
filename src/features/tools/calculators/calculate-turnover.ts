import { formatDecimal, formatPercent, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

export const turnoverCalculator: CalculatorDefinition = {
  slug: 'kalkulator-turnover',
  title: 'Kalkulator turnover karyawan',
  summary: 'Ukur tingkat karyawan yang keluar dalam satu periode.',
  fields: [
    { name: 'start', label: 'Jumlah karyawan di awal periode', kind: FIELD_KIND.NUMBER, min: 1, max: 1000000, step: 1 },
    { name: 'end', label: 'Jumlah karyawan di akhir periode', kind: FIELD_KIND.NUMBER, min: 1, max: 1000000, step: 1 },
    { name: 'leavers', label: 'Karyawan yang keluar selama periode', kind: FIELD_KIND.NUMBER, min: 0, max: 1000000, step: 1 },
  ],
  calculate: (values) => {
    const average = (toNumber(values.start) + toNumber(values.end)) / 2

    return {
      rows: [
        { label: 'Tingkat turnover', value: formatPercent((toNumber(values.leavers) / average) * 100), isPrimary: true },
        { label: 'Rata-rata jumlah karyawan', value: formatDecimal(average) },
      ],
      note: 'Turnover = karyawan keluar ÷ rata-rata jumlah karyawan × 100%.',
    }
  },
}
