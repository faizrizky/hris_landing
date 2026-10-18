import Link from 'next/link'
import React from 'react'

import { BrandLogo } from '@/features/home/components/decorations'
import type { SiteSetting } from '@/payload-types'

import { DEMO_HREF } from '../content/labels'

interface SiteFooterProps {
  settings: SiteSetting
}

/**
 * Penutup gelap: ajakan, tautan, kontak, dan hukum. Ajakan disembunyikan saat halaman sudah punya
 * penutup sendiri (`.home-cta`, beranda) lewat aturan CSS di globals.css.
 */
export const SiteFooter: React.FC<SiteFooterProps> = ({ settings }) => {
  const footerLinks = settings.footerLinks ?? []
  const legalLinks = settings.legalLinks ?? []
  const whatsappHref = settings.whatsappNumber ? `https://wa.me/${settings.whatsappNumber}` : null
  const emailHref = settings.contactEmail ? `mailto:${settings.contactEmail}` : null

  return (
    <footer className="bg-night text-white">
      <div className="footer-invitation container border-b border-white/15 py-[calc(var(--section)/1.6)]">
        <p data-reveal className="t-big max-w-[14ch]">
          {settings.invitation}
        </p>
        <Link data-reveal style={{ '--i': 1 } as React.CSSProperties} href={DEMO_HREF} className="btn btn-on-dark mt-8">
          {settings.invitationButton}
        </Link>
      </div>

      <div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <BrandLogo name={settings.brandName} tone="light" />

        <ul className="space-y-2">
          {footerLinks.map((link) => (
            <li key={link.id ?? link.href}>
              <Link href={link.href} className="link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="space-y-2">
          {whatsappHref && (
            <li>
              <a href={whatsappHref} className="link" rel="noreferrer" target="_blank">
                WhatsApp
              </a>
            </li>
          )}
          {emailHref && (
            <li>
              <a href={emailHref} className="link">
                {settings.contactEmail}
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="container flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/15 py-6 text-[0.9375rem] text-white/75">
        <p>
          © {new Date().getFullYear()} {settings.companyName ?? settings.brandName}
        </p>
        <ul className="flex gap-6">
          {legalLinks.map((link) => (
            <li key={link.id ?? link.href}>
              <Link href={link.href} className="link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
