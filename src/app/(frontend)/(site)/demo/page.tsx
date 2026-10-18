import { PageSection } from '@/features/site/components/page-section'
import { ChatBadge } from '@/features/site/visuals/badge-sets'
import { PanelVisual } from '@/features/site/visuals/panel-visual'
import { PhoneVisual, type PhoneRow } from '@/features/site/visuals/phone-visual'
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
        visual={<PhoneVisual tone="lavender" title="Isi demo 30 menit" accessory={<ChatBadge />} rows={DEMO_AGENDA} />}
        title="Minta demo"
        tag={SECTION_TAGS.attendance}
        sentence="Demo 30 menit gratis. Kami tunjukkan absen, pengajuan, approval, dan slip gaji langsung di aplikasi."
      />
      <PageSection
        title="Isi formulir, kami hubungi"
        description="Tim kami menjadwalkan demo lewat WhatsApp atau email."
        visual={
          <PanelVisual
            panelClassName="bg-tint-peach"
            badge={<ChatBadge />}
            chips={DEMO_AGENDA.map((item) => item.title)}
          />
        }
      >
        <div className="max-w-2xl rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)] md:p-10">
          <DemoForm />
        </div>
      </PageSection>
    </>
  )
}
