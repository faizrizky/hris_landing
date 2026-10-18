import type { Metadata, Viewport } from 'next'

import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { RevealObserver } from '@/features/site/components/reveal-observer'
import { getServerSideURL } from '@/utilities/getURL'

import './globals.css'

/** Menandai halaman bisa menjalankan skrip, sehingga animasi masuk hanya menyembunyikan konten saat skrip ada. */
const MARK_SCRIPT_READY = "document.documentElement.classList.add('js')"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={GeistSans.variable} lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MARK_SCRIPT_READY }} />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <a
          href="#isi"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Lewati ke isi
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: { default: 'HRIS', template: '%s | HRIS' },
  description: 'Aplikasi HR untuk absensi, cuti, lembur, approval, dan slip gaji.',
  openGraph: { siteName: 'HRIS', locale: 'id_ID', type: 'website' },
}

export const viewport: Viewport = {
  themeColor: '#f6f8fc',
}
