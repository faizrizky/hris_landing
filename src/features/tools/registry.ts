import { bonusCalculator } from './calculators/calculate-bonus'
import { costPerHireCalculator } from './calculators/calculate-cost-per-hire'
import { dailyWageCalculator } from './calculators/calculate-daily-wage'
import { overtimeCalculator } from './calculators/calculate-overtime'
import { pkwtCompensationCalculator } from './calculators/calculate-pkwt-compensation'
import { proratedLeaveCalculator } from './calculators/calculate-prorated-leave'
import { severanceCalculator } from './calculators/calculate-severance'
import { thrCalculator } from './calculators/calculate-thr'
import { turnoverCalculator } from './calculators/calculate-turnover'
import type { CalculatorDefinition, UpcomingCalculator } from './types'

export const CALCULATORS: readonly CalculatorDefinition[] = [
  overtimeCalculator,
  thrCalculator,
  dailyWageCalculator,
  pkwtCompensationCalculator,
  severanceCalculator,
  proratedLeaveCalculator,
  bonusCalculator,
  costPerHireCalculator,
  turnoverCalculator,
]

/** Kalkulator yang belum tersedia. Tabel tarif pajaknya belum diverifikasi, jadi sengaja tidak ditayangkan. */
export const UPCOMING_CALCULATORS: readonly UpcomingCalculator[] = [
  { slug: 'kalkulator-pph21', title: 'Kalkulator PPh 21', summary: 'Perhitungan pajak penghasilan karyawan dengan tarif efektif.' },
  { slug: 'kalkulator-gaji', title: 'Kalkulator gaji bersih', summary: 'Gaji bersih setelah pajak dan BPJS.' },
]

export const getCalculatorBySlug = (slug: string): CalculatorDefinition | undefined =>
  CALCULATORS.find((calculator) => calculator.slug === slug)
