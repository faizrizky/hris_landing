import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { tagFor } from '@/features/home/content/tones'
import { PageIntro } from '@/features/site/components/page-intro'
import { CalculatorVisual } from '@/features/site/visuals/calculator-visual'
import { CalculatorForm } from '@/features/tools/calculator-form'
import { CALCULATORS, getCalculatorBySlug } from '@/features/tools/registry'

type Args = { params: Promise<{ slug: string }> }

const TOOLS_TAG = 'KALKULATOR'

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
      <PageIntro
        title={calculator.title}
        tag={tagFor(TOOLS_TAG)}
        sentence={calculator.summary}
        visual={
          <CalculatorVisual
            title={calculator.title}
            tabs={CALCULATORS.filter((item) => item.slug !== calculator.slug).map((item) => item.title)}
          />
        }
      />
      <section className="pb-20" aria-label="Kalkulator">
        <div className="container">
          <CalculatorForm slug={calculator.slug} />
          <p className="mt-12 max-w-xl text-xs leading-relaxed text-ink-muted">
            {calculator.basis ? `Dasar: ${calculator.basis} ` : ''}
            Hasil adalah perkiraan, bukan nasihat hukum atau pajak. Konsultasikan dengan ahli sebelum mengambil keputusan.
          </p>
        </div>
      </section>
    </>
  )
}
