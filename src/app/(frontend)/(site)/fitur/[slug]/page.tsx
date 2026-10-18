import type { Metadata } from 'next'
import Link from 'next/link'
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
        sentence={feature.heroDescription}
        note={feature.status === FEATURE_STATUS.AVAILABLE ? undefined : FEATURE_STATUS_LABEL[feature.status]}
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      {benefits.length > 0 && (
        <section className="wrap grid12 gap-y-12 py-14 md:py-24" aria-label="Manfaat utama">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id ?? benefit.title}
              data-reveal
              style={{ '--i': index } as React.CSSProperties}
              className={[
                'col-span-12 lg:col-span-4',
                index === 1 ? 'lg:mt-16' : '',
                index === 2 ? 'lg:mt-32' : '',
              ].join(' ')}
            >
              <h2 className="t-statement font-bold">{benefit.title}</h2>
              <p className="mt-3 max-w-[34ch]">{benefit.description}</p>
            </div>
          ))}
        </section>
      )}

      {blocks.map((block, index) => (
        <section key={block.id ?? block.title} className="wrap grid12 gap-y-10 py-14 md:py-24" aria-label={block.title}>
          <h2 data-reveal className="t-head col-span-12 max-w-[18ch] lg:col-span-5">
            {block.title}
          </h2>
          <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="max-w-[52ch]">{block.description}</p>
            <ul className="mt-6 space-y-2">
              {(block.points ?? []).map((point) => (
                <li key={point.id ?? point.text} className="font-semibold">
                  {point.text}
                </li>
              ))}
            </ul>
            {index === 0 && (
              <div className="mt-10">
                <FeatureMock mock={feature.mock} />
              </div>
            )}
          </div>
        </section>
      ))}

      <FaqIndented heading="Pertanyaan umum" items={feature.faqs ?? []} />

      {related.length > 0 && (
        <section className="wrap grid12 py-14 md:py-24" aria-label="Fitur terkait">
          <h2 data-reveal className="t-head col-span-12 lg:col-span-4">
            Fitur terkait
          </h2>
          <ul className="col-span-12 mt-6 space-y-4 lg:col-span-8 lg:mt-0">
            {related.map((item) => (
              <li key={item.id} data-reveal>
                <Link href={`/fitur/${item.slug}`} className="group block">
                  <span className="t-statement block font-bold group-hover:text-accent">{item.name}</span>
                  <span className="block">{item.shortDescription}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
