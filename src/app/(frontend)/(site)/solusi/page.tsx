import { getPageCopy } from '@/features/cms/loaders'
import { buildSectionTags } from '@/features/home/content/tones'
import { ChartBadge, UsersBadge } from '@/features/site/visuals/badge-sets'
import { PanelVisual } from '@/features/site/visuals/panel-visual'
import { BoardVisual } from '@/features/site/visuals/board-visual'
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

  const copyResult = await getPageCopy()

  if (!copyResult.isOk) return <ContentUnavailable message={copyResult.message} />

  const copy = copyResult.data
  const tags = buildSectionTags(copy)

  return (
    <>
      <PageIntro
        visual={
          <BoardVisual
            boardClassName="bg-tint-lavender"
            accessory={<UsersBadge />}
            cards={result.data.slice(0, 6).map((solution) => ({ title: solution.name, line: solution.tagline }))}
          />
        }
        title={copy.solutionsHeading}
        tag={tags.industries}
        sentence={copy.solutionsSentence}
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
            visualSide={groupIndex % 2 === 1 ? 'left' : 'right'}
            visual={
              <PanelVisual
                panelClassName={groupIndex % 2 === 1 ? 'bg-tint-peach' : 'bg-tint-lavender'}
                badge={groupIndex % 2 === 1 ? <ChartBadge /> : <UsersBadge />}
                chips={items.map((solution) => solution.name)}
              />
            }
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
