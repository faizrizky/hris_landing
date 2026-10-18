import type { Metadata } from 'next'
import Link from 'next/link'

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
        title="Kalkulator HR gratis."
        sentence="Hitungan cepat untuk urusan yang sering ditanyakan, lengkap dengan dasar aturannya."
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      <section className="wrap py-10 md:py-16" aria-label="Daftar kalkulator">
        <ul className="grid12 gap-y-8">
          {CALCULATORS.map((calculator, index) => (
            <li
              key={calculator.slug}
              data-reveal
              style={{ '--i': Math.min(index, 4) } as React.CSSProperties}
              className="col-span-12 lg:col-span-8 lg:col-start-5"
            >
              <Link href={`/tools/${calculator.slug}`} className="group block">
                <span className="t-statement block font-bold group-hover:text-accent">{calculator.title}</span>
                <span className="mt-1 block text-ink-soft">{calculator.summary}</span>
              </Link>
            </li>
          ))}
          {UPCOMING_CALCULATORS.map((calculator) => (
            <li key={calculator.slug} data-reveal className="col-span-12 text-ink-soft lg:col-span-8 lg:col-start-5">
              <span className="t-statement block font-bold">{calculator.title}</span>
              <span className="mt-1 block">{calculator.summary}</span>
              <span className="mt-1 block font-semibold">Segera hadir</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
