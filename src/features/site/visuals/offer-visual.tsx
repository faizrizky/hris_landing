import { Check } from 'lucide-react'
import React from 'react'

import { WalletBadge } from './badge-sets'

const MAX_STEPS = 4

interface OfferVisualProps {
  title: string
  steps: string[]
}

/** Kartu putih besar berisi langkah bercentang di atas pita lavender, seperti kartu harga di beranda. */
export const OfferVisual: React.FC<OfferVisualProps> = ({ title, steps }) => (
  <div aria-hidden className="relative mx-auto w-full max-w-[460px] rounded-3xl bg-tint-lavender p-6 md:p-8">
    <div data-float data-parallax="0.08" className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)]">
      <p className="text-base font-extrabold">{title}</p>
      <ul className="mt-5 space-y-3">
        {steps.slice(0, MAX_STEPS).map((step) => (
          <li key={step} className="flex items-center gap-3 text-sm">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-teal/25">
              <Check aria-hidden className="h-3 w-3" />
            </span>
            {step}
          </li>
        ))}
      </ul>
    </div>
    <div className="absolute -right-3 -top-6 md:-right-8" data-parallax="0.3">
      <div data-float>
        <WalletBadge />
      </div>
    </div>
  </div>
)
