import type { Metadata } from 'next'
import React from 'react'

import { DemoForm } from '@/features/demo/demo-form'

export const metadata: Metadata = {
  title: 'Minta demo',
  description: 'Jadwalkan demo 30 menit HRIS. Ceritakan kebutuhanmu, kami hubungi lewat WhatsApp atau email.',
}

export default function DemoPage() {
  return (
    <section className="wrap grid12 gap-y-12 pb-[calc(var(--section)/2)] pt-32 md:pt-44">
      <div className="col-span-12 lg:col-span-5">
        <h1 className="t-big lines max-w-[12ch]">
          <span className="line">
            <span data-line>Minta demo.</span>
          </span>
        </h1>
        <p data-rise style={{ '--i': 3 } as React.CSSProperties} className="t-statement mt-8 max-w-[30ch]">
          Demo 30 menit gratis. Kami tunjukkan absen, pengajuan, approval, dan slip gaji langsung di aplikasi.
        </p>
      </div>
      <div data-rise style={{ '--i': 4 } as React.CSSProperties} className="col-span-12 lg:col-span-6 lg:col-start-7">
        <DemoForm />
      </div>
    </section>
  )
}
