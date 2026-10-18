import { formatDecimal, formatRupiah, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

interface TenureBand {
  /** Masa kerja minimal (tahun) agar band ini berlaku. */
  fromYears: number
  months: number
}

/** PP 35/2021 Pasal 40 ayat 2: uang pesangon (bulan upah) menurut masa kerja. */
const SEVERANCE_BANDS: TenureBand[] = [
  { fromYears: 8, months: 9 },
  { fromYears: 7, months: 8 },
  { fromYears: 6, months: 7 },
  { fromYears: 5, months: 6 },
  { fromYears: 4, months: 5 },
  { fromYears: 3, months: 4 },
  { fromYears: 2, months: 3 },
  { fromYears: 1, months: 2 },
  { fromYears: 0, months: 1 },
]

/** PP 35/2021 Pasal 40 ayat 3: uang penghargaan masa kerja (bulan upah). */
const SERVICE_AWARD_BANDS: TenureBand[] = [
  { fromYears: 24, months: 10 },
  { fromYears: 21, months: 8 },
  { fromYears: 18, months: 7 },
  { fromYears: 15, months: 6 },
  { fromYears: 12, months: 5 },
  { fromYears: 9, months: 4 },
  { fromYears: 6, months: 3 },
  { fromYears: 3, months: 2 },
]

const findMonths = (bands: TenureBand[], years: number): number =>
  bands.find((band) => years >= band.fromYears)?.months ?? 0

export const severanceCalculator: CalculatorDefinition = {
  slug: 'kalkulator-pesangon',
  title: 'Kalkulator pesangon',
  summary: 'Perkirakan uang pesangon dan uang penghargaan masa kerja.',
  basis: 'PP 35/2021 Pasal 40. Pengali pesangon bergantung pada alasan PHK, jadi dipilih manual.',
  fields: [
    {
      name: 'salary',
      label: 'Upah per bulan',
      kind: FIELD_KIND.MONEY,
      hint: 'Upah pokok ditambah tunjangan tetap.',
      min: 1,
    },
    { name: 'years', label: 'Masa kerja (tahun)', kind: FIELD_KIND.NUMBER, min: 0, max: 60, step: 1 },
    {
      name: 'multiplier',
      label: 'Pengali uang pesangon',
      kind: FIELD_KIND.SELECT,
      hint: 'Pilih sesuai alasan PHK pada PP 35/2021. Jika ragu, konsultasikan dengan ahli hukum ketenagakerjaan.',
      defaultValue: '1',
      options: [
        { label: '1 kali', value: '1' },
        { label: '0,75 kali', value: '0.75' },
        { label: '0,5 kali', value: '0.5' },
        { label: '1,75 kali', value: '1.75' },
      ],
    },
    {
      name: 'otherRights',
      label: 'Uang penggantian hak, jika ada',
      kind: FIELD_KIND.MONEY,
      hint: 'Misalnya cuti tahunan yang belum diambil. Isi 0 jika tidak ada.',
      min: 0,
      defaultValue: '0',
    },
  ],
  calculate: (values) => {
    const salary = toNumber(values.salary)
    const years = Math.floor(toNumber(values.years))
    const multiplier = toNumber(values.multiplier)
    const severance = findMonths(SEVERANCE_BANDS, years) * multiplier * salary
    const serviceAward = findMonths(SERVICE_AWARD_BANDS, years) * salary
    const otherRights = toNumber(values.otherRights)

    return {
      rows: [
        { label: 'Total perkiraan', value: formatRupiah(severance + serviceAward + otherRights), isPrimary: true },
        { label: 'Uang pesangon', value: `${formatRupiah(severance)} (${formatDecimal(findMonths(SEVERANCE_BANDS, years))} bulan × ${formatDecimal(multiplier)})` },
        { label: 'Uang penghargaan masa kerja', value: `${formatRupiah(serviceAward)} (${formatDecimal(findMonths(SERVICE_AWARD_BANDS, years))} bulan)` },
        { label: 'Uang penggantian hak', value: formatRupiah(otherRights) },
      ],
      note: 'Ini perkiraan untuk membantu perencanaan. Komponen dan pengali pada kasus nyata bergantung pada alasan PHK dan perjanjian kerja.',
    }
  },
}
