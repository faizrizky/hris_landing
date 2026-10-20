'use client'

import React, { useRef } from 'react'

import {
  useMegaMenuItemsMotion,
  useMegaMenuPanelMotion,
} from '@/features/home/hooks/use-mega-menu-motion'

interface MegaPanelProps {
  id: string
  /** Berubah saat isi panel berganti (kategori aktif), memicu animasi ulang item. */
  revision: string
  children: React.ReactNode
}

/** Panel penuh di bawah header untuk mega menu, dengan animasi masuk panel dan item. */
export const MegaPanel: React.FC<MegaPanelProps> = ({ id, revision, children }) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useMegaMenuPanelMotion(panelRef, id)
  useMegaMenuItemsMotion(panelRef, `${id}:${revision}`)

  return (
    <div ref={panelRef} id={id} className="absolute inset-x-0 top-full hidden bg-tint-sky lg:block">
      {children}
    </div>
  )
}
