import type { Metadata } from 'next'
import Link from 'next/link'

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

  return (
    <>
      <PageIntro
        title="Untuk berbagai jenis usaha."
        sentence="Alur kerja tiap industri berbeda. Pilih yang paling mirip dengan tempatmu."
        action={{ label: 'Minta demo', href: DEMO_HREF }}
      />

      {GROUP_ORDER.map((typeId) => {
        const items = result.data.filter((solution) => solution.type === typeId)

        if (items.length === 0) return null

        return (
          <section key={typeId} className="wrap grid12 py-14 md:py-20" aria-label={SOLUTION_TYPE_LABEL[typeId]}>
            <h2 data-reveal className="t-head col-span-12 lg:col-span-4">
              {SOLUTION_TYPE_LABEL[typeId]}
            </h2>
            <ul className="col-span-12 mt-8 space-y-6 lg:col-span-8 lg:mt-0">
              {items.map((solution, index) => (
                <li key={solution.id} data-reveal style={{ '--i': Math.min(index, 4) } as React.CSSProperties}>
                  <Link href={`/solusi/${solution.slug}`} className="group block">
                    <span className="t-statement block font-bold group-hover:text-accent">{solution.name}</span>
                    <span className="mt-1 block max-w-[52ch]">{solution.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </>
  )
}
