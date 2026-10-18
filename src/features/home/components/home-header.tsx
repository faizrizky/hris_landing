import Link from 'next/link'
import React from 'react'

import { BRAND_NAME, DEMO_HREF, HERO_CONTENT, NAV_ITEMS } from '../content/home-content'
import { BrandLogo } from './decorations'
import { PillLink } from './pill-link'

/** Navbar beranda: logo, menu anchor, dan tombol uji coba. */
export const HomeHeader: React.FC = () => (
  <header className="absolute inset-x-0 top-0 z-20">
    <div className="container flex items-center justify-between py-6">
      <div className="flex items-center gap-12">
        <Link href="#beranda" aria-label={`${BRAND_NAME}, ke atas`}>
          <BrandLogo name={BRAND_NAME} tone="dark" />
        </Link>
        <nav aria-label="Menu utama" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-ink-muted">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <PillLink href={DEMO_HREF} variant="outline" className="px-5 py-1.5 text-xs">
        {HERO_CONTENT.secondaryCta}
      </PillLink>
    </div>
  </header>
)
