import type { Metadata } from 'next'

import { HomePage } from '@/features/home/components/home-page'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default function Page() {
  return <HomePage />
}

export const metadata: Metadata = {
  title: 'HRIS: absensi wajah, cuti, lembur, dan slip gaji dalam satu aplikasi',
  description:
    'Aplikasi HR untuk absensi wajah dan lokasi, pengajuan cuti, lembur, dinas luar, approval atasan, dan slip gaji.',
  openGraph: mergeOpenGraph({
    title: 'HRIS: aplikasi HR yang praktis',
    url: '/',
  }),
}
