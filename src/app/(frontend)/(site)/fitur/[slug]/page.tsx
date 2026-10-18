import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { FeatureDetail } from '@/components/blocks/FeatureDetail'
import { getFeature, getFeatures } from '@/lib/cms/queries'
import { mediaUrl } from '@/lib/cms/media'
import { defaultLocale } from '@/lib/i18n/config'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const features = await getFeatures(defaultLocale)

  return features.map((feature) => ({ slug: feature.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const feature = await getFeature((await params).slug, defaultLocale)

  if (!feature) return {}

  const image = mediaUrl(feature.meta?.image)

  return {
    title: feature.meta?.title || feature.name,
    description: feature.meta?.description || feature.shortDescription,
    openGraph: image ? { images: [image] } : undefined,
  }
}

export default async function FeaturePage({ params }: Args) {
  const feature = await getFeature((await params).slug, defaultLocale)

  if (!feature) notFound()

  return <FeatureDetail feature={feature} />
}
