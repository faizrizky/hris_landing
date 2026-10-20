/** Label tampilan untuk nilai enum dari CMS. Nilainya harus sama dengan hris-cms/src/constants/content-options.ts. */

export const FEATURE_STATUS = {
  AVAILABLE: 'available',
  PARTIAL: 'partial',
  PLANNED: 'planned',
} as const

export type FeatureStatus = (typeof FEATURE_STATUS)[keyof typeof FEATURE_STATUS]

export const FEATURE_STATUS_LABEL: Record<FeatureStatus, string> = {
  available: 'Tersedia',
  partial: 'Sebagian',
  planned: 'Dalam rencana',
}

export const FEATURE_CATEGORY_ORDER = [
  'attendance',
  'requests',
  'payroll',
  'team',
  'hradmin',
  'documents',
  'security',
  'performance',
  'planned',
] as const

export type FeatureCategoryId = (typeof FEATURE_CATEGORY_ORDER)[number]

export const FEATURE_CATEGORY_LABEL: Record<FeatureCategoryId, string> = {
  attendance: 'Absensi',
  requests: 'Pengajuan dan approval',
  payroll: 'Slip gaji dan pajak',
  team: 'Tim dan karyawan',
  hradmin: 'Pengelolaan HR',
  documents: 'Dokumen dan komunikasi',
  security: 'Keamanan',
  performance: 'Kinerja',
  planned: 'Dalam rencana',
}

export const FEATURE_CATEGORY_DESCRIPTION: Record<FeatureCategoryId, string> = {
  attendance: 'Catat kehadiran akurat dari HP karyawan, di mana pun mereka bekerja.',
  requests: 'Cuti, lembur, dinas luar, dan WFH tanpa kertas, disetujui dari HP.',
  payroll: 'Karyawan melihat rincian gajinya sendiri kapan saja.',
  team: 'Atasan memantau tim, karyawan merawat datanya sendiri.',
  hradmin: 'Sisi HR: data karyawan, jadwal, kebijakan, penggajian, dan hak akses.',
  documents: 'Dokumen karyawan rapi dan kabar perusahaan sampai ke semua orang.',
  security: 'Data karyawan terlindungi di setiap perangkat.',
  performance: 'Penilaian dan target karyawan dalam satu tempat.',
  planned: 'Modul yang sedang kami siapkan berikutnya.',
}

export const SOLUTION_TYPE = {
  INDUSTRY: 'industry',
  SCALE: 'scale',
} as const

export type SolutionTypeId = (typeof SOLUTION_TYPE)[keyof typeof SOLUTION_TYPE]

export const SOLUTION_TYPE_LABEL: Record<SolutionTypeId, string> = {
  industry: 'Berdasarkan industri',
  scale: 'Berdasarkan skala bisnis',
}

export const DEMO_HREF = '/demo'
