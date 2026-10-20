import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { getPage, getPageSlugs, getSiteData } from '@/lib/cms/queries'
import { mediaUrl } from '@/lib/cms/media'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

const HOME_SLUG = 'home'

type Params = { slug?: string[] }

/** "/" → home; "/tentang" → tentang; path bersarang bukan halaman CMS. */
function resolveSlug(segments: string[] | undefined): string | null {
  if (!segments?.length) return HOME_SLUG
  if (segments.length > 1 || segments[0] === HOME_SLUG) return null
  return segments[0]
}

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getPageSlugs()

  return slugs.map((slug) => ({ slug: slug === HOME_SLUG ? [] : [slug] }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const slug = resolveSlug((await params).slug)

  if (!slug) return {}

  const page = await getPage(slug, defaultLocale)

  if (!page) return {}

  const isHome = slug === HOME_SLUG
  const title = isHome ? page.meta?.title : page.meta?.title || page.title
  const image = mediaUrl(page.meta?.image)

  return {
    title: isHome && !title ? { absolute: page.title } : title,
    description: page.meta?.description ?? undefined,
    openGraph: image ? { images: [image] } : undefined,
  }
}

export default async function CmsPage({ params }: { params: Promise<Params> }) {
  const slug = resolveSlug((await params).slug)

  if (!slug) notFound()

  const [page, data] = await Promise.all([getPage(slug, defaultLocale), getSiteData(defaultLocale)])

  if (!page) {
    return slug === HOME_SLUG ? <ContentUnavailable message="Halaman beranda belum bisa dimuat dari CMS." /> : notFound()
  }

  return <RenderBlocks blocks={page.layout} ctx={{ locale: defaultLocale, t: getDictionary(defaultLocale), data }} />
}
