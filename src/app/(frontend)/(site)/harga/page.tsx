import type { Metadata } from 'next'
import Link from 'next/link'

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
      <PageIntro title={page.heading} sentence={page.intro} action={{ label: page.action, href: DEMO_HREF }} />

      <section className="wrap grid12 gap-y-10 py-16 md:py-24" aria-label="Cara kami menyusun penawaran">
        <h2 data-reveal className="t-head col-span-12 max-w-[14ch] lg:col-span-4">
          Cara kami menyusun penawaran
        </h2>
        <ol className="col-span-12 space-y-8 lg:col-span-7 lg:col-start-6">
          {steps.map((step, index) => (
            <li key={step.id ?? step.title} data-reveal style={{ '--i': index } as React.CSSProperties}>
              <p className="t-statement font-bold">{step.title}</p>
              <p className="mt-1 max-w-[46ch]">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {included.length > 0 && (
        <section className="bg-paper-2 py-16 md:py-24" aria-label="Yang termasuk">
          <div className="wrap grid12 gap-y-8">
            <h2 data-reveal className="t-head col-span-12 max-w-[14ch] lg:col-span-4">
              Yang termasuk
            </h2>
            <ul className="col-span-12 space-y-2 lg:col-span-7 lg:col-start-6">
              {included.map((item) => (
                <li key={item.id ?? item.text} data-reveal className="t-statement">
                  {item.text}
                </li>
              ))}
            </ul>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <Link href={DEMO_HREF} className="btn">
                {page.action}
              </Link>
            </div>
          </div>
        </section>
      )}

      <FaqIndented heading="Pertanyaan umum" items={page.faqs ?? []} />
    </>
  )
}
