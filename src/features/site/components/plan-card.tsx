import { Check, Clock } from 'lucide-react'
import React from 'react'

import { PillLink } from '@/features/home/components/pill-link'
import type { Page } from '@/types/cms'
import { cn } from '@/utilities/ui'

import { DEMO_HREF } from '../content/labels'

type PricingBlockData = Extract<Page['layout'][number], { blockType: 'pricing' }>

export type PricingPlan = NonNullable<PricingBlockData['plans']>[number]

interface PlanCardProps {
  plan: PricingPlan
  /** Tampilan ringkas untuk beranda: hanya sebagian fitur. */
  maxFeatures?: number
}

/** Kartu paket harga: nama, harga, fitur, dan tombol. Paket yang disorot diberi cincin biru dan label. */
export const PlanCard: React.FC<PlanCardProps> = ({ plan, maxFeatures }) => {
  const features = plan.features ?? []
  const shownFeatures = maxFeatures ? features.slice(0, maxFeatures) : features

  return (
    <div
      data-reveal
      className={cn(
        'relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_24px_60px_-34px_rgba(60,60,140,0.5)]',
        plan.isFeatured ? 'ring-2 ring-accent-blue' : 'border border-black/5',
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-7 rounded-full bg-accent-blue px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {plan.badge}
        </span>
      )}
      <h3 className="text-xl font-extrabold">{plan.name}</h3>
      {plan.description && <p className="mt-1 text-xs leading-relaxed text-ink-muted">{plan.description}</p>}

      <p className="mt-6 text-xs text-ink-muted">{plan.pricePrefix}</p>
      <p className="nums mt-1 flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
        <span className="text-xs text-ink-muted">{plan.priceUnit}</span>
      </p>

      <ul className="mt-6 flex-1 space-y-2.5 border-t border-black/5 pt-6 text-sm">
        {plan.inheritsFrom && <li className="font-semibold">{plan.inheritsFrom}</li>}
        {shownFeatures.map((feature) => (
          <li key={feature.id ?? feature.text} className={cn('flex items-start gap-2.5', feature.isSoon && 'text-ink-muted')}>
            {feature.isSoon ? (
              <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-yellow" />
            ) : (
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-teal/25">
                <Check aria-hidden className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
            )}
            <span>
              {feature.text}
              {feature.isSoon && <span className="ml-1.5 text-[11px] font-semibold">Segera hadir</span>}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <PillLink href={plan.actionHref || DEMO_HREF} variant={plan.isFeatured ? 'dark' : 'outline'} className="w-full">
          {plan.actionLabel}
        </PillLink>
      </div>
    </div>
  )
}
