'use client'

import type { RefObject } from 'react'

import {
  MOTION_OK_QUERY,
  PHONE_ENTRANCE_DURATION_SECONDS,
  PHONE_ENTRANCE_OFFSET_PX,
  PHONE_ENTRANCE_START_SCALE,
  SHOWCASE_LIFT_DELAY_SECONDS,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

const PHONE_SELECTOR = '[data-phone]'

/** HP di pembuka halaman naik dari bawah begitu halaman tampil (tanpa menunggu scroll). */
export const usePhoneIntro = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap.from(PHONE_SELECTOR, {
          autoAlpha: 0,
          y: PHONE_ENTRANCE_OFFSET_PX,
          scale: PHONE_ENTRANCE_START_SCALE,
          duration: PHONE_ENTRANCE_DURATION_SECONDS,
          delay: SHOWCASE_LIFT_DELAY_SECONDS,
          ease: 'power3.out',
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
