import { BoardVisual } from '@/features/site/visuals/board-visual'
import { BellBadge } from '@/features/home/components/accessories'
import { SECTION_TAGS } from '@/features/home/content/tones'
import { PageSection } from '@/features/site/components/page-section'
import { AccentCard } from '@/features/site/components/accent-card'
import type { Metadata } from 'next'

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
        visual={
          <BoardVisual
            boardClassName="bg-tint-peach"
            accessory={<BellBadge />}
            cards={features.slice(0, 6).map((feature) => ({ title: feature.name, subtitle: feature.status === FEATURE_STATUS.AVAILABLE ? undefined : FEATURE_STATUS_LABEL[feature.status], line: feature.shortDescription }))}
          />
        }
        title="Semua yang dikerjakan aplikasi"
        tag={SECTION_TAGS.modules}
        sentence="Yang sudah berjalan ditandai jelas. Yang masih rencana kami sebut rencana."
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      {FEATURE_CATEGORY_ORDER.map((categoryId, groupIndex) => {
        const items = features.filter((feature) => feature.category === categoryId)

        if (items.length === 0) return null

        return (
          <PageSection
            key={categoryId}
            title={FEATURE_CATEGORY_LABEL[categoryId]}
            description={FEATURE_CATEGORY_DESCRIPTION[categoryId]}
            bandClassName={groupIndex % 2 === 1 ? 'bg-tint-sky' : undefined}
          >
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((feature, index) => (
                <li key={feature.id}>
                  <AccentCard
                    index={index}
                    title={feature.name}
                    description={feature.shortDescription}
                    href={`/fitur/${feature.slug}`}
                    badge={feature.status === FEATURE_STATUS.AVAILABLE ? undefined : FEATURE_STATUS_LABEL[feature.status]}
                  />
                </li>
              ))}
            </ul>
          </PageSection>
        )
      })}
    </>
  )
}
