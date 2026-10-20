import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="wrap flex min-h-svh flex-col justify-between py-8">
      <Link href="/" className="text-[1.5rem] font-extrabold leading-none tracking-[-0.06em]">
        HRIS
      </Link>
      <div>
        <h1 className="t-display">404</h1>
        <p className="t-statement mt-6 max-w-[34ch]">Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
        <Link href="/" className="btn mt-10">
          Ke beranda
        </Link>
      </div>
      <span />
    </main>
  )
}
