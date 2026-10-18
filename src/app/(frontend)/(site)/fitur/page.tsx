import type { Metadata } from 'next'
import Link from 'next/link'

import { getFeatureSummaries } from '@/features/cms/loaders'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { PageIntro } from '@/features/site/components/page-intro'
import {
  DEMO_HREF,
  FEATURE_CATEGORY_DESCRIPTION,
  FEATURE_CATEGORY_LABEL,
  FEATURE_CATEGORY_ORDER,
  FEATURE_STATUS,
  FEATURE_STATUS_LABEL,
} from '@/features/site/content/labels'

export const metadata: Metadata = {
  title: 'Fitur',
  description: 'Semua yang dikerjakan aplikasi HRIS: absensi, pengajuan, approval, slip gaji, dokumen, dan keamanan.',
}

export default async function FeaturesPage() {
  const result = await getFeatureSummaries()

  if (!result.isOk) return <ContentUnavailable message={result.message} />

  const features = result.data

  return (
    <>
      <PageIntro
        title="Semua yang dikerjakan aplikasi."
        sentence="Yang sudah berjalan ditandai jelas. Yang masih rencana kami sebut rencana."
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      {FEATURE_CATEGORY_ORDER.map((categoryId) => {
        const items = features.filter((feature) => feature.category === categoryId)

        if (items.length === 0) return null

        return (
          <section key={categoryId} className="wrap grid12 py-14 md:py-20" aria-label={FEATURE_CATEGORY_LABEL[categoryId]}>
            <div data-reveal className="col-span-12 lg:col-span-4">
              <h2 className="t-head">{FEATURE_CATEGORY_LABEL[categoryId]}</h2>
              <p className="mt-3 max-w-[32ch]">{FEATURE_CATEGORY_DESCRIPTION[categoryId]}</p>
            </div>
            <ul className="col-span-12 mt-8 space-y-6 lg:col-span-8 lg:mt-0">
              {items.map((feature, index) => (
                <li key={feature.id} data-reveal style={{ '--i': Math.min(index, 4) } as React.CSSProperties}>
                  <Link href={`/fitur/${feature.slug}`} className="group block">
                    <span className="t-statement block font-bold group-hover:text-accent">{feature.name}</span>
                    <span className="mt-1 block max-w-[52ch]">{feature.shortDescription}</span>
                    {feature.status !== FEATURE_STATUS.AVAILABLE && (
                      <span className="mt-1 block font-semibold">{FEATURE_STATUS_LABEL[feature.status]}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </>
  )
}
