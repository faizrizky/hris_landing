import Link from 'next/link'
import React from 'react'

import { BRAND_NAME, DEMO_HREF, HERO_CONTENT, NAV_ITEMS } from '../content/home-content'
import { BrandLogo } from './decorations'
import { PillLink } from './pill-link'

/** Navbar beranda ala KantorKu: logo di kiri, menu dan tombol di kanan. */
export const HomeHeader: React.FC = () => (
  <header className="absolute inset-x-0 top-0 z-20">
    <div className="container flex items-center justify-between py-5">
      <Link href="#beranda" aria-label={`${BRAND_NAME}, ke atas`}>
        <BrandLogo name={BRAND_NAME} tone="dark" />
      </Link>
      <div className="flex items-center gap-8">
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink-muted">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <PillLink href={DEMO_HREF} className="px-5 py-2 text-xs">
          {HERO_CONTENT.headerCta}
        </PillLink>
      </div>
    </div>
  </header>
)
