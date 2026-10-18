import type {
  AboutPage,
  Feature,
  Home,
  Page,
  PageCopy,
  PricingPage,
  SiteSetting,
  Solution,
  Testimonial,
} from '@/payload-types'
import { cmsClient } from '@/utilities/cms-client'

import { loadSafely, type LoadResult } from './load-result'

const MAX_DOCS = 200
const RELATION_DEPTH = 1

export type FeatureSummary = Pick<
  Feature,
  'id' | 'name' | 'slug' | 'shortDescription' | 'category' | 'status' | 'order'
>
export type SolutionSummary = Pick<Solution, 'id' | 'name' | 'slug' | 'tagline' | 'type' | 'order'>

export const getSiteSettings = (): Promise<LoadResult<SiteSetting>> =>
  loadSafely('pengaturan situs', () => cmsClient.findGlobal({ slug: 'site-settings' }))

export const getHome = (): Promise<LoadResult<Home>> =>
  loadSafely('beranda', () => cmsClient.findGlobal({ slug: 'home' }))

export const getPageCopy = (): Promise<LoadResult<PageCopy>> =>
  loadSafely('teks halaman', () => cmsClient.findGlobal({ slug: 'page-copy' }))

export const getPricingPage = (): Promise<LoadResult<PricingPage>> =>
  loadSafely('halaman harga', () => cmsClient.findGlobal({ slug: 'pricing-page' }))

export const getAboutPage = (): Promise<LoadResult<AboutPage>> =>
  loadSafely('halaman tentang', () => cmsClient.findGlobal({ slug: 'about-page' }))

export const getFeatureSummaries = (): Promise<LoadResult<FeatureSummary[]>> =>
  loadSafely('daftar fitur', async () => {
    const { docs } = await cmsClient.find({
      collection: 'features',
      depth: 0,
      limit: MAX_DOCS,
      pagination: false,
      sort: 'order',
      select: { name: true, slug: true, shortDescription: true, category: true, status: true, order: true },
    })

    return docs as FeatureSummary[]
  })

export const getFeatureBySlug = (slug: string): Promise<LoadResult<Feature | null>> =>
  loadSafely(`fitur ${slug}`, async () => {
    const { docs } = await cmsClient.find({
      collection: 'features',
      depth: RELATION_DEPTH,
      limit: 1,
      where: { slug: { equals: slug } },
    })

    return docs[0] ?? null
  })

export const getSolutionSummaries = (): Promise<LoadResult<SolutionSummary[]>> =>
  loadSafely('daftar solusi', async () => {
    const { docs } = await cmsClient.find({
      collection: 'solutions',
      depth: 0,
      limit: MAX_DOCS,
      pagination: false,
      sort: 'order',
      select: { name: true, slug: true, tagline: true, type: true, order: true },
    })

    return docs as SolutionSummary[]
  })

export const getHomeSolutions = (): Promise<LoadResult<Solution[]>> =>
  loadSafely('solusi beranda', async () => {
    const { docs } = await cmsClient.find({
      collection: 'solutions',
      depth: RELATION_DEPTH,
      limit: MAX_DOCS,
      pagination: false,
      sort: 'order',
      where: { showOnHome: { equals: true } },
    })

    return docs
  })

export const getSolutionBySlug = (slug: string): Promise<LoadResult<Solution | null>> =>
  loadSafely(`solusi ${slug}`, async () => {
    const { docs } = await cmsClient.find({
      collection: 'solutions',
      depth: RELATION_DEPTH,
      limit: 1,
      where: { slug: { equals: slug } },
    })

    return docs[0] ?? null
  })

/** Hanya testimoni asli yang ditampilkan; contoh sementara tidak pernah sampai ke pengunjung. */
export const getRealTestimonials = (): Promise<LoadResult<Testimonial[]>> =>
  loadSafely('testimoni', async () => {
    const { docs } = await cmsClient.find({
      collection: 'testimonials',
      depth: 0,
      limit: MAX_DOCS,
      pagination: false,
      sort: 'order',
      where: { isPlaceholder: { equals: false } },
    })

    return docs
  })

export const getPageBySlug = (slug: string, isDraft = false): Promise<LoadResult<Page | null>> =>
  loadSafely(`halaman ${slug}`, async () => {
    const { docs } = await cmsClient.find({
      collection: 'pages',
      depth: RELATION_DEPTH,
      draft: isDraft,
      limit: 1,
      where: { slug: { equals: slug } },
    })

    return docs[0] ?? null
  })

export const getPageSlugs = (): Promise<LoadResult<string[]>> =>
  loadSafely('daftar halaman', async () => {
    const { docs } = await cmsClient.find({
      collection: 'pages',
      depth: 0,
      limit: MAX_DOCS,
      pagination: false,
      select: { slug: true },
    })

    return docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug))
  })
