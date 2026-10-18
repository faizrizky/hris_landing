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
    <article className="wrap grid12 pb-[calc(var(--section)/2)] pt-32 md:pt-44">
      {isDraft && <LivePreviewListener />}
      <h1 data-rise className="t-big col-span-12 max-w-[14ch] md:col-span-9">
        {page.title}
      </h1>
      <div className="col-span-12 mt-14 md:col-span-7 md:col-start-5">
        {columns.map((column) =>
          column.richText ? <RichText key={column.id ?? column.size} data={column.richText} /> : null,
        )}
      </div>
    </article>
  )
}
