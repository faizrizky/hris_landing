import { object, string, type InferType } from 'yup'

/** Nilai harus sama dengan EMPLOYEE_COUNT_OPTIONS di hris-cms/src/collections/leads.ts. */
export const EMPLOYEE_COUNT_OPTIONS = [
  { label: '1 sampai 50', value: '1-50' },
  { label: '51 sampai 200', value: '51-200' },
  { label: '201 sampai 1.000', value: '201-1000' },
  { label: 'Lebih dari 1.000', value: '1000+' },
] as const

const PHONE_PATTERN = /^[0-9+()\-\s]{8,20}$/
const EMPLOYEE_COUNT_VALUES = EMPLOYEE_COUNT_OPTIONS.map((option) => option.value)

export const leadSchema = object({
  name: string().trim().required('Nama wajib diisi').max(120, 'Nama terlalu panjang'),
  company: string().trim().required('Nama perusahaan wajib diisi').max(160, 'Nama perusahaan terlalu panjang'),
  email: string().trim().required('Email wajib diisi').email('Format email belum benar').max(200),
  phone: string()
    .trim()
    .required('Nomor WhatsApp wajib diisi')
    .matches(PHONE_PATTERN, 'Gunakan 8 sampai 20 angka, boleh diawali +'),
  industry: string().trim().max(120, 'Industri terlalu panjang').default(''),
  employeeCount: string().trim().oneOf(['', ...EMPLOYEE_COUNT_VALUES], 'Pilihan tidak dikenali').default(''),
  message: string().trim().max(2000, 'Pesan terlalu panjang').default(''),
  source: string().trim().max(200).default('/demo'),
})

export type LeadInput = InferType<typeof leadSchema>

export type LeadFieldName = keyof LeadInput

export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>
