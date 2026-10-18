'use client'

import type { RefObject } from 'react'

import {
  FACE_SCAN_CHIP_STAGGER_SECONDS,
  FACE_SCAN_END,
  FACE_SCAN_LOOP_DELAY_SECONDS,
  FACE_SCAN_RESULT_SECONDS,
  FACE_SCAN_START,
  FACE_SCAN_SWEEP_REPEATS,
  FACE_SCAN_SWEEP_SECONDS,
  FACE_SCAN_TRAVEL_PX,
  MOTION_OK_QUERY,
} from '../animation-constants'
import { gsap, ScrollTrigger, useGSAP } from './register-gsap'

const SCAN_LINE_SELECTOR = '[data-scan-line]'
const OK_RING_SELECTOR = '[data-face-ok]'
const CHECK_PATH_SELECTOR = '[data-face-check]'
const CHIP_SELECTOR = '[data-face-chip]'

/**
 * Simulasi absen wajah di layar HP: garis memindai, cincin berubah hijau, centang digambar,
 * lalu chip (lokasi, jam, offline) muncul. Berulang selama section terlihat.
 */
export const useFaceScan = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        const checkPath = root.querySelector<SVGPathElement>(CHECK_PATH_SELECTOR)

        if (!checkPath) return

        const length = checkPath.getTotalLength()
        gsap.set(checkPath, { strokeDasharray: length })

        const timeline = gsap
          .timeline({ repeat: -1, repeatDelay: FACE_SCAN_LOOP_DELAY_SECONDS, paused: true })
          .set(OK_RING_SELECTOR, { autoAlpha: 0 })
          .set(CHECK_PATH_SELECTOR, { strokeDashoffset: length })
          .set(CHIP_SELECTOR, { autoAlpha: 0 })
          .fromTo(
            SCAN_LINE_SELECTOR,
            { y: 0 },
            {
              y: FACE_SCAN_TRAVEL_PX,
              duration: FACE_SCAN_SWEEP_SECONDS,
              repeat: FACE_SCAN_SWEEP_REPEATS,
              yoyo: true,
              ease: 'sine.inOut',
            },
          )
          .to(SCAN_LINE_SELECTOR, { autoAlpha: 0, duration: FACE_SCAN_RESULT_SECONDS / 2 })
          .to(OK_RING_SELECTOR, { autoAlpha: 1, duration: FACE_SCAN_RESULT_SECONDS })
          .to(CHECK_PATH_SELECTOR, { strokeDashoffset: 0, duration: FACE_SCAN_RESULT_SECONDS })
          .to(CHIP_SELECTOR, {
            autoAlpha: 1,
            duration: FACE_SCAN_RESULT_SECONDS,
            stagger: FACE_SCAN_CHIP_STAGGER_SECONDS,
          })
          .set(SCAN_LINE_SELECTOR, { autoAlpha: 1 }, '>')

        ScrollTrigger.create({
          trigger: root,
          start: FACE_SCAN_START,
          end: FACE_SCAN_END,
          onToggle: (self) => (self.isActive ? timeline.play() : timeline.pause()),
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
