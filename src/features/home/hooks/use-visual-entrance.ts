'use client'

import type { RefObject } from 'react'

import {
  ENTER_INTRO_DELAY_SECONDS,
  ENTER_POP_DURATION_SECONDS,
  ENTER_POP_START_ROTATION_DEG,
  ENTER_POP_START_SCALE,
  ENTER_RISE_DURATION_SECONDS,
  ENTER_RISE_OFFSET_PX,
  ENTER_RISE_START_SCALE,
  ENTER_SELECTOR,
  ENTER_STAGGER_SECONDS,
  ENTER_START,
  ENTER_TILT_DURATION_SECONDS,
  ENTER_TILT_OFFSET_PX,
  ENTER_TILT_START_ROTATION_DEG,
  MOTION_OK_QUERY,
} from '../animation-constants'
import { gsap, ScrollTrigger, useGSAP } from './register-gsap'

type EnterKind = 'rise' | 'pop' | 'tilt'

const ENTER_VARS: Record<EnterKind, gsap.TweenVars> = {
  rise: { autoAlpha: 0, y: ENTER_RISE_OFFSET_PX, scale: ENTER_RISE_START_SCALE, duration: ENTER_RISE_DURATION_SECONDS, ease: 'power3.out' },
  pop: { autoAlpha: 0, scale: ENTER_POP_START_SCALE, rotation: ENTER_POP_START_ROTATION_DEG, duration: ENTER_POP_DURATION_SECONDS, ease: 'back.out(2.2)' },
  tilt: { autoAlpha: 0, y: ENTER_TILT_OFFSET_PX, rotation: ENTER_TILT_START_ROTATION_DEG, duration: ENTER_TILT_DURATION_SECONDS, ease: 'power3.out' },
}

const isEnterKind = (value: string | undefined): value is EnterKind => value === 'rise' || value === 'pop' || value === 'tilt'

/**
 * Elemen `data-enter="rise|pop|tilt"` masuk dengan gaya beranda: naik, muncul membal, atau jatuh miring.
 * Yang sudah terlihat saat halaman dibuka langsung diputar; yang di bawah menunggu masuk layar.
 */
export const useVisualEntrance = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        const elements = gsap.utils.toArray<HTMLElement>(ENTER_SELECTOR, root)

        elements.forEach((element, index) => {
          const kind = element.dataset.enter

          if (!isEnterKind(kind)) return

          const isAlreadyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.9
          const delay = ENTER_INTRO_DELAY_SECONDS + index * ENTER_STAGGER_SECONDS

          if (isAlreadyVisible) {
            gsap.from(element, { ...ENTER_VARS[kind], delay })
            return
          }

          gsap.from(element, {
            ...ENTER_VARS[kind],
            scrollTrigger: { trigger: element, start: ENTER_START, once: true },
          })
        })

        ScrollTrigger.refresh()
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
