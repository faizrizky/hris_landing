'use server'

import { createCmsLeadRepository } from './cms-lead-repository'
import type { LeadFormState } from './lead-form-state'
import { submitLead } from './submit-lead'

const HONEYPOT_FIELD = 'website'

/** Adapter tipis: membaca FormData lalu meneruskannya ke use-case. Tidak ada logika bisnis di sini. */
export const submitLeadAction = async (_previous: LeadFormState, formData: FormData): Promise<LeadFormState> => {
  // Kolom jebakan untuk bot: manusia tidak melihatnya, jadi isian berarti bot. Pura-pura sukses.
  if (formData.get(HONEYPOT_FIELD)) return { status: 'success', fieldErrors: {}, message: '' }

  const result = await submitLead(createCmsLeadRepository(), Object.fromEntries(formData))

  if (result.status === 'success') return { status: 'success', fieldErrors: {}, message: '' }
  if (result.status === 'invalid') return { status: 'invalid', fieldErrors: result.fieldErrors, message: '' }

  return { status: 'error', fieldErrors: {}, message: result.message }
}
