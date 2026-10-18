import { getPageCopy } from '@/features/cms/loaders'
import { buildSectionTags } from '@/features/home/content/tones'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { PageSection } from '@/features/site/components/page-section'
import { ChatBadge } from '@/features/site/visuals/badge-sets'
import { PanelVisual } from '@/features/site/visuals/panel-visual'
import { PhoneVisual, type PhoneRow } from '@/features/site/visuals/phone-visual'
import { PageIntro } from '@/features/site/components/page-intro'
import type { Metadata } from 'next'
import React from 'react'

import { DemoForm } from '@/features/demo/demo-form'

export const metadata: Metadata = {
  title: 'Minta demo',
  description: 'Jadwalkan demo 30 menit HRIS. Ceritakan kebutuhanmu, kami hubungi lewat WhatsApp atau email.',
}

export default async function DemoPage() {
  const copyResult = await getPageCopy()

  if (!copyResult.isOk) return <ContentUnavailable message={copyResult.message} />

  const copy = copyResult.data
  const tags = buildSectionTags(copy)
  const demoAgenda: PhoneRow[] = (copy.demoAgenda ?? []).map((item) => ({ title: item.title, detail: item.detail }))

  return (
    <>
      <PageIntro
        visual={<PhoneVisual tone="lavender" title={copy.demoVisualTitle} accessory={<ChatBadge />} rows={demoAgenda} />}
        title={copy.demoHeading}
        tag={tags.attendance}
        sentence={copy.demoSentence}
      />
      <PageSection
        title={copy.demoFormTitle}
        description={copy.demoFormDescription}
        visual={
          <PanelVisual
            panelClassName="bg-tint-peach"
            badge={<ChatBadge />}
            chips={demoAgenda.map((item) => item.title)}
          />
        }
      >
        <div className="max-w-2xl rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)] md:p-10">
          <DemoForm />
        </div>
      </PageSection>
    </>
  )
}
