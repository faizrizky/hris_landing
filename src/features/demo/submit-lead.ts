import { ValidationError } from 'yup'

import { leadSchema, type LeadFieldErrors, type LeadInput } from './lead-schema'

/** Batas yang dibutuhkan use-case dari dunia luar: cara menyimpan lead. Diberikan lewat parameter. */
export interface LeadRepository {
  create: (lead: LeadInput) => Promise<void>
}

export type SubmitLeadResult =
  | { status: 'success' }
  | { status: 'invalid'; fieldErrors: LeadFieldErrors }
  | { status: 'error'; message: string }

const GENERIC_ERROR_MESSAGE = 'Form belum bisa terkirim. Coba lagi sebentar lagi.'

/** Use-case: validasi isian form demo lalu simpan sebagai lead. Satu file, satu use-case. */
export const submitLead = async (
  repository: LeadRepository,
  rawInput: Record<string, unknown>,
): Promise<SubmitLeadResult> => {
  let lead: LeadInput

  try {
    lead = await leadSchema.validate(rawInput, { abortEarly: false, stripUnknown: true })
  } catch (error) {
    if (!(error instanceof ValidationError)) return { status: 'error', message: GENERIC_ERROR_MESSAGE }

    const fieldErrors: LeadFieldErrors = {}

    error.inner.forEach((issue) => {
      const field = issue.path as keyof LeadFieldErrors | undefined

      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message
    })

    return { status: 'invalid', fieldErrors }
  }

  try {
    await repository.create(lead)

    return { status: 'success' }
  } catch (error) {
    console.error('Gagal menyimpan lead', error)

    return { status: 'error', message: GENERIC_ERROR_MESSAGE }
  }
}
