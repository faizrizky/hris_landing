import { PageVisual } from '@/features/site/components/page-visual'
import { SECTION_TAGS } from '@/features/home/content/tones'
import { PageSection } from '@/features/site/components/page-section'
import { AccentCard } from '@/features/site/components/accent-card'
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
        visual={
          <PageVisual
            title={solution.name}
            rows={[...pains, ...points].map((item) => ({ title: item.title, detail: item.description }))}
          />
        }
        title={solution.heroTitle}
        tag={SECTION_TAGS.industries}
        sentence={solution.heroDescription}
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      {pains.length > 0 && (
        <PageSection title="Yang biasanya menyita waktu" bandClassName="bg-tint-peach">
          <ul className="grid gap-5 md:grid-cols-3">
            {pains.map((pain, index) => (
              <li key={pain.id ?? pain.title}>
                <AccentCard index={index} title={pain.title} description={pain.description} />
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      {points.length > 0 && (
        <PageSection title="Cara HRIS membantu">
          <ul className="grid gap-5 md:grid-cols-2">
            {points.map((point, index) => {
              const feature = typeof point.feature === 'object' ? point.feature : null

              return (
                <li key={point.id ?? point.title}>
                  <AccentCard index={index} title={point.title} description={point.description}>
                    {feature && (
                      <Link href={`/fitur/${feature.slug}`} className="relative mt-3 inline-block text-xs font-semibold underline underline-offset-4 hover:text-brand">
                        Lihat fitur {feature.name}
                      </Link>
                    )}
                  </AccentCard>
                </li>
              )
            })}
          </ul>
        </PageSection>
      )}

      <FaqIndented heading="Pertanyaan umum" items={solution.faqs ?? []} />
    </>
  )
}
