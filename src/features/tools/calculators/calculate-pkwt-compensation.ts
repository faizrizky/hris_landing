import { formatDecimal, formatRupiah, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

const MONTHS_PER_YEAR = 12
const MIN_MONTHS_ELIGIBLE = 1

export const pkwtCompensationCalculator: CalculatorDefinition = {
  slug: 'kalkulator-kompensasi-pkwt',
  title: 'Kalkulator kompensasi PKWT',
  summary: 'Hitung uang kompensasi karyawan kontrak saat masa kerjanya berakhir.',
  basis: 'PP 35/2021 Pasal 15 sampai 17: masa kerja per 12 bulan dikali 1 bulan upah.',
  fields: [
    {
      name: 'salary',
      label: 'Upah per bulan',
      kind: FIELD_KIND.MONEY,
      hint: 'Upah pokok ditambah tunjangan tetap.',
      min: 1,
    },
    { name: 'months', label: 'Masa kerja kontrak (bulan)', kind: FIELD_KIND.NUMBER, min: 0, max: 600, step: 1 },
  ],
  calculate: (values) => {
    const months = toNumber(values.months)

    if (months < MIN_MONTHS_ELIGIBLE) {
      return {
        rows: [{ label: 'Uang kompensasi', value: formatRupiah(0), isPrimary: true }],
        note: 'Kompensasi diberikan pada masa kerja paling sedikit 1 bulan terus-menerus.',
      }
    }

    return {
      rows: [
        { label: 'Uang kompensasi', value: formatRupiah((months / MONTHS_PER_YEAR) * toNumber(values.salary)), isPrimary: true },
        { label: 'Cara hitung', value: `${formatDecimal(months)}/12 × 1 bulan upah` },
      ],
    }
  },
}
