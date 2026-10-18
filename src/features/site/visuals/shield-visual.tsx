import React from 'react'

import { ShieldCheckBadge } from '@/features/home/components/accessories'
import { DotGrid } from '@/features/home/components/decorations'

/** Badge perisai besar di atas lingkaran sky untuk halaman hukum. */
export const ShieldVisual: React.FC = () => (
  <div aria-hidden className="relative mx-auto grid h-[280px] w-[280px] place-items-center rounded-full bg-tint-sky">
    <DotGrid tone="teal" columns={6} rows={3} className="absolute -right-6 top-6" />
    <div data-parallax="0.15" className="scale-[1.8]">
      <div data-enter="pop">
        <div data-float>
          <ShieldCheckBadge />
        </div>
      </div>
    </div>
  </div>
)
