import { ArrowRight, Smartphone } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PillLink } from '@/features/home/components/pill-link'
import { SectionTag } from '@/features/home/components/section-tag'
import { tagFor } from '@/features/home/content/tones'
import { DEMO_HREF } from '@/features/site/content/labels'
import { CalculatorForm } from '@/features/tools/calculator-form'
import { CALCULATORS, getCalculatorBySlug } from '@/features/tools/registry'

type Args = { params: Promise<{ slug: string }> }

const TOOLS_TAG = 'KALKULATOR HR'
const DISCLAIMER =
  'Kalkulator ini adalah alat simulasi, bukan nasihat hukum atau pajak. Angka aktual dapat berbeda sesuai kebijakan perusahaan dan perjanjian kerja. Konsultasikan dengan ahli sebelum mengambil keputusan.'

export function generateStaticParams() {
  return CALCULATORS.map((calculator) => ({ slug: calculator.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const calculator = getCalculatorBySlug(slug)

  return calculator ? { title: calculator.title, description: calculator.summary } : {}
}

export default async function CalculatorPage({ params }: Args) {
  const { slug } = await params
  const calculator = getCalculatorBySlug(slug)

  if (!calculator) return notFound()

  const tag = tagFor(TOOLS_TAG)

  return (
    <>
      <section className="pb-10 pt-12 md:pt-16">
        <div className="container grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <div>
            {tag && <SectionTag label={tag.label} tone={tag.tone} />}
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">{calculator.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">{calculator.summary}</p>
          </div>
          <div className="rounded-3xl bg-tint-lavender p-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Terhubung dengan aplikasi</p>
            <p className="mt-2 flex items-center gap-2 text-lg font-extrabold">
              <Smartphone aria-hidden className="h-5 w-5 text-accent-purple" />
              HRIS
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">Absensi, pengajuan, slip gaji, serta ringkasan pajak dan BPJS karyawan dalam satu aplikasi.</p>
          </div>
        </div>
      </section>

      <section className="pb-16" aria-label="Kalkulator">
        <div className="container">
          <CalculatorForm slug={calculator.slug} />
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-tint-sky p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-2xl font-extrabold leading-tight">Ingin urusan HR ini berjalan otomatis?</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                Lihat langsung bagaimana absensi, pengajuan, dan slip gaji bekerja di aplikasi HRIS lewat demo 30 menit.
              </p>
            </div>
            <PillLink href={DEMO_HREF} variant="dark" className="shrink-0">
              Minta demo
              <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
            </PillLink>
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink-muted">
            <span className="font-semibold">Disclaimer: </span>
            {DISCLAIMER}
          </p>
        </div>
      </section>
    </>
  )
}
