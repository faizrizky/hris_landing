import type { MetadataRoute } from 'next'

import { getFeatures, getPagesForSitemap, getSolutions } from '@/lib/cms/queries'
import { defaultLocale } from '@/lib/i18n/config'
import { TOOL_SLUGS } from '@/features/tools/tool-slugs'
import { getServerSideURL } from '@/utilities/getURL'

const HOME_SLUG = 'home'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL()
  const [pages, features, solutions] = await Promise.all([
    getPagesForSitemap(),
    getFeatures(defaultLocale),
    getSolutions(defaultLocale),
  ])

  const entries = [
    ...pages.map((page) => ({
      path: page.slug === HOME_SLUG ? '/' : `/${page.slug}`,
      lastModified: new Date(page.updatedAt),
    })),
    ...features.map((feature) => ({ path: `/fitur/${feature.slug}`, lastModified: new Date(feature.updatedAt) })),
    ...solutions.map((solution) => ({ path: `/solusi/${solution.slug}`, lastModified: new Date(solution.updatedAt) })),
    ...TOOL_SLUGS.map((slug) => ({ path: `/tools/${slug}`, lastModified: new Date() })),
  ]

  return entries.map(({ path, lastModified }) => ({ url: `${baseUrl}${path}`, lastModified }))
}
