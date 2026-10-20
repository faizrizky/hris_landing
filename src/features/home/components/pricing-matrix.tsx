'use client'

import { Check, Clock, Minus, Plus, X } from 'lucide-react'
import React, { useState } from 'react'

import type { PricingPlan } from '@/features/site/components/plan-card'
import { DEMO_HREF } from '@/features/site/content/labels'
import type { Page } from '@/types/cms'
import { cn } from '@/utilities/ui'

import { PillLink } from './pill-link'

type PricingBlockData = Extract<Page['layout'][number], { blockType: 'pricing' }>
type MatrixCategory = NonNullable<PricingBlockData['matrix']>[number]

const MIN_EMPLOYEES = 1
const MAX_EMPLOYEES = 100000
const DEFAULT_EMPLOYEES = 50
const IDR_FORMATTER = new Intl.NumberFormat('id-ID')

/** Harga paket ditulis bebas ("Rp11.900"); ambil angkanya, atau null bila tidak bisa dibaca. */
const parsePricePerEmployee = (price: unknown): number | null => {
  if (typeof price !== 'string') return null
  const digits = price.replace(/\D/g, '')
  return digits ? Number(digits) : null
}

const clampEmployees = (value: number) => Math.min(MAX_EMPLOYEES, Math.max(MIN_EMPLOYEES, Math.round(value)))

interface PricingEstimatorProps {
  title?: string | null
  description?: string | null
  plans: PricingPlan[]
}

/** Pengunjung mengisi jumlah karyawan; tiap paket menampilkan perkiraan biaya per bulan. */
export const PricingEstimator: React.FC<PricingEstimatorProps> = ({ title, description, plans }) => {
  const [employeeCount, setEmployeeCount] = useState(DEFAULT_EMPLOYEES)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '')
    setEmployeeCount(digits ? clampEmployees(Number(digits)) : MIN_EMPLOYEES)
  }

  return (
    <div className="mt-16 grid items-center gap-10 rounded-3xl bg-white p-8 shadow-[0_24px_60px_-34px_rgba(60,60,140,0.5)] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:p-10">
      <div data-gsap-reveal>
        {title && <h3 className="text-2xl font-extrabold leading-tight">{title}</h3>}
        {description && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p>}
        <p className="mt-6 text-sm font-semibold">Jumlah karyawan</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            aria-label="Kurangi jumlah karyawan"
            onClick={() => setEmployeeCount((current) => clampEmployees(current - 1))}
            className="grid h-11 w-11 place-items-center rounded-full bg-night text-white transition-transform hover:scale-105"
          >
            <Minus aria-hidden className="h-4 w-4" />
          </button>
          <input
            inputMode="numeric"
            aria-label="Jumlah karyawan"
            value={employeeCount}
            onChange={handleInput}
            className="nums h-11 w-28 rounded-xl border border-line bg-white text-center text-base font-semibold outline-none focus:border-accent-blue"
          />
          <button
            type="button"
            aria-label="Tambah jumlah karyawan"
            onClick={() => setEmployeeCount((current) => clampEmployees(current + 1))}
            className="grid h-11 w-11 place-items-center rounded-full bg-night text-white transition-transform hover:scale-105"
          >
            <Plus aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        {plans.map((plan, index) => {
          const pricePerEmployee = parsePricePerEmployee(plan.price)
          return (
            <li
              key={plan.id ?? index}
              data-gsap-reveal
              className={cn('flex flex-col rounded-2xl border p-5', plan.isFeatured ? 'border-accent-blue bg-tint-sky' : 'border-line')}
            >
              <p className="text-sm font-bold">{plan.name}</p>
              <p className="mt-3 text-[11px] text-ink-muted">Perkiraan per bulan</p>
              <p className="nums text-xl font-extrabold tracking-tight">
                {pricePerEmployee === null ? plan.price : `Rp${IDR_FORMATTER.format(pricePerEmployee * employeeCount)}`}
              </p>
              <p className="nums mt-1 text-[11px] text-ink-muted">
                {plan.pricePrefix} {plan.price}
                {plan.priceUnit}
              </p>
              <div className="mt-4">
                <PillLink href={plan.actionHref || DEMO_HREF} variant={plan.isFeatured ? 'dark' : 'outline'} className="w-full">
                  {plan.actionLabel}
                </PillLink>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

interface PricingMatrixProps {
  plans: PricingPlan[]
  categories: MatrixCategory[]
}

const MatrixCell: React.FC<{ mode?: string | null; label?: string | null }> = ({ mode, label }) => {
  if (mode === 'addon') {
    return <span className="text-center text-xs font-semibold leading-snug text-ink">{label || 'Opsional'}</span>
  }
  if (mode === 'excluded') {
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-black/10" role="img" aria-label="Tidak termasuk">
        <X aria-hidden className="h-3 w-3 text-ink-muted" strokeWidth={3} />
      </span>
    )
  }
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-purple/80" role="img" aria-label="Termasuk">
      <Check aria-hidden className="h-3.5 w-3.5 text-white" strokeWidth={3} />
    </span>
  )
}

/** Tabel perbandingan fitur per kategori; kolom mengikuti urutan paket. */
export const PricingMatrix: React.FC<PricingMatrixProps> = ({ plans, categories }) => {
  const columnTemplate = { gridTemplateColumns: `minmax(0,2.2fr) repeat(${plans.length}, minmax(0,1fr))` }

  return (
    <div className="mt-16 overflow-x-auto rounded-3xl bg-white p-3 shadow-[0_24px_60px_-34px_rgba(60,60,140,0.5)] md:p-5">
      <div className="min-w-[640px]">
        <div className="grid items-end gap-2 px-4 pb-3 pt-2" style={columnTemplate}>
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Fitur</span>
          {plans.map((plan, index) => (
            <span key={plan.id ?? index} className={cn('text-center text-sm font-extrabold', plan.isFeatured && 'text-accent-blue')}>
              {plan.name}
            </span>
          ))}
        </div>

        {categories.map((category, categoryIndex) => (
          <div key={category.id ?? categoryIndex} data-gsap-reveal className="mb-3">
            <h4 className="rounded-xl bg-night px-4 py-3 text-xs font-bold uppercase tracking-wider text-white">{category.title}</h4>
            {(category.groups ?? []).map((group, groupIndex) => {
              const cells = group.cells ?? []
              return (
                <div key={group.id ?? groupIndex} className="grid items-center gap-2 border-b border-line px-4 py-4 last:border-b-0" style={columnTemplate}>
                  <div>
                    <p className="text-sm font-semibold">
                      {group.title}
                      {group.isSoon && (
                        <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-semibold text-wait">
                          <Clock aria-hidden className="h-3 w-3" />
                          Segera hadir
                        </span>
                      )}
                    </p>
                    <ul className="mt-1 space-y-0.5 text-xs text-ink-muted">
                      {(group.points ?? []).map((point, pointIndex) => (
                        <li key={point.id ?? pointIndex} className="flex gap-1.5">
                          <span aria-hidden>•</span>
                          <span>{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {plans.map((plan, planIndex) => (
                    <div key={plan.id ?? planIndex} className={cn('flex items-center justify-center self-stretch rounded-lg py-1', plan.isFeatured && 'bg-tint-sky/70')}>
                      <MatrixCell mode={cells[planIndex]?.mode} label={cells[planIndex]?.label} />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
