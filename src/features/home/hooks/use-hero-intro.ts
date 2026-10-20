'use client'

import type { RefObject } from 'react'

import {
  HERO_FADE_DURATION_SECONDS,
  HERO_FADE_OFFSET_PX,
  HERO_WORD_DURATION_SECONDS,
  HERO_WORD_STAGGER_SECONDS,
  HERO_WORD_START_PERCENT,
  MOTION_OK_QUERY,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

const HERO_WORD_SELECTOR = '[data-hero-word]'
const HERO_FADE_SELECTOR = '[data-hero-fade]'

/** Animasi masuk hero: judul per kata, lalu teks, tombol, dan kartu keunggulan. */
export const useHeroIntro = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(HERO_WORD_SELECTOR, {
            yPercent: HERO_WORD_START_PERCENT,
            duration: HERO_WORD_DURATION_SECONDS,
            stagger: HERO_WORD_STAGGER_SECONDS,
          })
          .from(
            HERO_FADE_SELECTOR,
            {
              autoAlpha: 0,
              y: HERO_FADE_OFFSET_PX,
              duration: HERO_FADE_DURATION_SECONDS,
              stagger: HERO_WORD_STAGGER_SECONDS,
            },
            `-=${HERO_WORD_DURATION_SECONDS / 2}`,
          )
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
