import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'

/** Layout untuk halaman yang kontennya dari CMS (header dan footer dari global CMS). */
export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
