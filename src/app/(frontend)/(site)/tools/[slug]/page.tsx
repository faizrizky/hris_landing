import { getPageCopy } from '@/features/cms/loaders'
import { buildSectionTags } from '@/features/home/content/tones'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { CalculatorVisual } from '@/features/site/visuals/calculator-visual'
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

  const copyResult = await getPageCopy()

  if (!copyResult.isOk) return <ContentUnavailable message={copyResult.message} />

  const copy = copyResult.data
  const tags = buildSectionTags(copy)

  return (
    <>
      <PageIntro
        visual={
          <CalculatorVisual
            title={calculator.title}
            tabs={CALCULATORS.filter((item) => item.slug !== calculator.slug).map((item) => item.title)}
          />
        }
        title={calculator.title} tag={tags.modules} sentence={calculator.summary} />
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
