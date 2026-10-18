/**
 * Isi sementara beranda. Nanti dipindahkan ke blok CMS (hris-cms) agar editor bisa mengubahnya.
 * Klaim fitur hanya yang sudah ada di aplikasi HRIS.
 */

export const BRAND_NAME = 'HRIS'
export const DEMO_HREF = '/demo'

export const NAV_ITEMS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Solusi', href: '#solusi' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
] as const

export type AccentColor = 'teal' | 'orange' | 'purple' | 'blue' | 'yellow'
export type TagTone = 'orange' | 'purple' | 'teal' | 'yellow'

export interface UiCardContent {
  id: string
  accent: AccentColor
  title: string
  subtitle?: string
  lines: readonly string[]
  footer?: string
}

export const HERO_CONTENT = {
  titleWords: ['Kelola', 'tim,', 'tanpa', 'ribet'],
  description:
    'HRIS adalah aplikasi HR untuk absensi wajah, cuti, lembur, dan slip gaji. Praktis untuk karyawan, tenang untuk atasan dan HR.',
  primaryCta: 'Minta Demo',
  secondaryCta: 'Coba Gratis',
} as const

export interface HeroCardContent extends UiCardContent {
  positionClass: string
  parallaxSpeed: number
}

export const HERO_CARDS: readonly HeroCardContent[] = [
  {
    id: 'clock-in',
    accent: 'teal',
    title: 'Absen masuk berhasil',
    subtitle: '08:02 · Kantor Pusat',
    lines: ['Wajah terverifikasi', 'Lokasi sesuai area kerja'],
    footer: 'Tepat waktu',
    positionClass: 'md:left-[34%] md:top-0 md:w-[230px]',
    parallaxSpeed: 0.1,
  },
  {
    id: 'leave-request',
    accent: 'orange',
    title: 'Pengajuan cuti',
    subtitle: 'Cuti tahunan · 3 hari',
    lines: ['Menunggu persetujuan atasan'],
    footer: 'Terkirim',
    positionClass: 'md:right-0 md:top-[8%] md:w-[190px]',
    parallaxSpeed: 0.25,
  },
  {
    id: 'overtime',
    accent: 'blue',
    title: 'Lembur disetujui',
    subtitle: 'Jumat · 2 jam',
    lines: ['Disetujui oleh atasan'],
    footer: 'Masuk ke payroll',
    positionClass: 'md:left-0 md:top-[38%] md:w-[190px]',
    parallaxSpeed: 0.2,
  },
  {
    id: 'payslip',
    accent: 'purple',
    title: 'Slip gaji tersedia',
    subtitle: 'Periode Oktober',
    lines: ['Rincian pendapatan dan potongan'],
    footer: 'Siap diunduh',
    positionClass: 'md:right-0 md:top-[44%] md:w-[200px]',
    parallaxSpeed: 0.35,
  },
  {
    id: 'attendance-week',
    accent: 'purple',
    title: 'Kehadiran minggu ini',
    subtitle: 'Senin sampai Jumat',
    lines: ['Hadir 4 hari', 'Terlambat 1 hari', 'Cuti 0 hari'],
    footer: 'Ringkasan otomatis',
    positionClass: 'md:bottom-0 md:left-[12%] md:w-[270px]',
    parallaxSpeed: 0.15,
  },
]

export interface FeatureBandContent {
  id: string
  tag: { label: string; tone: TagTone }
  title: string
  description: string
  ctaLabel: string
}

export const ATTENDANCE_BAND: FeatureBandContent = {
  id: 'absensi',
  tag: { label: 'ABSENSI', tone: 'orange' },
  title: 'Absen dengan wajah, di mana pun',
  description:
    'Verifikasi wajah, validasi lokasi kerja, dan jam yang tidak bisa dimanipulasi. Tetap bisa absen saat sinyal hilang, datanya terkirim begitu tersambung lagi.',
  ctaLabel: 'Minta Demo',
}

