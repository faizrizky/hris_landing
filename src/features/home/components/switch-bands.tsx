'use client'

import React, { useState } from 'react'

import { cn } from '@/utilities/ui'

import { Toggle } from './ui-fragments'

interface SwitchItem {
  id?: string | null
  sentence: string
  consequence: string
  defaultOn?: boolean | null
}

interface SwitchBandsProps {
  items: SwitchItem[]
}

/** Warna latar tiap pita saat menyala (satu keluarga warna merek), dengan warna tulisan yang kontras. */
const ON_BAND_CLASSES = ['bg-accent text-ink', 'bg-night text-paper', 'bg-tint text-ink'] as const

/**
 * Empat atau lima kalimat pendek, masing-masing pita penuh dengan sakelar. Saat menyala, pita terisi
 * warna dan akibatnya muncul di bawah kalimat.
 */
export const SwitchBands: React.FC<SwitchBandsProps> = ({ items }) => {
  const [onStates, setOnStates] = useState<boolean[]>(() => items.map((item) => Boolean(item.defaultOn)))

  const handleToggle = (index: number) =>
    setOnStates((current) => current.map((isOn, itemIndex) => (itemIndex === index ? !isOn : isOn)))

  return (
    <section aria-label="Yang dikerjakan aplikasi">
      <ul>
        {items.map((item, index) => {
          const isOn = onStates[index] ?? false

          return (
            <li
              key={item.id ?? item.sentence}
              className={cn(
                'transition-colors duration-[var(--t-ui)]',
                isOn ? ON_BAND_CLASSES[index % ON_BAND_CLASSES.length] : 'bg-paper text-ink-soft',
              )}
            >
              <div className="wrap grid12 items-center gap-y-3 py-7 md:min-h-[20vh]">
                <p className="t-head col-span-10 text-balance md:col-span-10">{item.sentence}</p>
                <div className="col-span-2 flex justify-end text-[1.15rem]">
                  <Toggle isOn={isOn} label={item.sentence} onToggle={() => handleToggle(index)} />
                </div>
                <div
                  className={cn(
                    'col-span-12 grid transition-[grid-template-rows] duration-[var(--t-ui)] md:col-span-9',
                    isOn ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <p className="t-statement overflow-hidden">{item.consequence}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
