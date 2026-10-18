'use client'

import type { RefObject } from 'react'

import {
  HERO_CARD_DURATION_SECONDS,
  HERO_CARD_OFFSET_PX,
  HERO_CARD_OVERLAP_SECONDS,
  HERO_CARD_STAGGER_SECONDS,
  HERO_CARD_START_SCALE,
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
const HERO_CARD_SELECTOR = '[data-hero-card]'

/** Animasi masuk hero: judul per kata, teks dan tombol, lalu kartu-kartu. */
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
          .from(
            HERO_CARD_SELECTOR,
            {
              autoAlpha: 0,
              y: HERO_CARD_OFFSET_PX,
              scale: HERO_CARD_START_SCALE,
              duration: HERO_CARD_DURATION_SECONDS,
              stagger: HERO_CARD_STAGGER_SECONDS,
            },
            `-=${HERO_CARD_OVERLAP_SECONDS}`,
          )
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
