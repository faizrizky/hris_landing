import { SECTION_TAGS } from '@/features/home/content/tones'
import { PageSection } from '@/features/site/components/page-section'
import { AccentCard } from '@/features/site/components/accent-card'
import type { Metadata } from 'next'

import { getSolutionSummaries } from '@/features/cms/loaders'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { PageIntro } from '@/features/site/components/page-intro'
import { DEMO_HREF, SOLUTION_TYPE, SOLUTION_TYPE_LABEL, type SolutionTypeId } from '@/features/site/content/labels'

export const metadata: Metadata = {
  title: 'Solusi',
  description: 'HRIS untuk berbagai industri dan skala bisnis: logistik, retail, F&B, manufaktur, healthcare, dan lainnya.',
}

const GROUP_ORDER: SolutionTypeId[] = [SOLUTION_TYPE.INDUSTRY, SOLUTION_TYPE.SCALE]

export default async function SolutionsPage() {
  const result = await getSolutionSummaries()

  if (!result.isOk) return <ContentUnavailable message={result.message} />

  return (
    <>
      <PageIntro
        title="Untuk berbagai jenis usaha"
        tag={SECTION_TAGS.industries}
        sentence="Alur kerja tiap industri berbeda. Pilih yang paling mirip dengan tempatmu."
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      {GROUP_ORDER.map((typeId, groupIndex) => {
        const items = result.data.filter((solution) => solution.type === typeId)

        if (items.length === 0) return null

        return (
          <PageSection
            key={typeId}
            title={SOLUTION_TYPE_LABEL[typeId]}
            bandClassName={groupIndex % 2 === 1 ? 'bg-tint-sky' : undefined}
          >
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((solution, index) => (
                <li key={solution.id}>
                  <AccentCard
                    index={index}
                    title={solution.name}
                    description={solution.tagline}
                    href={`/solusi/${solution.slug}`}
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
