import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PageIntro } from '@/features/site/components/page-intro'
import { CalculatorForm } from '@/features/tools/calculator-form'
import { CALCULATORS, getCalculatorBySlug } from '@/features/tools/registry'

type Args = { params: Promise<{ slug: string }> }

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

  return (
    <>
      <PageIntro title={calculator.title} sentence={calculator.summary} />
      <section className="wrap pb-[calc(var(--section)/2)]" aria-label="Kalkulator">
        <CalculatorForm slug={calculator.slug} />
        <p className="mt-16 max-w-[60ch] text-ink-soft">
          {calculator.basis ? `Dasar: ${calculator.basis} ` : ''}
          Hasil adalah perkiraan, bukan nasihat hukum atau pajak. Konsultasikan dengan ahli sebelum mengambil keputusan.
        </p>
      </section>
    </>
  )
}
