import { redirect } from 'next/navigation'

import { cmsClient } from '@/utilities/cms-client'

/**
 * Jika path ada di koleksi redirect CMS, arahkan ke tujuannya. Dipanggil sebelum menampilkan 404.
 * Kegagalan memuat redirect tidak boleh merusak halaman, jadi diam saja.
 */
export const redirectIfConfigured = async (path: string) => {
  try {
    const { docs } = await cmsClient.find({
      collection: 'redirects',
      depth: 1,
      limit: 1,
      where: { from: { equals: path } },
    })
    const target = docs[0]?.to

    if (!target) return

    if (target.type === 'custom' && target.url) redirect(target.url)

    const reference = target.reference

    if (reference && typeof reference.value === 'object' && 'slug' in reference.value && reference.value.slug) {
      redirect(`/${reference.value.slug}`)
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error
    console.error('Gagal memeriksa redirect', error)
  }
}
