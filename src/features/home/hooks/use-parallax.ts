'use client'

import type { RefObject } from 'react'

import {
  MOTION_OK_QUERY,
  PARALLAX_BASE_DISTANCE_PX,
  PARALLAX_SCRUB_SECONDS,
  PARALLAX_SELECTOR,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

/**
 * Elemen `data-parallax="<kecepatan>"` bergeser vertikal selama section melintas layar.
 * Kecepatan positif naik lebih cepat dari scroll, negatif turun.
 */
export const useParallax = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap.utils.toArray<HTMLElement>(PARALLAX_SELECTOR, root).forEach((element) => {
          const speed = Number(element.dataset.parallax)

          if (!Number.isFinite(speed)) return

          gsap.to(element, {
            y: -speed * PARALLAX_BASE_DISTANCE_PX,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: PARALLAX_SCRUB_SECONDS,
            },
          })
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
