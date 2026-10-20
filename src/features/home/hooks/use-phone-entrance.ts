'use client'

import type { RefObject } from 'react'

import {
  MOTION_OK_QUERY,
  PHONE_ENTRANCE_DURATION_SECONDS,
  PHONE_ENTRANCE_OFFSET_PX,
  PHONE_ENTRANCE_START,
  PHONE_ENTRANCE_START_SCALE,
  POP_DELAY_SECONDS,
  POP_DURATION_SECONDS,
  POP_START_ROTATION_DEG,
  POP_START_SCALE,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

const PHONE_SELECTOR = '[data-phone]'
const POP_SELECTOR = '[data-pop]'

/** HP naik dari bawah ke posisinya, disusul objek `data-pop` yang muncul membal di dekatnya. */
export const usePhoneEntrance = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root, start: PHONE_ENTRANCE_START, once: true } })
          .from(PHONE_SELECTOR, {
            autoAlpha: 0,
            y: PHONE_ENTRANCE_OFFSET_PX,
            scale: PHONE_ENTRANCE_START_SCALE,
            duration: PHONE_ENTRANCE_DURATION_SECONDS,
            ease: 'power3.out',
          })
          .from(
            POP_SELECTOR,
            {
              scale: POP_START_SCALE,
              rotation: POP_START_ROTATION_DEG,
              autoAlpha: 0,
              duration: POP_DURATION_SECONDS,
              ease: 'back.out(2.2)',
            },
            `-=${PHONE_ENTRANCE_DURATION_SECONDS - POP_DELAY_SECONDS}`,
          )
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
