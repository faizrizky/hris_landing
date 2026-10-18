'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const REVEAL_SELECTOR = '[data-reveal]'
const REVEAL_ROOT_MARGIN = '0px 0px -12% 0px'
const REVEAL_THRESHOLD = 0.1
const SAFETY_NET_DELAY_MS = 2500
const REVEALED_CLASS = 'is-in'

/**
 * Menampilkan elemen `data-reveal` sekali saat masuk layar. Konten tidak pernah tersembunyi
 * permanen: jika pengamat gagal, jaring pengaman memunculkan elemen yang sudah terlihat.
 */
export const RevealObserver = () => {
  const pathname = usePathname()

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)

    if (targets.length === 0) return

    if (!('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add(REVEALED_CLASS))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add(REVEALED_CLASS)
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: REVEAL_ROOT_MARGIN, threshold: REVEAL_THRESHOLD },
    )

    targets.forEach((element) => observer.observe(element))

    const safetyTimer = window.setTimeout(() => {
      targets.forEach((element) => {
        const { top, bottom } = element.getBoundingClientRect()

        if (top < window.innerHeight && bottom > 0) element.classList.add(REVEALED_CLASS)
      })
    }, SAFETY_NET_DELAY_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(safetyTimer)
    }
  }, [pathname])

  return null
}
