import type { Metadata } from 'next'

import { getFeatureSummaries, getHome, getHomeSolutions, getRealTestimonials, getSiteSettings } from '@/features/cms/loaders'
import { HomePage as HomeContent } from '@/features/home/components/home-page'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getSiteSettings()

  if (!settings.isOk) return {}

  return {
    title: { absolute: settings.data.seoTitle ?? settings.data.brandName },
    description: settings.data.seoDescription ?? undefined,
  }
}

export default async function HomePage() {
  const [homeResult, featuresResult, solutionsResult, testimonialsResult] = await Promise.all([
    getHome(),
    getFeatureSummaries(),
    getHomeSolutions(),
    getRealTestimonials(),
  ])

  if (!homeResult.isOk) return <ContentUnavailable message={homeResult.message} />

  return (
    <HomeContent
      home={homeResult.data}
      features={featuresResult.isOk ? featuresResult.data : []}
      solutions={solutionsResult.isOk ? solutionsResult.data : []}
      testimonials={testimonialsResult.isOk ? testimonialsResult.data : []}
    />
  )
}
