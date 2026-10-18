import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Potongan antarmuka produk yang dibangun di HTML. Akar tiap fragmen bertanda `data-ui`, jadi garis dan
 * radius milik produk sendiri (bukan hiasan halaman).
 */

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

const UI_BUTTON_CLASS =
  'inline-flex min-h-10 items-center justify-center rounded-[8px] px-4 font-semibold transition-colors'

export type RequestRowState = 'pending' | 'open' | 'done'

interface RequestRowProps {
  person: string
  request: string
  meta: string
  state: RequestRowState
  pendingLabel: string
  approveLabel: string
  rejectLabel: string
  doneLabel: string
  onApprove?: () => void
  className?: string
}

/** Satu baris pengajuan di antrean atasan, dalam tiga keadaan: menunggu, dibuka, selesai. */
export const RequestRow: React.FC<RequestRowProps> = ({
  person,
  request,
  meta,
  state,
  pendingLabel,
  approveLabel,
  rejectLabel,
  doneLabel,
  onApprove,
  className,
}) => (
  <div
    data-ui
    className={cn(
      'flex w-full max-w-[640px] flex-wrap items-center gap-x-4 gap-y-3 border border-[var(--ui-line)] bg-white p-4',
      state === 'open' && 'ring-2 ring-accent',
      className,
    )}
  >
    <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-paper-2 text-[0.9375rem] font-bold">
      {getInitials(person)}
    </span>
    <div className="min-w-[10rem] flex-1">
      <p className="font-semibold leading-tight">{person}</p>
      <p className="mt-0.5 text-ink-soft">
        {request} · {meta}
      </p>
    </div>
    {state === 'pending' && <span className="font-semibold text-ink-soft">{pendingLabel}</span>}
    {state === 'open' && (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onApprove}
          className={cn(UI_BUTTON_CLASS, 'bg-ink text-paper hover:bg-accent hover:text-ink')}
        >
          {approveLabel}
        </button>
        <button type="button" className={cn(UI_BUTTON_CLASS, 'bg-paper-2 hover:bg-tint')}>
          {rejectLabel}
        </button>
      </div>
    )}
    {state === 'done' && <span className="font-semibold">{doneLabel}</span>}
  </div>
)

interface ResultFragmentProps {
  title: string
  figure: string
  lines: string[]
  status: string
  className?: string
}

/** Hasil yang dikembalikan aplikasi setelah satu aksi: judul, angka utama, rincian, dan status. */
export const ResultFragment: React.FC<ResultFragmentProps> = ({ title, figure, lines, status, className }) => (
  <div
    data-ui
    className={cn('flex min-h-[220px] w-full flex-col justify-between border border-[var(--ui-line)] bg-white p-5', className)}
  >
    <div className="flex items-baseline justify-between gap-4">
      <p className="font-bold">{title}</p>
      <span className="font-semibold text-ink-soft">{status}</span>
    </div>
    <p className="my-4 text-[3.5rem] font-extrabold leading-none tracking-[-0.05em] nums">{figure}</p>
    <ul className="space-y-0.5 text-ink-soft">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  </div>
)

interface RecordRowData {
  id?: string | null
  day: string
  time: string
  status: string
}

interface AttendanceRecordProps {
  title: string
  rows: RecordRowData[]
  className?: string
}

/** Riwayat absen seorang karyawan: hasil dari pemeriksaan yang dijelaskan di sebelahnya. */
export const AttendanceRecord: React.FC<AttendanceRecordProps> = ({ title, rows, className }) => (
  <div
    data-ui
    className={cn('min-h-[260px] w-full border border-[var(--ui-line)] bg-white p-5', className)}
  >
    <p className="font-bold">{title}</p>
    <table className="mt-4 w-full border-collapse text-left">
      <tbody>
        {rows.map((row) => (
          <tr key={row.id ?? row.day} className="odd:bg-paper-2">
            <th scope="row" className="px-3 py-3 font-medium">
              {row.day}
            </th>
            <td className="px-3 py-3 nums">{row.time}</td>
            <td className="px-3 py-3 text-right font-semibold">{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

interface ToggleProps {
  isOn: boolean
  label: string
  onToggle: () => void
}

/** Sakelar dibangun dalam satuan em agar ikut besar mengikuti ukuran huruf sekitarnya. */
export const Toggle: React.FC<ToggleProps> = ({ isOn, label, onToggle }) => (
  <button
    data-ui
    type="button"
    role="switch"
    aria-checked={isOn}
    aria-label={label}
    onClick={onToggle}
    className={cn(
      'relative inline-block h-[1.9em] w-[3.4em] shrink-0 rounded-full text-[1rem] transition-colors duration-[var(--t-ui)] before:absolute before:left-[0.25em] before:top-[0.25em] before:size-[1.4em] before:rounded-full before:bg-paper before:transition-transform before:duration-[var(--t-ui)] before:content-[""]',
      isOn ? 'bg-ink before:translate-x-[1.5em]' : 'bg-ink/25',
    )}
  />
)
