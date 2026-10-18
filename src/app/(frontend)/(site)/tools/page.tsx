import { CalculatorBadge } from '@/features/site/visuals/badge-sets'
import { PanelVisual } from '@/features/site/visuals/panel-visual'
import { BoardVisual } from '@/features/site/visuals/board-visual'
import { SECTION_TAGS } from '@/features/home/content/tones'
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

export default function ToolsPage() {
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
        title="Kalkulator HR gratis"
        tag={SECTION_TAGS.modules}
        sentence="Hitungan cepat untuk urusan yang sering ditanyakan, lengkap dengan dasar aturannya."
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      <PageSection
        title="Daftar kalkulator"
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
