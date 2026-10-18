import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { getSolutionBySlug, getSolutionSummaries } from '@/features/cms/loaders'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { FaqIndented } from '@/features/site/components/faq-indented'
import { PageIntro } from '@/features/site/components/page-intro'
import { DEMO_HREF } from '@/features/site/content/labels'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const result = await getSolutionSummaries()

  return result.isOk ? result.data.map((solution) => ({ slug: solution.slug })) : []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const result = await getSolutionBySlug(slug)

  if (!result.isOk || !result.data) return {}

  return { title: `HRIS untuk ${result.data.name}`, description: result.data.heroDescription }
}

export default async function SolutionPage({ params }: Args) {
  const { slug } = await params
  const result = await getSolutionBySlug(slug)

  if (!result.isOk) return <ContentUnavailable message={result.message} />
  if (!result.data) return notFound()

  const solution = result.data
  const pains = solution.pains ?? []
  const points = solution.points ?? []

  return (
    <>
      <PageIntro
        title={solution.heroTitle}
        sentence={solution.heroDescription}
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      {pains.length > 0 && (
        <section className="wrap grid12 gap-y-10 bg-paper-2 py-16 md:py-24" aria-label="Masalah yang sering dihadapi">
          <h2 data-reveal className="t-head col-span-12 max-w-[16ch] lg:col-span-4">
            Yang biasanya menyita waktu
          </h2>
          <ul className="col-span-12 space-y-8 lg:col-span-7 lg:col-start-6">
            {pains.map((pain, index) => (
              <li key={pain.id ?? pain.title} data-reveal style={{ '--i': index } as React.CSSProperties}>
                <p className="t-statement font-bold">{pain.title}</p>
                <p className="mt-1 max-w-[46ch]">{pain.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {points.length > 0 && (
        <section className="wrap grid12 gap-y-10 py-16 md:py-24" aria-label="Cara HRIS membantu">
          <h2 data-reveal className="t-head col-span-12 max-w-[14ch] lg:col-span-4">
            Cara HRIS membantu
          </h2>
          <ul className="col-span-12 space-y-8 lg:col-span-7 lg:col-start-6">
            {points.map((point, index) => {
              const feature = typeof point.feature === 'object' ? point.feature : null

              return (
                <li key={point.id ?? point.title} data-reveal style={{ '--i': index } as React.CSSProperties}>
                  <p className="t-statement font-bold">{point.title}</p>
                  <p className="mt-1 max-w-[46ch]">{point.description}</p>
                  {feature && (
                    <Link href={`/fitur/${feature.slug}`} className="link mt-2 inline-block font-semibold">
                      Lihat fitur {feature.name} →
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <FaqIndented heading="Pertanyaan umum" items={solution.faqs ?? []} />
    </>
  )
}
