import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SolutionDetail } from '@/components/blocks/SolutionDetail'
import { getSolution, getSolutions } from '@/lib/cms/queries'
import { mediaUrl } from '@/lib/cms/media'
import { defaultLocale } from '@/lib/i18n/config'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const solutions = await getSolutions(defaultLocale)

  return solutions.map((solution) => ({ slug: solution.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const solution = await getSolution((await params).slug, defaultLocale)

  if (!solution) return {}

  const image = mediaUrl(solution.meta?.image)

  return {
    title: solution.meta?.title || `HRIS untuk ${solution.name}`,
    description: solution.meta?.description || solution.tagline,
    openGraph: image ? { images: [image] } : undefined,
  }
}

export default async function SolutionPage({ params }: Args) {
  const solution = await getSolution((await params).slug, defaultLocale)

  if (!solution) notFound()

  return <SolutionDetail solution={solution} />
}
