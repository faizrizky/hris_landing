import type { CalculatorField } from './types'

/** Tambahan tampilan per kalkulator: pengelompokan isian, satuan, contoh angka, dan butir dasar perhitungan. */
interface FieldMeta {
  section: string
  unit?: string
  placeholder?: string
}

interface CalculatorMeta {
  fields: Record<string, FieldMeta>
  legalBasis: readonly string[]
  tip?: string
}

const WAGE_SECTION = 'Komponen upah'
const SERVICE_SECTION = 'Masa kerja'
const SALARY_EXAMPLE = '5.000.000'

export const CALCULATOR_META: Record<string, CalculatorMeta> = {
  'kalkulator-thr': {
    fields: {
      salary: { section: WAGE_SECTION, placeholder: SALARY_EXAMPLE },
      years: { section: SERVICE_SECTION, unit: 'tahun' },
      months: { section: SERVICE_SECTION, unit: 'bulan' },
    },
    legalBasis: [
      'Pekerja dengan masa kerja 12 bulan atau lebih berhak mendapat 1 bulan upah.',
      'Pekerja dengan masa kerja 1 sampai 12 bulan mendapat THR secara proporsional.',
      'Berdasarkan PP 36/2021 dan Permenaker 6/2016.',
    ],
    tip: 'THR wajib dibayarkan pengusaha paling lambat 7 hari sebelum Hari Raya Keagamaan.',
  },
  'kalkulator-upah-lembur': {
    fields: {
      salary: { section: WAGE_SECTION, placeholder: SALARY_EXAMPLE },
      dayType: { section: 'Hari lembur' },
      workDays: { section: 'Hari lembur' },
      hours: { section: 'Durasi lembur', unit: 'jam', placeholder: '2' },
    },
    legalBasis: [
      'Upah sejam = 1/173 × upah sebulan (Kepmenakertrans 102/2004).',
      'Hari kerja biasa: jam pertama 1,5 kali, jam berikutnya 2 kali.',
      'Hari libur: pengali 2, 3, lalu 4 kali sesuai jam ke berapa (PP 35/2021).',
    ],
    tip: 'Upah lembur dihitung dari gaji pokok dan tunjangan tetap, tanpa tunjangan tidak tetap.',
  },
  'kalkulator-upah-harian': {
    fields: {
      salary: { section: WAGE_SECTION, placeholder: SALARY_EXAMPLE },
      workDays: { section: 'Pola kerja' },
    },
    legalBasis: ['Upah sehari = upah sebulan ÷ 25 untuk 6 hari kerja, atau ÷ 21 untuk 5 hari kerja.', 'Berdasarkan PP 36/2021.'],
  },
  'kalkulator-kompensasi-pkwt': {
    fields: {
      salary: { section: WAGE_SECTION, placeholder: SALARY_EXAMPLE },
      months: { section: SERVICE_SECTION, unit: 'bulan', placeholder: '12' },
    },
    legalBasis: [
      'Kompensasi = masa kerja ÷ 12 × 1 bulan upah.',
      'Diberikan pada masa kerja paling sedikit 1 bulan terus-menerus.',
      'Berdasarkan PP 35/2021 Pasal 15 sampai 17.',
    ],
  },
  'kalkulator-pesangon': {
    fields: {
      salary: { section: WAGE_SECTION, placeholder: SALARY_EXAMPLE },
      years: { section: SERVICE_SECTION, unit: 'tahun', placeholder: '5' },
      multiplier: { section: 'Alasan PHK' },
      otherRights: { section: 'Hak lain', placeholder: '0' },
    },
    legalBasis: [
      'Uang pesangon, uang penghargaan masa kerja, dan uang penggantian hak dihitung dari upah dan masa kerja.',
      'Pengali pesangon bergantung pada alasan PHK, jadi dipilih manual.',
      'Berdasarkan PP 35/2021 Pasal 40.',
    ],
    tip: 'Jika ragu soal alasan PHK, konsultasikan dengan ahli hukum ketenagakerjaan.',
  },
  'kalkulator-cuti-proporsional': {
    fields: {
      quota: { section: 'Jatah cuti', unit: 'hari' },
      months: { section: SERVICE_SECTION, unit: 'bulan', placeholder: '6' },
      taken: { section: 'Cuti terpakai', unit: 'hari' },
    },
    legalBasis: ['Hak cuti = masa kerja ÷ 12 × jatah cuti tahunan.', 'Ini perkiraan pro-rata; kebijakan perusahaan dapat berbeda.'],
  },
  'kalkulator-bonus': {
    fields: {
      salary: { section: WAGE_SECTION, placeholder: SALARY_EXAMPLE },
      multiple: { section: 'Kelipatan gaji', unit: '× gaji', placeholder: '1' },
      months: { section: SERVICE_SECTION, unit: 'bulan' },
    },
    legalBasis: ['Bonus = gaji × kelipatan × masa kerja ÷ 12.', 'Besaran dan kelipatan mengikuti kebijakan perusahaan, bukan aturan pemerintah.'],
  },
  'kalkulator-cost-per-hire': {
    fields: {
      internal: { section: 'Biaya rekrutmen', placeholder: '10.000.000' },
      external: { section: 'Biaya rekrutmen', placeholder: '5.000.000' },
      hires: { section: 'Hasil rekrutmen', unit: 'orang', placeholder: '5' },
    },
    legalBasis: ['Cost per hire = (biaya internal + biaya eksternal) ÷ jumlah karyawan yang direkrut.', 'Rumus umum SDM, bukan aturan pemerintah.'],
  },
  'kalkulator-turnover': {
    fields: {
      start: { section: 'Jumlah karyawan', unit: 'orang', placeholder: '100' },
      end: { section: 'Jumlah karyawan', unit: 'orang', placeholder: '95' },
      leavers: { section: 'Karyawan keluar', unit: 'orang', placeholder: '8' },
    },
    legalBasis: ['Turnover = karyawan keluar ÷ rata-rata jumlah karyawan × 100%.', 'Rata-rata jumlah karyawan = (awal + akhir) ÷ 2.'],
  },
}

export const withFieldMeta = (slug: string, fields: readonly CalculatorField[]): CalculatorField[] =>
  fields.map((field) => ({ ...field, ...CALCULATOR_META[slug]?.fields[field.name] }))