export const APPROVAL_BAND: FeatureBandContent = {
  id: 'approval',
  tag: { label: 'APPROVAL', tone: 'teal' },
  title: 'Approval dalam satu ketukan',
  description:
    'Atasan menyetujui cuti, lembur, dan koreksi absen dari HP. Karyawan langsung tahu statusnya, HR tidak perlu lagi mengejar tanda tangan.',
  ctaLabel: 'Minta Demo',
}

export const FACE_CLOCK_SCREEN = {
  title: 'Absen Masuk',
  date: 'Senin, 15 Oktober',
  chips: ['Lokasi valid', 'Jam terverifikasi', 'Mode offline siap'],
  buttonLabel: 'Absen sekarang',
} as const

export interface ApprovalItemContent {
  id: string
  initials: string
  name: string
  detail: string
}

export const APPROVAL_SCREEN = {
  title: 'Approval',
  subtitle: '4 pengajuan',
  pendingLabel: 'Menunggu',
  doneLabel: 'Disetujui',
  items: [
    { id: 'a1', initials: 'AR', name: 'Andi Rahman', detail: 'Cuti tahunan · 3 hari' },
    { id: 'a2', initials: 'SD', name: 'Sari Dewi', detail: 'Lembur · 2 jam' },
    { id: 'a3', initials: 'BP', name: 'Budi Pratama', detail: 'Dinas luar · Bandung' },
    { id: 'a4', initials: 'LN', name: 'Lina Nur', detail: 'Koreksi absen' },
  ] satisfies ApprovalItemContent[],
} as const

export const REQUESTS_SECTION = {
  id: 'pengajuan',
  tag: { label: 'PENGAJUAN', tone: 'purple' },
  title: 'Semua pengajuan, satu tempat',
  description:
    'Cuti, lembur, dinas luar, WFH, koreksi absen, sampai dokumen. Karyawan mengajukan dari HP, atasan dan HR memantau dari satu daftar, tanpa kertas dan tanpa chat berantai.',
  ctaLabel: 'Minta Demo',
  stripTitle: 'Semua kebutuhan HR harian dalam satu aplikasi',
  stripItems: ['Absensi', 'Cuti', 'Lembur', 'Dinas luar', 'Slip gaji'],
} as const

export const REQUEST_CARDS: readonly UiCardContent[] = [
  { id: 'r1', accent: 'orange', title: 'Cuti', subtitle: 'Cuti tahunan', lines: ['3 hari', '20 sampai 22 Okt'], footer: 'Menunggu' },
  { id: 'r2', accent: 'purple', title: 'Lembur', subtitle: 'Jumat malam', lines: ['2 jam', 'Proyek rilis'], footer: 'Disetujui' },
  { id: 'r3', accent: 'teal', title: 'Dinas luar', subtitle: 'Bandung', lines: ['2 hari', 'Kunjungan klien'], footer: 'Menunggu' },
  { id: 'r4', accent: 'blue', title: 'WFH', subtitle: 'Rabu', lines: ['1 hari', 'Dari rumah'], footer: 'Disetujui' },
  { id: 'r5', accent: 'yellow', title: 'Koreksi absen', subtitle: 'Selasa', lines: ['Lupa absen pulang', 'Pukul 17:05'], footer: 'Menunggu' },
  { id: 'r6', accent: 'orange', title: 'Dokumen', subtitle: 'Surat keterangan', lines: ['Verifikasi HR'], footer: 'Diproses' },
]

export const TESTIMONIALS_SECTION = {
  id: 'testimoni',
  tag: { label: 'TESTIMONI', tone: 'yellow' },
  title: 'Apa kata mereka tentang HRIS',
  placeholderNote: 'Contoh tampilan. Ganti dengan testimoni asli sebelum rilis.',
} as const

export interface TestimonialContent {
  id: string
  tone: 'yellow' | 'cyan' | 'pink'
  rotationDeg: number
  quote: string
  name: string
  role: string
}

