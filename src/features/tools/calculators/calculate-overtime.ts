import { formatDecimal, formatRupiah, toNumber } from '../format'
import type { CalculatorDefinition } from '../types'
import { FIELD_KIND } from '../types'

const HOURLY_DIVISOR = 173

interface Tier {
  /** Jam ke berapa tingkat ini berakhir (batas atas, termasuk). */
  untilHour: number
  multiplier: number
}

const WORKDAY_TIERS: Tier[] = [
  { untilHour: 1, multiplier: 1.5 },
  { untilHour: Number.POSITIVE_INFINITY, multiplier: 2 },
]

const HOLIDAY_TIERS_SIX_DAY_WEEK: Tier[] = [
  { untilHour: 7, multiplier: 2 },
  { untilHour: 8, multiplier: 3 },
  { untilHour: Number.POSITIVE_INFINITY, multiplier: 4 },
]

const HOLIDAY_TIERS_FIVE_DAY_WEEK: Tier[] = [
  { untilHour: 8, multiplier: 2 },
  { untilHour: 9, multiplier: 3 },
  { untilHour: Number.POSITIVE_INFINITY, multiplier: 4 },
]

const getTiers = (dayType: string, workDays: string): Tier[] => {
  if (dayType === 'workday') return WORKDAY_TIERS

  return workDays === '5' ? HOLIDAY_TIERS_FIVE_DAY_WEEK : HOLIDAY_TIERS_SIX_DAY_WEEK
}

/** Jumlah "jam setara" setelah dikalikan pengali tiap tingkat. */
const sumWeightedHours = (hours: number, tiers: Tier[]): number => {
  let previousLimit = 0
  let weighted = 0

  for (const tier of tiers) {
    const hoursInTier = Math.max(0, Math.min(hours, tier.untilHour) - previousLimit)

    weighted += hoursInTier * tier.multiplier
    previousLimit = tier.untilHour
  }

  return weighted
}

export const overtimeCalculator: CalculatorDefinition = {
  slug: 'kalkulator-upah-lembur',
  title: 'Kalkulator upah lembur',
  summary: 'Hitung upah lembur untuk hari kerja dan hari libur.',
  basis: 'PP 35/2021 dan Kepmenakertrans 102/2004: upah sejam = 1/173 upah sebulan.',
  fields: [
    {
      name: 'salary',
      label: 'Gaji pokok ditambah tunjangan tetap per bulan',
      kind: FIELD_KIND.MONEY,
      min: 1,
    },
    {
      name: 'dayType',
      label: 'Hari lembur',
      kind: FIELD_KIND.SELECT,
      defaultValue: 'workday',
      options: [
        { label: 'Hari kerja biasa', value: 'workday' },
        { label: 'Hari libur mingguan atau libur resmi', value: 'holiday' },
      ],
    },
    {
      name: 'workDays',
      label: 'Hari kerja per minggu',
      kind: FIELD_KIND.SELECT,
      hint: 'Berpengaruh pada hari libur.',
      defaultValue: '5',
      options: [
        { label: '5 hari kerja', value: '5' },
        { label: '6 hari kerja', value: '6' },
      ],
    },
    { name: 'hours', label: 'Lama lembur (jam)', kind: FIELD_KIND.NUMBER, min: 0.5, max: 24, step: 0.5 },
  ],
  calculate: (values) => {
    const salary = toNumber(values.salary)
    const hours = toNumber(values.hours)
    const hourlyWage = salary / HOURLY_DIVISOR
    const weightedHours = sumWeightedHours(hours, getTiers(values.dayType, values.workDays))

    return {
      rows: [
        { label: 'Upah lembur', value: formatRupiah(hourlyWage * weightedHours), isPrimary: true },
        { label: 'Upah sejam', value: formatRupiah(hourlyWage) },
        { label: 'Jam setara', value: `${formatDecimal(weightedHours)} jam` },
      ],
      note: 'Hari kerja biasa: jam pertama 1,5 kali, jam berikutnya 2 kali.',
    }
  },
}
