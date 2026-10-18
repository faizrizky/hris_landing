'use client'

import React, { useActionState } from 'react'

import { cn } from '@/utilities/ui'

import { EMPLOYEE_COUNT_OPTIONS, type LeadFieldName } from './lead-schema'
import { INITIAL_LEAD_FORM_STATE } from './lead-form-state'
import { submitLeadAction } from './submit-lead-action'

interface TextFieldProps {
  order: number
  name: LeadFieldName
  label: string
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  isRequired?: boolean
  error?: string
}

const TextField: React.FC<TextFieldProps> = ({ order, name, label, type = 'text', autoComplete, isRequired, error }) => (
  <div style={{ '--i': order } as React.CSSProperties}>
    <label htmlFor={`lead-${name}`} className="block font-semibold">
      {label}
      {isRequired && <span className="sr-only"> (wajib)</span>}
    </label>
    <input
      id={`lead-${name}`}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={isRequired}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `lead-${name}-error` : undefined}
      className={cn('field mt-2', error && 'ring-2 ring-ink')}
    />
    {error && (
      <p id={`lead-${name}-error`} role="alert" className="mt-1 font-semibold">
        {error}
      </p>
    )}
  </div>
)

/** Form pengajuan demo. Data dikirim lewat body POST (server action), tidak pernah lewat URL. */
export const DemoForm: React.FC = () => {
  const [state, formAction, isPending] = useActionState(submitLeadAction, INITIAL_LEAD_FORM_STATE)

  if (state.status === 'success') {
    return (
      <div role="status">
        <p className="t-head max-w-[16ch]">Terima kasih. Kami hubungi segera.</p>
        <p className="t-statement mt-4 max-w-[34ch] text-ink-soft">
          Tim kami akan menghubungi lewat WhatsApp atau email untuk menjadwalkan demo 30 menit.
        </p>
      </div>
    )
  }

  const { fieldErrors } = state

  return (
    <form action={formAction} noValidate className="space-y-6">
      <input type="hidden" name="source" value="/demo" />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Jangan diisi
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <TextField order={0} name="name" label="Nama lengkap" autoComplete="name" isRequired error={fieldErrors.name} />
      <TextField order={1} name="company" label="Perusahaan" autoComplete="organization" isRequired error={fieldErrors.company} />
      <TextField order={2} name="email" label="Email kerja" type="email" autoComplete="email" isRequired error={fieldErrors.email} />
      <TextField order={3} name="phone" label="Nomor WhatsApp" type="tel" autoComplete="tel" isRequired error={fieldErrors.phone} />
      <TextField order={4} name="industry" label="Industri (opsional)" error={fieldErrors.industry} />

      <div>
        <label htmlFor="lead-employeeCount" className="block font-semibold">
          Jumlah karyawan (opsional)
        </label>
        <select id="lead-employeeCount" name="employeeCount" defaultValue="" className="field mt-2">
          <option value="">Pilih</option>
          {EMPLOYEE_COUNT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lead-message" className="block font-semibold">
          Yang ingin kamu selesaikan (opsional)
        </label>
        <textarea id="lead-message" name="message" rows={4} className="field mt-2" />
        {fieldErrors.message && (
          <p role="alert" className="mt-1 font-semibold">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {state.status === 'error' && (
        <p role="alert" className="font-semibold">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn w-full disabled:opacity-60 md:w-auto"
      >
        {isPending ? 'Mengirim…' : 'Kirim pengajuan'}
      </button>
    </form>
  )
}
