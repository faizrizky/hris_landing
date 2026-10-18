import type { LeadFieldErrors } from './lead-schema'

export interface LeadFormState {
  status: 'idle' | 'success' | 'invalid' | 'error'
  fieldErrors: LeadFieldErrors
  message: string
}

/** Disimpan di file biasa karena file 'use server' hanya boleh mengekspor fungsi async. */
export const INITIAL_LEAD_FORM_STATE: LeadFormState = { status: 'idle', fieldErrors: {}, message: '' }
