'use client'

import type { RefObject } from 'react'

import {
  DRAW_DURATION_SECONDS,
  DRAW_SELECTOR,
  DRAW_START,
  MOTION_OK_QUERY,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

/** Path SVG ber-atribut `data-draw` digambar dari awal sampai akhir saat terlihat. */
export const useDrawLines = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap.utils.toArray<SVGPathElement>(DRAW_SELECTOR, root).forEach((path) => {
          const length = path.getTotalLength()

          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: DRAW_DURATION_SECONDS,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: path, start: DRAW_START, once: true },
          })
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
