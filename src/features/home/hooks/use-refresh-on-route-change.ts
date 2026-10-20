'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { ScrollTrigger } from './register-gsap'

/** Setelah pindah halaman, ScrollTrigger menghitung ulang posisi karena tinggi dokumen berubah. */
export const useRefreshOnRouteChange = () => {
  const pathname = usePathname()

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => window.cancelAnimationFrame(frameId)
  }, [pathname])
}
