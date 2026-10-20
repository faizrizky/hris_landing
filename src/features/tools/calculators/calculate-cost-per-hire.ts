import { formatRupiah, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

export const costPerHireCalculator: CalculatorDefinition = {
  slug: 'kalkulator-cost-per-hire',
  title: 'Kalkulator cost per hire',
  summary: 'Hitung rata-rata biaya merekrut satu karyawan.',
  fields: [
    {
      name: 'internal',
      label: 'Biaya internal',
      kind: FIELD_KIND.MONEY,
      hint: 'Gaji tim rekrutmen, waktu wawancara, dan biaya onboarding.',
      min: 0,
    },
    {
      name: 'external',
      label: 'Biaya eksternal',
      kind: FIELD_KIND.MONEY,
      hint: 'Iklan lowongan, platform, agensi, dan tes.',
      min: 0,
    },
    { name: 'hires', label: 'Jumlah karyawan yang direkrut', kind: FIELD_KIND.NUMBER, min: 1, max: 100000, step: 1 },
  ],
  calculate: (values) => {
    const total = toNumber(values.internal) + toNumber(values.external)

    return {
      rows: [
        { label: 'Cost per hire', value: formatRupiah(total / toNumber(values.hires)), isPrimary: true },
        { label: 'Total biaya rekrutmen', value: formatRupiah(total) },
      ],
    }
  },
}
