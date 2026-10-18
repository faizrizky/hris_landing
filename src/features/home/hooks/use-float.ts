'use client'

import type { RefObject } from 'react'

import {
  FLOAT_DISTANCE_PX,
  FLOAT_DURATION_SECONDS,
  FLOAT_SELECTOR,
  FLOAT_STAGGER_SECONDS,
  MOTION_OK_QUERY,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

/** Elemen `data-float` melayang naik turun pelan tanpa henti. */
export const useFloat = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap.utils.toArray<HTMLElement>(FLOAT_SELECTOR, root).forEach((element, index) => {
          gsap.to(element, {
            y: FLOAT_DISTANCE_PX,
            duration: FLOAT_DURATION_SECONDS,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * FLOAT_STAGGER_SECONDS,
          })
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