export const TESTIMONIALS: readonly TestimonialContent[] = [
  {
    id: 't1',
    tone: 'yellow',
    rotationDeg: -4,
    quote: '[Contoh] Absensi jadi rapi dan HR tidak lagi merekap manual setiap akhir bulan.',
    name: 'Nama Pelanggan',
    role: 'HR Manager, Perusahaan',
  },
  {
    id: 't2',
    tone: 'cyan',
    rotationDeg: 2,
    quote: '[Contoh] Approval cuti dan lembur selesai dalam hitungan menit, langsung dari HP.',
    name: 'Nama Pelanggan',
    role: 'Kepala Divisi, Perusahaan',
  },
  {
    id: 't3',
    tone: 'pink',
    rotationDeg: -2,
    quote: '[Contoh] Karyawan bisa cek slip gaji sendiri, pertanyaan ke HR jauh berkurang.',
    name: 'Nama Pelanggan',
    role: 'Pemilik Usaha, Perusahaan',
  },
]

export const CTA_SECTION = {
  title: 'Siap digitalkan HR perusahaanmu?',
  subtitle: 'Jadwalkan demo 30 menit bersama tim kami dan lihat langsung cara kerjanya.',
  buttonLabel: 'Minta Demo',
  footerTagline: 'Absensi, cuti, lembur, dan slip gaji dalam satu aplikasi.',
  columns: [
    {
      title: 'PRODUK',
      links: [
        { label: 'Absensi', href: '#absensi' },
        { label: 'Pengajuan', href: '#pengajuan' },
        { label: 'Approval', href: '#approval' },
        { label: 'Semua modul', href: '#fitur' },
      ],
    },
    {
      title: 'PERUSAHAAN',
      links: [
        { label: 'Solusi per industri', href: '#solusi' },
        { label: 'Harga', href: '#harga' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Minta Demo', href: DEMO_HREF },
      ],
    },
  ],
} as const

/* ------------------------------------------------------------------ */
/* Konsep ala KantorKu: poin kepercayaan, peta modul, industri, harga, FAQ, jaminan demo */
/* ------------------------------------------------------------------ */

export const TRUST_POINTS = [
  {
    id: 'face-location',
    icon: 'face',
    title: 'Absen wajah dan lokasi',
    description: 'Verifikasi wajah, area kerja, dan jam yang tepercaya.',
  },
  {
    id: 'offline',
    icon: 'offline',
    title: 'Tetap jalan tanpa sinyal',
    description: 'Absen tersimpan di HP dan terkirim saat tersambung.',
  },
  {
    id: 'erp',
    icon: 'database',
    title: 'Data satu sumber',
    description: 'Karyawan, cuti, dan payroll terkelola terpusat.',
  },
  {
    id: 'approval',
    icon: 'approval',
    title: 'Approval berjenjang',
    description: 'Atasan dan HR menyetujui langsung dari HP.',
  },
] as const

export type TrustIcon = (typeof TRUST_POINTS)[number]['icon']

export const FEATURE_STATUS = {
  AVAILABLE: 'available',
  PARTIAL: 'partial',
  PLANNED: 'planned',
} as const

export type FeatureStatus = (typeof FEATURE_STATUS)[keyof typeof FEATURE_STATUS]

export const FEATURE_STATUS_LABEL: Record<FeatureStatus, string> = {
  [FEATURE_STATUS.AVAILABLE]: 'Tersedia',
  [FEATURE_STATUS.PARTIAL]: 'Sebagian',
  [FEATURE_STATUS.PLANNED]: 'Dalam rencana',
}

export interface ModuleContent {
  id: string
  accent: AccentColor
  title: string
  description: string
  status: FeatureStatus
  items: readonly string[]
}

export const LIFECYCLE_SECTION = {
  id: 'fitur',
  tag: { label: 'FITUR', tone: 'teal' },
  title: 'Satu aplikasi untuk keseharian karyawan',
  description:
    'Dari absen pagi sampai slip gaji akhir bulan. Modul yang sudah berjalan ditandai Tersedia, sisanya jujur kami tandai sebagai rencana.',
} as const

export const MODULES: readonly ModuleContent[] = [
  {
    id: 'm-attendance',
    accent: 'teal',
    title: 'Absensi',
    description: 'Catat kehadiran dengan akurat dari HP karyawan.',
    status: FEATURE_STATUS.AVAILABLE,
    items: ['Absen dengan GPS dan area kerja', 'Verifikasi wajah', 'Mode offline', 'Riwayat dan koreksi absen'],
  },
  {
    id: 'm-requests',
    accent: 'orange',
    title: 'Cuti, lembur, dan dinas',
    description: 'Pengajuan tanpa kertas dengan sisa kuota yang jelas.',
    status: FEATURE_STATUS.AVAILABLE,
    items: ['Cuti dan sisa kuota', 'Lembur', 'Dinas luar dan WFH', 'Approval atasan'],
  },
  {
    id: 'm-payroll',
    accent: 'purple',
    title: 'Slip gaji dan pajak',
    description: 'Karyawan melihat rincian gajinya sendiri kapan saja.',
    status: FEATURE_STATUS.AVAILABLE,
    items: ['Slip gaji per periode', 'Ringkasan PPh 21', 'Ringkasan BPJS'],
  },
  {
    id: 'm-documents',
    accent: 'blue',
    title: 'Dokumen dan pengumuman',
    description: 'Dokumen karyawan tersimpan rapi, kabar perusahaan sampai ke semua.',
    status: FEATURE_STATUS.AVAILABLE,
    items: ['Dokumen digital dengan verifikasi HR', 'Pengumuman perusahaan', 'Perubahan profil dengan approval'],
  },
  {
    id: 'm-security',
    accent: 'yellow',
    title: 'Akses dan keamanan',
    description: 'Data karyawan terlindungi di setiap perangkat.',
    status: FEATURE_STATUS.AVAILABLE,
    items: ['Kunci aplikasi dengan biometrik', 'Ganti password', 'Kelola sesi perangkat'],
  },
  {
    id: 'm-performance',
    accent: 'purple',
    title: 'Kinerja',
    description: 'Penilaian dan target karyawan dalam satu tempat.',
    status: FEATURE_STATUS.PARTIAL,
    items: ['Appraisal dan target', 'Penilaian 360 derajat belum tersedia'],
  },
  {
    id: 'm-reimbursement',
    accent: 'orange',
    title: 'Reimbursement dan cash advance',
    description: 'Klaim biaya dan kasbon dari HP.',
    status: FEATURE_STATUS.PLANNED,
    items: ['Pengajuan klaim', 'Unggah bukti', 'Potongan otomatis'],
  },
  {
    id: 'm-learning',
    accent: 'teal',
    title: 'Pembelajaran',
    description: 'Materi pelatihan karyawan di aplikasi.',
    status: FEATURE_STATUS.PLANNED,
    items: ['Materi dan kursus', 'Pengingat pelatihan'],
  },
  {
    id: 'm-recruitment',
    accent: 'blue',
    title: 'Rekrutmen',
    description: 'Kelola lamaran sampai onboarding.',
    status: FEATURE_STATUS.PLANNED,
    items: ['Lowongan', 'Seleksi kandidat', 'Onboarding'],
  },
]

export const INDUSTRIES_SECTION = {
  id: 'solusi',
  tag: { label: 'SOLUSI', tone: 'orange' },
  title: 'Cocok untuk berbagai jenis usaha',
  description:
    'Alur kerja tiap industri berbeda. HRIS dirancang fleksibel agar absensi, lembur, dan approval mengikuti cara tim kamu bekerja.',
} as const

export interface IndustryContent {
  id: string
  accent: AccentColor
  title: string
  summary: string
  chips: readonly string[]
}

export const INDUSTRIES: readonly IndustryContent[] = [
  { id: 'logistics', accent: 'teal', title: 'Logistik', summary: 'Tim lapangan absen lewat HP di titik kerja dan tetap tercatat saat sinyal lemah.', chips: ['Absen GPS', 'Offline', 'Lembur'] },
  { id: 'construction', accent: 'orange', title: 'Konstruksi', summary: 'Pantau kehadiran di banyak lokasi proyek, dinas luar lewat approval.', chips: ['Multi-lokasi', 'Dinas luar'] },
  { id: 'healthcare', accent: 'purple', title: 'Healthcare', summary: 'Shift dan lembur tenaga medis tercatat rapi dan terhubung ke payroll.', chips: ['Shift', 'Lembur'] },
  { id: 'retail', accent: 'blue', title: 'Retail', summary: 'Absensi per outlet dan pengumuman ke seluruh toko dalam satu aplikasi.', chips: ['Per outlet', 'Pengumuman'] },
  { id: 'fnb', accent: 'yellow', title: 'F&B', summary: 'Atur kehadiran dan lembur tiap outlet dari satu tempat.', chips: ['Shift', 'Per outlet'] },
  { id: 'manufacturing', accent: 'teal', title: 'Manufaktur', summary: 'Rekap kehadiran dan lembur tenaga pabrik tanpa hitung manual.', chips: ['Rekap otomatis', 'Lembur'] },
  { id: 'services', accent: 'orange', title: 'Jasa profesional', summary: 'WFH, dinas luar, dan cuti dikelola tanpa kertas.', chips: ['WFH', 'Dinas luar', 'Cuti'] },
  { id: 'startup', accent: 'purple', title: 'Startup', summary: 'Mulai cepat tanpa sistem HR yang berat, lalu tumbuh bersama tim.', chips: ['Cepat dipasang', 'Mobile'] },
]

export const PRICING_SECTION = {
  id: 'harga',
  tag: { label: 'HARGA', tone: 'purple' },
  title: 'Harga yang menyesuaikan tim kamu',
  description:
    'Biaya mengikuti jumlah karyawan dan modul yang dipakai. Ceritakan kebutuhanmu, kami siapkan penawaran yang pas.',
  points: [
    'Demo gratis 30 menit',
    'Penawaran sesuai jumlah karyawan',
    'Modul bisa ditambah bertahap',
  ],
  ctaLabel: 'Minta Penawaran',
} as const

export const FAQ_SECTION = {
  id: 'faq',
  tag: { label: 'FAQ', tone: 'teal' },
  title: 'Pertanyaan yang sering muncul',
} as const

export interface FaqContent {
  id: string
  question: string
  answer: string
}

export const FAQS: readonly FaqContent[] = [
  {
    id: 'what',
    question: 'Apa itu HRIS?',
    answer:
      'HRIS adalah aplikasi HR mobile untuk absensi, pengajuan cuti, lembur, dan dinas luar, approval atasan, serta slip gaji. Datanya tersimpan terpusat sehingga HR dan atasan melihat informasi yang sama.',
  },
  {
    id: 'offline',
    question: 'Apakah karyawan bisa absen tanpa internet?',
    answer:
      'Bisa. Absen disimpan di HP dan dikirim otomatis begitu perangkat tersambung lagi, dengan jam yang tetap diverifikasi.',
  },
  {
    id: 'proxy',
    question: 'Bagaimana mencegah titip absen?',
    answer:
      'Absen memakai verifikasi wajah dan validasi lokasi sesuai area kerja, jadi absen tidak bisa dilakukan oleh orang lain atau dari luar lokasi.',
  },
  {
    id: 'security',
    question: 'Bagaimana keamanan data karyawan?',
    answer:
      'Aplikasi bisa dikunci dengan biometrik, kata sandi dapat diganti kapan saja, dan sesi perangkat yang sedang masuk bisa dikelola dari dalam aplikasi.',
  },
  {
    id: 'planned',
    question: 'Fitur apa yang belum tersedia?',
    answer:
      'Reimbursement, cash advance, pembelajaran, dan rekrutmen masih dalam rencana, begitu juga penilaian 360 derajat. Kami tandai jelas di daftar fitur.',
  },
]

export const DEMO_GUARANTEES = [
  'Demo 30 menit bersama tim kami',
  'Disesuaikan dengan alur kerja perusahaanmu',
  'Pendampingan saat mulai dipakai',
  'Bantuan memindahkan data karyawan',
] as const
