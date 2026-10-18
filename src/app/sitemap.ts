import type { MetadataRoute } from 'next'

import {
  getFeatureSummaries,
  getPageSlugs,
  getSolutionSummaries,
} from '@/features/cms/loaders'
import { TOOL_SLUGS } from '@/features/tools/tool-slugs'
import { getServerSideURL } from '@/utilities/getURL'

const STATIC_PATHS = ['/', '/fitur', '/solusi', '/harga', '/tools', '/tentang', '/demo'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL()
  const [features, solutions, pages] = await Promise.all([
    getFeatureSummaries(),
    getSolutionSummaries(),
    getPageSlugs(),
  ])

  const paths = [
    ...STATIC_PATHS,
    ...(features.isOk ? features.data.map((feature) => `/fitur/${feature.slug}`) : []),
    ...(solutions.isOk ? solutions.data.map((solution) => `/solusi/${solution.slug}`) : []),
    ...TOOL_SLUGS.map((slug) => `/tools/${slug}`),
    ...(pages.isOk ? pages.data.map((slug) => `/${slug}`) : []),
  ]

  return paths.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() }))
}
