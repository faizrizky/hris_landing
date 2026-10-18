import type { PaginatedDocs, PopulateType, SelectType, Where } from 'payload'
import { stringify } from 'qs-esm'

import type { Config } from '@/payload-types'

const DEFAULT_CMS_URL = 'http://localhost:3001'
const CMS_REVALIDATE_SECONDS = 60

type CollectionSlug = keyof Config['collections']
type GlobalSlug = keyof Config['globals']

export interface FindOptions<TSlug extends CollectionSlug> {
  collection: TSlug
  where?: Where
  depth?: number
  limit?: number
  page?: number
  pagination?: boolean
  sort?: string | string[]
  select?: SelectType
  populate?: PopulateType
  draft?: boolean
  /** Cache tag untuk revalidate on-demand dari CMS. */
  tags?: string[]
}

export interface FindGlobalOptions<TSlug extends GlobalSlug> {
  slug: TSlug
  depth?: number
  tags?: string[]
}

export class CmsRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
  ) {
    super(`CMS request failed with status ${status}: ${url}`)
    this.name = 'CmsRequestError'
  }
}

export const getCmsUrl = (): string => process.env.NEXT_PUBLIC_CMS_URL ?? DEFAULT_CMS_URL

const requestCms = async <TResponse>(path: string, tags?: string[]): Promise<TResponse> => {
  const url = `${getCmsUrl()}/api/${path}`
  const response = await fetch(url, {
    next: { revalidate: CMS_REVALIDATE_SECONDS, tags },
  })

  if (!response.ok) {
    throw new CmsRequestError(response.status, url)
  }

  return (await response.json()) as TResponse
}

const find = async <TSlug extends CollectionSlug>(
  options: FindOptions<TSlug>,
): Promise<PaginatedDocs<Config['collections'][TSlug]>> => {
  const { collection, tags, ...query } = options
  const queryString = stringify(query, { addQueryPrefix: true })

  return requestCms(`${collection}${queryString}`, tags ?? [collection])
}

const findGlobal = async <TSlug extends GlobalSlug>(
  options: FindGlobalOptions<TSlug>,
): Promise<Config['globals'][TSlug]> => {
  const { slug, tags, ...query } = options
  const queryString = stringify(query, { addQueryPrefix: true })

  return requestCms(`globals/${slug}${queryString}`, tags ?? [`global_${slug}`])
}

export const cmsClient = { find, findGlobal }
