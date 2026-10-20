'use client'

import type { RefObject } from 'react'

import {
  CHECKLIST_BADGE_SECONDS,
  CHECKLIST_DRAW_SECONDS,
  CHECKLIST_FILL_SECONDS,
  CHECKLIST_ITEM_GAP_SECONDS,
  CHECKLIST_START,
  MOTION_OK_QUERY,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

const ITEM_SELECTOR = '[data-check-item]'
const FILL_SELECTOR = '[data-check-fill]'
const PATH_SELECTOR = '[data-check-path]'
const PENDING_SELECTOR = '[data-badge-pending]'
const DONE_SELECTOR = '[data-badge-done]'

/** Pengajuan di layar HP disetujui satu per satu: lingkaran terisi, centang digambar, badge berganti. */
export const useApprovalChecklist = (rootRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        const items = gsap.utils.toArray<HTMLElement>(ITEM_SELECTOR, root)

        if (items.length === 0) return

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: root, start: CHECKLIST_START, once: true },
        })

        items.forEach((item, index) => {
          const path = item.querySelector<SVGPathElement>(PATH_SELECTOR)
          const startAt = index * CHECKLIST_ITEM_GAP_SECONDS

          if (path) {
            const length = path.getTotalLength()
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
            timeline.to(
              path,
              { strokeDashoffset: 0, duration: CHECKLIST_DRAW_SECONDS },
              startAt + CHECKLIST_FILL_SECONDS / 2,
            )
          }

          timeline
            .to(
              item.querySelector(FILL_SELECTOR),
              { autoAlpha: 1, duration: CHECKLIST_FILL_SECONDS },
              startAt,
            )
            .to(
              item.querySelector(PENDING_SELECTOR),
              { autoAlpha: 0, duration: CHECKLIST_BADGE_SECONDS },
              startAt + CHECKLIST_FILL_SECONDS,
            )
            .to(
              item.querySelector(DONE_SELECTOR),
              { autoAlpha: 1, duration: CHECKLIST_BADGE_SECONDS },
              startAt + CHECKLIST_FILL_SECONDS,
            )
        })
      })

      return () => matchMedia.revert()
    },
    { scope: rootRef },
  )
}
