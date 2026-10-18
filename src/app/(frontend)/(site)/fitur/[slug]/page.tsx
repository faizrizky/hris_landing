import { Check } from 'lucide-react'
import { SECTION_TAGS } from '@/features/home/content/tones'
import { PageSection } from '@/features/site/components/page-section'
import { AccentCard } from '@/features/site/components/accent-card'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { getFeatureBySlug, getFeatureSummaries } from '@/features/cms/loaders'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { FaqIndented } from '@/features/site/components/faq-indented'
import { FeatureMock } from '@/features/site/components/feature-mock'
import { PageIntro } from '@/features/site/components/page-intro'
import { DEMO_HREF, FEATURE_STATUS, FEATURE_STATUS_LABEL } from '@/features/site/content/labels'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const result = await getFeatureSummaries()

  return result.isOk ? result.data.map((feature) => ({ slug: feature.slug })) : []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const result = await getFeatureBySlug(slug)

  if (!result.isOk || !result.data) return {}

  return { title: result.data.name, description: result.data.heroDescription }
}

export default async function FeaturePage({ params }: Args) {
  const { slug } = await params
  const result = await getFeatureBySlug(slug)

  if (!result.isOk) return <ContentUnavailable message={result.message} />
  if (!result.data) return notFound()

  const feature = result.data
  const benefits = feature.benefits ?? []
  const blocks = feature.blocks ?? []
  const related = (feature.related ?? []).filter((item): item is Exclude<typeof item, number> => typeof item === 'object')

  return (
    <>
      <PageIntro
        title={feature.heroTitle}
        tag={SECTION_TAGS.modules}
        sentence={feature.heroDescription}
        note={feature.status === FEATURE_STATUS.AVAILABLE ? undefined : FEATURE_STATUS_LABEL[feature.status]}
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      {benefits.length > 0 && (
        <PageSection title="Manfaat utama" ariaLabel="Manfaat utama">
          <ul className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <li key={benefit.id ?? benefit.title}>
                <AccentCard index={index} title={benefit.title} description={benefit.description} />
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      {blocks.map((block, index) => (
        <PageSection key={block.id ?? block.title} bandClassName={index % 2 === 0 ? 'bg-tint-sky' : undefined} ariaLabel={block.title}>
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <h2 data-reveal className="text-3xl font-extrabold leading-tight md:text-4xl">
                {block.title}
              </h2>
              <p data-reveal className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
                {block.description}
              </p>
              <ul className="mt-6 space-y-2">
                {(block.points ?? []).map((point) => (
                  <li key={point.id ?? point.text} data-reveal className="flex items-start gap-2 text-sm">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" />
                    {point.text}
                  </li>
                ))}
              </ul>
            </div>
            {index === 0 && <FeatureMock mock={feature.mock} />}
          </div>
        </PageSection>
      ))}

      <FaqIndented heading="Pertanyaan umum" items={feature.faqs ?? []} />

      {related.length > 0 && (
        <PageSection title="Fitur terkait" bandClassName="bg-tint-lavender">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <li key={item.id}>
                <AccentCard index={index} title={item.name} description={item.shortDescription} href={`/fitur/${item.slug}`} />
              </li>
            ))}
          </ul>
        </PageSection>
      )}
    </>
  )
}
