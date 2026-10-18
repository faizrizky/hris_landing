import { PhoneVisual, type PhoneRow } from '@/features/site/visuals/phone-visual'
import { CheckCircleBadge } from '@/features/home/components/accessories'
import { PageIntro } from '@/features/site/components/page-intro'
import { SECTION_TAGS } from '@/features/home/content/tones'
import type { Metadata } from 'next'
import React from 'react'

import { DemoForm } from '@/features/demo/demo-form'

export const metadata: Metadata = {
  title: 'Minta demo',
  description: 'Jadwalkan demo 30 menit HRIS. Ceritakan kebutuhanmu, kami hubungi lewat WhatsApp atau email.',
}

const DEMO_AGENDA: PhoneRow[] = [
  { title: 'Absen wajah dan lokasi', detail: 'Langsung di aplikasi' },
  { title: 'Pengajuan dan approval', detail: 'Cuti, lembur, dinas luar' },
  { title: 'Slip gaji', detail: 'Dilihat karyawan sendiri' },
]

export default function DemoPage() {
  return (
    <>
      <PageIntro
        visual={<PhoneVisual tone="lavender" title="Isi demo 30 menit" accessory={<CheckCircleBadge />} rows={DEMO_AGENDA} />}
        title="Minta demo"
        tag={SECTION_TAGS.attendance}
        sentence="Demo 30 menit gratis. Kami tunjukkan absen, pengajuan, approval, dan slip gaji langsung di aplikasi."
      />
      <section className="pb-20">
        <div className="container">
          <div className="max-w-2xl rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)] md:p-10">
            <DemoForm />
          </div>
        </div>
      </section>
    </>
  )
}
