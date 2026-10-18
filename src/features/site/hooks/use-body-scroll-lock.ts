'use client'

import { useEffect } from 'react'

/** Mengunci scroll halaman selama `isLocked` (mis. saat menu layar penuh terbuka di HP). */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isLocked])
}
