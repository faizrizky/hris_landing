import { getCmsURL } from './getURL'

const ABSOLUTE_URL_PATTERN = /^https?:\/\//

/**
 * Menyusun URL media dari hris-cms.
 * Payload mengembalikan path relatif (mis. `/api/media/file/image.webp`),
 * jadi diberi awalan alamat CMS. URL yang sudah absolut dibiarkan.
 * @param url URL asli dari resource
 * @param cacheTag Cache tag opsional yang ditambahkan ke URL
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const absoluteUrl = ABSOLUTE_URL_PATTERN.test(url) ? url : `${getCmsURL()}${url}`

  if (!cacheTag) return absoluteUrl

  return `${absoluteUrl}?${encodeURIComponent(cacheTag)}`
}
