'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'

import {
  CHIP_DURATION_SECONDS,
  CHIP_ENTER_DELAY_SECONDS,
  CHIP_OFFSET_PX,
  CHIP_SELECTOR,
  CHIP_STAGGER_SECONDS,
  HOLD_LAST_STEP_SECONDS,
  PANEL_ENTER_DELAY_SECONDS,
  PANEL_OFFSET_PX,
  PANEL_SELECTOR,
  PINNED_CLASS_NAME,
  PINNED_MEDIA_QUERY,
  SCROLL_DISTANCE_PER_STEP_PERCENT,
  SCRUB_SMOOTHING_SECONDS,
  STEP_TRANSITION_SECONDS,
} from './constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const MIN_PANEL_COUNT_TO_PIN = 2

const animateChipsIn = (timeline: gsap.core.Timeline, panel: HTMLElement, position: number) => {
  const chips = panel.querySelectorAll(CHIP_SELECTOR)

  if (chips.length === 0) return

  timeline.from(
    chips,
    {
      autoAlpha: 0,
      y: CHIP_OFFSET_PX,
      duration: CHIP_DURATION_SECONDS,
      stagger: CHIP_STAGGER_SECONDS,
    },
    position,
  )
}

/**
 * Pin section dan ganti langkah mengikuti scroll (layar lebar, tanpa reduced-motion).
 * Di kondisi lain, langkah tampil bertumpuk biasa tanpa animasi.
 * Cleanup dilakukan `matchMedia.revert()` yang mengembalikan semua gaya inline GSAP.
 */
export const usePinnedStoryAnimation = (
  rootRef: RefObject<HTMLElement | null>,
  backgroundColors: string[],
) => {
  const backgroundColorKey = backgroundColors.join(',')

  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const panels = gsap.utils.toArray<HTMLElement>(PANEL_SELECTOR, root)

      if (panels.length < MIN_PANEL_COUNT_TO_PIN) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(PINNED_MEDIA_QUERY, () => {
        root.classList.add(PINNED_CLASS_NAME)

        gsap.set(panels.slice(1), { autoAlpha: 0 })
        gsap.set(root, { backgroundColor: backgroundColors[0] })

        const timeline = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: `+=${panels.length * SCROLL_DISTANCE_PER_STEP_PERCENT}%`,
            pin: true,
            scrub: SCRUB_SMOOTHING_SECONDS,
          },
        })

        animateChipsIn(timeline, panels[0], 0)

        panels.forEach((panel, index) => {
          if (index === 0) return

          timeline
            .to(
              panels[index - 1],
              { autoAlpha: 0, y: -PANEL_OFFSET_PX, duration: STEP_TRANSITION_SECONDS },
              index,
            )
            .to(
              root,
              { backgroundColor: backgroundColors[index], duration: STEP_TRANSITION_SECONDS },
              index,
            )
            .fromTo(
              panel,
              { autoAlpha: 0, y: PANEL_OFFSET_PX },
              { autoAlpha: 1, y: 0, duration: STEP_TRANSITION_SECONDS },
              index + PANEL_ENTER_DELAY_SECONDS,
            )

          animateChipsIn(timeline, panel, index + CHIP_ENTER_DELAY_SECONDS)
        })

        timeline.to({}, { duration: HOLD_LAST_STEP_SECONDS })

        return () => root.classList.remove(PINNED_CLASS_NAME)
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef, dependencies: [backgroundColorKey] },
  )
}
