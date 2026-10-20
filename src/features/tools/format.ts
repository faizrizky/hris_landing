const rupiahFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const decimalFormat = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 })

export const formatRupiah = (amount: number): string => rupiahFormat.format(Math.round(amount))

export const formatDecimal = (amount: number): string => decimalFormat.format(amount)

export const formatPercent = (amount: number): string => `${decimalFormat.format(amount)}%`

export const toNumber = (value: string | undefined): number => {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : 0
}
