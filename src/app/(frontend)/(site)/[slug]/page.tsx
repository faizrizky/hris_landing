import { ShieldVisual } from '@/features/site/visuals/shield-visual'
import { PageIntro } from '@/features/site/components/page-intro'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { getPageBySlug, getPageSlugs } from '@/features/cms/loaders'
import { redirectIfConfigured } from '@/features/cms/redirects'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import RichText from '@/components/RichText'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getPageSlugs()

  return slugs.isOk ? slugs.data.map((slug) => ({ slug })) : []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(decodeURIComponent(slug))

  if (!page.isOk || !page.data) return {}

  return {
    title: page.data.meta?.title ?? page.data.title,
    description: page.data.meta?.description ?? undefined,
  }
}

/** Halaman bebas dari CMS (mis. privasi dan syarat ketentuan): judul besar, lalu teks. */
export default async function CmsPage({ params }: Args) {
  const { isEnabled: isDraft } = await draftMode()
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const result = await getPageBySlug(decodedSlug, isDraft)

  if (!result.isOk) return <ContentUnavailable message={result.message} />

  const page = result.data

  if (!page) {
    await redirectIfConfigured(`/${decodedSlug}`)
    return notFound()
  }

  const columns = (page.layout ?? []).flatMap((block) => block.columns ?? [])

  return (
    <>
      {isDraft && <LivePreviewListener />}
      <PageIntro
        visual={<ShieldVisual />}
        title={page.title}
      />
      <article className="container pb-20">
        {columns.map((column) =>
          column.richText ? (
            <div key={column.id ?? column.size} className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.35)] md:p-10">
              <RichText data={column.richText} />
            </div>
          ) : null,
        )}
      </article>
    </>
  )
}
