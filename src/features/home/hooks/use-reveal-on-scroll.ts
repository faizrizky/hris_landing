'use client'

import type { RefObject } from 'react'

import {
  MOTION_OK_QUERY,
  REVEAL_DURATION_SECONDS,
  REVEAL_OFFSET_PX,
  REVEAL_SELECTOR,
  REVEAL_STAGGER_SECONDS,
  REVEAL_START,
} from '../animation-constants'
import { gsap, ScrollTrigger, useGSAP } from './register-gsap'

/** Elemen ber-atribut `data-reveal` naik dan muncul bertahap saat masuk viewport. */
export const useRevealOnScroll = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        const elements = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR, root)

        if (elements.length === 0) return

        gsap.set(elements, { autoAlpha: 0, y: REVEAL_OFFSET_PX })

        ScrollTrigger.batch(elements, {
          start: REVEAL_START,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: REVEAL_DURATION_SECONDS,
              stagger: REVEAL_STAGGER_SECONDS,
              ease: 'power3.out',
            }),
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
