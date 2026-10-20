'use client'

import type { RefObject } from 'react'

import {
  MOTION_OK_QUERY,
  TESTIMONIAL_DURATION_SECONDS,
  TESTIMONIAL_OFFSET_PX,
  TESTIMONIAL_STAGGER_SECONDS,
  TESTIMONIAL_START,
  TESTIMONIAL_START_ROTATION_DEG,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

const TESTIMONIAL_SELECTOR = '[data-testimonial]'

/** Kartu testimoni jatuh dari bawah sambil berputar sampai ke kemiringan akhirnya. */
export const useTestimonialCards = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap.from(gsap.utils.toArray<HTMLElement>(TESTIMONIAL_SELECTOR, root), {
          autoAlpha: 0,
          y: TESTIMONIAL_OFFSET_PX,
          rotation: TESTIMONIAL_START_ROTATION_DEG,
          duration: TESTIMONIAL_DURATION_SECONDS,
          stagger: TESTIMONIAL_STAGGER_SECONDS,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: root, start: TESTIMONIAL_START, once: true },
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
