import React from 'react'

interface ContentUnavailableProps {
  message?: string
}

/** Keadaan galat: konten dari CMS gagal dimuat. Jelas dan tidak menyalahkan pengunjung. */
export const ContentUnavailable: React.FC<ContentUnavailableProps> = ({
  message = 'Konten belum bisa dimuat.',
}) => (
  <section className="wrap flex min-h-[60svh] flex-col justify-center py-28" role="alert">
    <p className="t-big max-w-[18ch]">{message}</p>
    <p className="t-statement mt-6 max-w-[40ch] text-ink-soft">
      Coba muat ulang halaman ini beberapa saat lagi.
    </p>
  </section>
)
