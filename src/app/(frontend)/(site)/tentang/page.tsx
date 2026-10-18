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
      <PageIntro title={page.heading} action={{ label: 'Minta demo', href: DEMO_HREF }} />

      <section className="wrap grid12 gap-y-10 py-14 md:py-20" aria-label="Cerita">
        <p data-reveal className="t-statement col-span-12 max-w-[30ch] lg:col-span-5">
          {page.statement}
        </p>
        <div className="col-span-12 space-y-5 lg:col-span-6 lg:col-start-7">
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph.id ?? index} data-reveal style={{ '--i': index } as React.CSSProperties} className="max-w-[56ch]">
              {paragraph.text}
            </p>
          ))}
        </div>
      </section>

      {principles.length > 0 && (
        <section className="bg-paper-2 py-16 md:py-24" aria-label="Prinsip">
          <ul className="wrap grid12 gap-y-10">
            {principles.map((principle, index) => (
              <li
                key={principle.id ?? principle.title}
                data-reveal
                style={{ '--i': index } as React.CSSProperties}
                className="col-span-12 lg:col-span-4"
              >
                <h2 className="t-statement font-bold">{principle.title}</h2>
                <p className="mt-2 max-w-[34ch]">{principle.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
