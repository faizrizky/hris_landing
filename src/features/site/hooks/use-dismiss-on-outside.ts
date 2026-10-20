'use client'

import { useEffect, type RefObject } from 'react'

/** Memanggil `onDismiss` saat user menekan di luar elemen atau menekan Escape, hanya selama `isActive`. */
export const useDismissOnOutside = (
  rootRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  onDismiss: () => void,
) => {
  useEffect(() => {
    if (!isActive) return

    const handlePointerDown = (event: PointerEvent) => {
      const root = rootRef.current

      if (root && event.target instanceof Node && !root.contains(event.target)) onDismiss()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [rootRef, isActive, onDismiss])
}
