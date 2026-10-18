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

  return (
    <>
      <PageIntro title={page.heading} sentence={page.statement} action={{ label: 'Minta demo', href: DEMO_HREF }} />

      <PageSection title="Cerita kami">
        <div className="max-w-2xl space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph.id ?? index} data-reveal className="text-sm leading-relaxed text-ink-muted">
              {paragraph.text}
            </p>
          ))}
        </div>
      </PageSection>

      {principles.length > 0 && (
        <PageSection title="Prinsip kami" bandClassName="bg-tint-lavender">
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
