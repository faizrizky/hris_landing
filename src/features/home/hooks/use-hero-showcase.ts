'use client'

import type { RefObject } from 'react'

import {
  MOTION_OK_QUERY,
  SHOWCASE_FLOAT_DISTANCE_PX,
  SHOWCASE_FLOAT_DURATION_SECONDS,
  SHOWCASE_FLOAT_STAGGER_SECONDS,
  SHOWCASE_LIFT_DELAY_SECONDS,
  SHOWCASE_LIFT_DURATION_SECONDS,
  SHOWCASE_LIFT_STAGGER_SECONDS,
  SHOWCASE_LIFT_START_PX,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

const LAYER_SELECTOR = '[data-iso-layer]'
const LIFT_VARIABLE = '--lift'
const FLOAT_VARIABLE = '--float'

/**
 * Layer mockup isometrik naik dari bawah (sumbu Z) satu per satu, lalu melayang pelan.
 * Posisi 3D dibaca CSS dari variabel `--z`, `--lift`, dan `--float`, jadi GSAP cukup
 * menganimasikan variabel dan tidak menimpa transform 3D.
 */
export const useHeroShowcase = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        const layers = gsap.utils.toArray<HTMLElement>(LAYER_SELECTOR, root)

        gsap.from(layers, {
          [LIFT_VARIABLE]: `${SHOWCASE_LIFT_START_PX}px`,
          autoAlpha: 0,
          duration: SHOWCASE_LIFT_DURATION_SECONDS,
          stagger: SHOWCASE_LIFT_STAGGER_SECONDS,
          delay: SHOWCASE_LIFT_DELAY_SECONDS,
          ease: 'power3.out',
        })

        layers.forEach((layer, index) => {
          gsap.to(layer, {
            [FLOAT_VARIABLE]: `${SHOWCASE_FLOAT_DISTANCE_PX}px`,
            duration: SHOWCASE_FLOAT_DURATION_SECONDS,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * SHOWCASE_FLOAT_STAGGER_SECONDS,
          })
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
