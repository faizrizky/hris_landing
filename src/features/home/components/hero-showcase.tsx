import { Check } from 'lucide-react'
import React from 'react'

import { getAccentByIndex, getInitials, type AccentColor } from '../content/tones'
import { StatusPill } from './status-pill'

const TONE_BG_CLASS: Record<AccentColor, string> = {
  teal: 'bg-accent-teal',
  orange: 'bg-accent-orange',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  yellow: 'bg-accent-yellow',
}

/** Tinggi sumbu Z tiap layer pada layar lebar (px). Layer di atas tampak melayang lebih tinggi. */
const LAYER_Z_PX = { dashboard: 0, phone: 60, cardAttendance: 90, cardPayslip: 110 } as const

const getLayerStyle = (zPx: number) => ({ '--z': `${zPx}px` }) as React.CSSProperties

/**
 * `--lift` dan `--float` dianimasikan GSAP (use-hero-showcase). Transform 3D hanya aktif di layar
 * lebar; di mobile hanya dashboard yang tampil datar.
 */
const LAYER_CLASS = 'md:[transform:translateZ(calc(var(--z)_+_var(--lift,0px)_+_var(--float,0px)))]'

export interface HeroMockup {
  approvalsTitle?: string | null
  approvals?: { id?: string | null; person: string; detail: string; status: string }[] | null
  doneLabel?: string | null
  attendanceTitle?: string | null
  attendanceFigure?: string | null
  attendanceDetail?: string | null
  payslipTitle?: string | null
  payslipDetail?: string | null
  phoneChips?: { id?: string | null; text: string }[] | null
}

interface HeroShowcaseProps {
  mockup: HeroMockup
}

/** Mockup produk isometrik: antrean persetujuan, HP absen, dan dua kartu notifikasi yang melayang. */
export const HeroShowcase: React.FC<HeroShowcaseProps> = ({ mockup }) => {
  const approvals = mockup.approvals ?? []
  const phoneChips = mockup.phoneChips ?? []

  const floatingCards = [
    { id: 'attendance', accent: 'teal', title: mockup.attendanceTitle, subtitle: mockup.attendanceDetail },
    { id: 'payslip', accent: 'purple', title: mockup.payslipTitle, subtitle: mockup.payslipDetail },
  ] as const

  return (
    <div
      aria-hidden
      className="relative mx-auto h-auto w-full max-w-[520px] md:h-[500px] md:max-w-none md:[perspective:1600px]"
    >
      <div className="relative md:absolute md:left-1/2 md:top-1/2 md:h-[360px] md:w-[540px] md:-translate-x-1/2 md:-translate-y-1/2 md:[transform-style:preserve-3d] md:[transform:rotateX(50deg)_rotateZ(-32deg)_scale(1.12)]">
        <div
          data-iso-layer
          style={getLayerStyle(LAYER_Z_PX.dashboard)}
          className={`${LAYER_CLASS} relative w-full rounded-2xl bg-white p-4 shadow-[0_40px_70px_-25px_rgba(20,40,110,0.4)] md:absolute md:left-0 md:top-14 md:w-[470px]`}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-orange" />
            <span className="h-2 w-2 rounded-full bg-accent-yellow" />
            <span className="h-2 w-2 rounded-full bg-accent-teal" />
            <p className="ml-2 text-[11px] font-bold">{mockup.approvalsTitle}</p>
          </div>

          <ul className="mt-3 space-y-2">
            {approvals.map((row, index) => (
              <li key={row.id ?? row.person} className="flex items-center gap-2.5 rounded-xl bg-tint-sky p-2.5 text-[11px]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-tint-lavender text-[9px] font-bold text-accent-purple">
                  {getInitials(row.person)}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{row.person}</span>
                  <span className="block text-[10px] text-ink-muted">{row.detail}</span>
                </span>
                <StatusPill
                  label={row.status}
                  isDone={row.status === mockup.doneLabel}
                  className="text-[10px]"
                />
                <span className={`h-1.5 w-1.5 rounded-full ${TONE_BG_CLASS[getAccentByIndex(index)]}`} />
              </li>
            ))}
          </ul>
        </div>

        <div
          data-iso-layer
          style={getLayerStyle(LAYER_Z_PX.phone)}
          className={`${LAYER_CLASS} hidden h-[290px] w-[150px] rounded-[1.6rem] border-[6px] border-phone-lavender bg-white p-3 text-center shadow-[0_30px_50px_-20px_rgba(60,60,160,0.45)] md:absolute md:left-[400px] md:top-[-18px] md:block`}
        >
          <p className="mt-4 text-[10px] font-bold">{mockup.attendanceTitle}</p>
          <p className="text-[8px] text-ink-muted">{mockup.attendanceFigure}</p>
          <div className="mx-auto mt-4 grid h-20 w-20 place-items-center rounded-full border-4 border-accent-teal">
            <Check className="h-9 w-9 text-accent-teal" strokeWidth={3} />
          </div>
          <ul className="mt-4 flex flex-col items-center gap-1.5">
            {phoneChips.slice(0, 2).map((chip) => (
              <li key={chip.id ?? chip.text} className="rounded-full bg-tint-cyan px-2.5 py-0.5 text-[9px] font-medium">
                {chip.text}
              </li>
            ))}
          </ul>
        </div>

        {floatingCards.map((card) => (
          <div
            key={card.id}
            data-iso-layer
            style={getLayerStyle(card.id === 'attendance' ? LAYER_Z_PX.cardAttendance : LAYER_Z_PX.cardPayslip)}
            className={`${LAYER_CLASS} relative hidden w-[200px] rounded-xl bg-white p-3 pl-4 shadow-[0_24px_40px_-18px_rgba(20,30,80,0.45)] md:absolute md:block ${
              card.id === 'attendance' ? 'md:left-[-10px] md:top-[375px]' : 'md:left-[250px] md:top-[390px]'
            }`}
          >
            <span
              className={`absolute bottom-2.5 left-0 top-2.5 w-1 rounded-full ${TONE_BG_CLASS[card.accent]}`}
            />
            <p className="text-[11px] font-bold">{card.title}</p>
            <p className="mt-0.5 text-[9px] text-ink-muted">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
