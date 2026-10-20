'use client'

import { useRefreshOnRouteChange } from '../hooks/use-refresh-on-route-change'
import { useSmoothScroll } from '../hooks/use-smooth-scroll'

/** Scroll halus untuk seluruh situs. Dipasang sekali di kerangka halaman agar tidak mati saat pindah halaman. */
export const SmoothScroll = () => {
  useSmoothScroll()
  useRefreshOnRouteChange()

  return null
}
