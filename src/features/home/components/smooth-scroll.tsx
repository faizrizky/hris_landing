'use client'

import { useSmoothScroll } from '../hooks/use-smooth-scroll'

/** Mengaktifkan smooth scroll untuk halaman yang menempatkannya. Tidak merender apa pun. */
export const SmoothScroll = () => {
  useSmoothScroll()

  return null
}
