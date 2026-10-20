import Link from 'next/link'
import React from 'react'

import { BrandLogo } from '@/features/home/components/decorations'
import type { Footer, SiteSetting } from '@/types/cms'

interface SiteFooterProps {
  settings: SiteSetting
  footer: Footer | null
}

/** Penutup gelap: logo, deskripsi, kolom tautan, kontak, dan hak cipta. Semuanya dari CMS (Settings). */
export const SiteFooter: React.FC<SiteFooterProps> = ({ settings, footer }) => {
  const columns = footer?.columns ?? []
  const { email, phone, whatsappNumber } = settings.contact
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null
  const copyright = (footer?.copyright ?? `© {year} ${settings.siteName}`).replace('{year}', String(new Date().getFullYear()))
  const socials = settings.socials ?? []

  return (
    <footer className="bg-night text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(2,1fr)_1fr]">
        <div>
          <BrandLogo name={settings.siteName} tone="light" />
          {footer?.description && <p className="mt-4 max-w-xs text-sm text-white/75">{footer.description}</p>}
        </div>

        {columns.map((column, index) => (
          <nav key={column.id ?? index} aria-label={column.title}>
            <p className="text-xs font-bold tracking-wider">{column.title.toUpperCase()}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {(column.links ?? []).map((link) => (
                <li key={link.id ?? link.href}>
                  <Link href={link.href} className="link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className="text-xs font-bold tracking-wider">KONTAK</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {whatsappHref && (
              <li>
                <a href={whatsappHref} className="link" rel="noreferrer" target="_blank">
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${email}`} className="link">
                {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="link">
                {phone}
              </a>
            </li>
            {socials.map((social) => (
              <li key={social.id ?? social.url}>
                <a href={social.url} className="link" rel="noreferrer" target="_blank">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container border-t border-white/15 py-6 text-[0.9375rem] text-white/75">
        <p>{copyright}</p>
      </div>
    </footer>
  )
}
