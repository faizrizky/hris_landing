import { getCmsUrl } from '@/utilities/cms-client'

import type { LeadInput } from './lead-schema'
import type { LeadRepository } from './submit-lead'

const REQUEST_TIMEOUT_MS = 10_000

/** Menyimpan lead ke koleksi `leads` di hris-cms lewat REST. Koleksi itu hanya membuka akses buat (create) ke publik. */
export const createCmsLeadRepository = (): LeadRepository => ({
  create: async (lead: LeadInput) => {
    const payload = {
      ...lead,
      employeeCount: lead.employeeCount === '' ? undefined : lead.employeeCount,
    }

    const response = await fetch(`${getCmsUrl()}/api/leads`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (!response.ok) {
      throw new Error(`CMS menolak lead dengan status ${response.status}`)
    }
  },
})
