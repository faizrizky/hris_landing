import { getPageCopy } from '@/features/cms/loaders'
import { UsersBadge, ChatBadge } from '@/features/site/visuals/badge-sets'
import { PhoneVisual } from '@/features/site/visuals/phone-visual'
import { PanelVisual } from '@/features/site/visuals/panel-visual'
import { TiltedCardsVisual } from '@/features/site/visuals/tilted-cards-visual'
import { PageSection } from '@/features/site/components/page-section'
import { AccentCard } from '@/features/site/components/accent-card'
import type { Metadata } from 'next'
import React from 'react'

import { getAboutPage } from '@/features/cms/loaders'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { PageIntro } from '@/features/site/components/page-intro'
import { DEMO_HREF } from '@/features/site/content/labels'

export const metadata: Metadata = {
  title: 'Tentang',
  description: 'HRIS dibuat supaya absen, cuti, lembur, dan slip gaji tidak lagi menyita waktu HR.',
}

export default async function AboutPage() {
  const result = await getAboutPage()

  if (!result.isOk) return <ContentUnavailable message={result.message} />

  const page = result.data
  const paragraphs = page.paragraphs ?? []
  const principles = page.principles ?? []

  const copyResult = await getPageCopy()

  if (!copyResult.isOk) return <ContentUnavailable message={copyResult.message} />

  const copy = copyResult.data

  return (
    <>
      <PageIntro
        visual={
          <TiltedCardsVisual cards={principles.map((principle) => ({ title: principle.title, description: principle.description }))} />
        }
        title={page.heading} sentence={page.statement} action={{ label: 'Minta demo', href: DEMO_HREF }} />

      <PageSection
        title={copy.aboutStoryTitle}
        visual={
          <PanelVisual
            panelClassName="bg-tint-peach"
            badge={<UsersBadge />}
            chips={principles.map((principle) => principle.title)}
          />
        }
      >
        <div className="max-w-2xl space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph.id ?? index} data-reveal className="text-sm leading-relaxed text-ink-muted">
              {paragraph.text}
            </p>
          ))}
        </div>
      </PageSection>

      {principles.length > 0 && (
        <PageSection
          title={copy.aboutPrinciplesTitle}
          bandClassName="bg-tint-lavender"
          visualSide="left"
          visual={
            <PhoneVisual
              tone="lavender"
              title={copy.aboutPrinciplesTitle}
              accessory={<ChatBadge />}
              rows={principles.map((principle) => ({ title: principle.title }))}
            />
          }
        >
          <ul className="grid gap-5 md:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.id ?? principle.title}>
                <AccentCard index={index} title={principle.title} description={principle.description} />
              </li>
            ))}
          </ul>
        </PageSection>
      )}
    </>
  )
}
