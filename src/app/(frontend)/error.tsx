'use client'

import React from 'react'

interface ErrorPageProps {
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="wrap flex min-h-svh flex-col justify-center py-16">
      <h1 className="t-big max-w-[16ch]">Ada yang tidak berjalan.</h1>
      <p className="t-statement mt-6 max-w-[36ch] text-ink-soft">Coba muat ulang. Jika berlanjut, hubungi kami.</p>
      <button type="button" onClick={reset} className="btn mt-10 self-start">
        Muat ulang
      </button>
    </main>
  )
}
