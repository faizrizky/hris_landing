import { CalendarBadge, ChartBadge } from '@/features/site/visuals/badge-sets'
import { PhoneVisual } from '@/features/site/visuals/phone-visual'
import { PanelVisual } from '@/features/site/visuals/panel-visual'
import { OfferVisual } from '@/features/site/visuals/offer-visual'
import { PillLink } from '@/features/home/components/pill-link'
import { Check } from 'lucide-react'
import { SECTION_TAGS } from '@/features/home/content/tones'
import { PageSection } from '@/features/site/components/page-section'
import { AccentCard } from '@/features/site/components/accent-card'
import type { Metadata } from 'next'

import { getPricingPage } from '@/features/cms/loaders'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { FaqIndented } from '@/features/site/components/faq-indented'
import { PageIntro } from '@/features/site/components/page-intro'
import { DEMO_HREF } from '@/features/site/content/labels'

export const metadata: Metadata = {
  title: 'Harga',
  description: 'Harga HRIS mengikuti jumlah karyawan dan modul yang dipakai. Minta penawaran setelah demo 30 menit.',
}

export default async function PricingPage() {
  const result = await getPricingPage()

  if (!result.isOk) return <ContentUnavailable message={result.message} />

  const page = result.data
  const steps = page.steps ?? []
  const included = page.included ?? []

  return (
    <>
      <PageIntro
        visual={
          <OfferVisual title={page.heading} steps={steps.map((step) => step.title)} />
        }
        title={page.heading}
        tag={SECTION_TAGS.pricing}
        sentence={page.intro}
        action={{ label: page.action, href: DEMO_HREF }}
      />

      <PageSection
        title="Cara kami menyusun penawaran"
        visual={
          <PanelVisual
            panelClassName="bg-tint-sky"
            badge={<CalendarBadge />}
            chips={steps.map((step) => step.title)}
          />
        }
      >
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.id ?? step.title}>
              <AccentCard index={index} title={`${index + 1}. ${step.title}`} description={step.description} />
            </li>
          ))}
        </ol>
      </PageSection>

      {included.length > 0 && (
        <PageSection
          title="Yang termasuk"
          bandClassName="bg-tint-lavender"
          visualSide="left"
          visual={
            <PhoneVisual
              tone="sky"
              title="Yang termasuk"
              accessory={<ChartBadge />}
              rows={included.map((item) => ({ title: item.text }))}
            />
          }
        >
          <div data-reveal className="max-w-2xl rounded-3xl bg-white p-8 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)]">
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item.id ?? item.text} className="flex items-center gap-3 text-sm">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-teal/25">
                    <Check aria-hidden className="h-3 w-3" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PillLink href={DEMO_HREF}>{page.action}</PillLink>
            </div>
          </div>
        </PageSection>
      )}

      <FaqIndented heading="Pertanyaan umum" items={page.faqs ?? []} />
    </>
  )
}
