import { getPageCopy } from '@/features/cms/loaders'
import { buildSectionTags } from '@/features/home/content/tones'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { CalculatorBadge } from '@/features/site/visuals/badge-sets'
import { PanelVisual } from '@/features/site/visuals/panel-visual'
import { BoardVisual } from '@/features/site/visuals/board-visual'
import { PageSection } from '@/features/site/components/page-section'
import { AccentCard } from '@/features/site/components/accent-card'
import type { Metadata } from 'next'

import { PageIntro } from '@/features/site/components/page-intro'
import { DEMO_HREF } from '@/features/site/content/labels'
import { CALCULATORS, UPCOMING_CALCULATORS } from '@/features/tools/registry'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Kalkulator HR gratis: upah lembur, THR, pesangon, kompensasi PKWT, cuti proporsional, bonus, dan lainnya.',
}

export default async function ToolsPage() {
  const copyResult = await getPageCopy()

  if (!copyResult.isOk) return <ContentUnavailable message={copyResult.message} />

  const copy = copyResult.data
  const tags = buildSectionTags(copy)

  return (
    <>
      <PageIntro
        visual={
          <BoardVisual
            boardClassName="bg-tint-sky"
            accessory={<CalculatorBadge />}
            cards={CALCULATORS.slice(0, 6).map((calculator) => ({ title: calculator.title, line: calculator.summary }))}
          />
        }
        title={copy.toolsHeading}
        tag={tags.modules}
        sentence={copy.toolsSentence}
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      <PageSection
        title={copy.toolsListTitle}
        visual={
          <PanelVisual
            panelClassName="bg-tint-lavender"
            badge={<CalculatorBadge />}
            chips={CALCULATORS.map((calculator) => calculator.title)}
          />
        }
      >
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((calculator, index) => (
            <li key={calculator.slug}>
              <AccentCard
                index={index}
                title={calculator.title}
                description={calculator.summary}
                href={`/tools/${calculator.slug}`}
              />
            </li>
          ))}
          {UPCOMING_CALCULATORS.map((calculator, index) => (
            <li key={calculator.slug} className="opacity-80">
              <AccentCard
                index={CALCULATORS.length + index}
                title={calculator.title}
                description={calculator.summary}
                badge="Segera hadir"
              />
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  )
}
