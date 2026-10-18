'use client'

import type { RefObject } from 'react'

import {
  MENU_ITEM_DELAY_SECONDS,
  MENU_ITEM_DURATION_SECONDS,
  MENU_ITEM_OFFSET_PX,
  MENU_ITEM_STAGGER_SECONDS,
  MENU_PANEL_DURATION_SECONDS,
  MENU_PANEL_OFFSET_PX,
  MOTION_OK_QUERY,
} from '../animation-constants'
import { gsap, useGSAP } from './register-gsap'

const ITEM_SELECTOR = '[data-menu-item]'

/** Panel mega menu turun dan memudar masuk setiap kali menu dibuka (`menuId` berubah). */
export const useMegaMenuPanelMotion = (panelRef: RefObject<HTMLElement | null>, menuId: string) => {
  useGSAP(
    () => {
      const panel = panelRef.current

      if (!panel) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap.from(panel, {
          autoAlpha: 0,
          y: MENU_PANEL_OFFSET_PX,
          duration: MENU_PANEL_DURATION_SECONDS,
          ease: 'power3.out',
        })
      })

      return () => matchMedia.revert()
    },
    { scope: panelRef, dependencies: [menuId] },
  )
}

/** Item di dalam panel naik bertahap saat menu dibuka atau kategori berganti (`revision` berubah). */
export const useMegaMenuItemsMotion = (panelRef: RefObject<HTMLElement | null>, revision: string) => {
  useGSAP(
    () => {
      const panel = panelRef.current

      if (!panel) return

      const matchMedia = gsap.matchMedia()

      matchMedia.add(MOTION_OK_QUERY, () => {
        gsap.from(gsap.utils.toArray<HTMLElement>(ITEM_SELECTOR, panel), {
          autoAlpha: 0,
          y: MENU_ITEM_OFFSET_PX,
          duration: MENU_ITEM_DURATION_SECONDS,
          stagger: MENU_ITEM_STAGGER_SECONDS,
          delay: MENU_ITEM_DELAY_SECONDS,
          ease: 'power3.out',
        })
      })

      return () => matchMedia.revert()
    },
    { scope: panelRef, dependencies: [revision] },
  )
}
