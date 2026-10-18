'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

import {
  GSAP_LAG_ADJUSTED_MS,
  GSAP_LAG_THRESHOLD_MS,
  MS_PER_SECOND,
  REDUCED_MOTION_QUERY,
  SMOOTH_SCROLL_DURATION_SECONDS,
} from '../animation-constants'
import { gsap, ScrollTrigger } from './register-gsap'

/** Scroll halus (Lenis) yang disinkronkan dengan ScrollTrigger. Dimatikan saat reduced-motion. */
export const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return

    const lenis = new Lenis({ duration: SMOOTH_SCROLL_DURATION_SECONDS })
    const handleTick = (timeSeconds: number) => lenis.raf(timeSeconds * MS_PER_SECOND)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(handleTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(handleTick)
      gsap.ticker.lagSmoothing(GSAP_LAG_THRESHOLD_MS, GSAP_LAG_ADJUSTED_MS)
      lenis.destroy()
    }
  }, [])
}
