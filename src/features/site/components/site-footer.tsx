import Link from 'next/link'
import React from 'react'

import type { SiteSetting } from '@/payload-types'

import { DEMO_HREF } from '../content/labels'

interface SiteFooterProps {
  settings: SiteSetting
}

/** Penutup: ajakan dua baris di atas nama merek yang terpotong di tepi bawah layar. */
export const SiteFooter: React.FC<SiteFooterProps> = ({ settings }) => {
  const footerLinks = settings.footerLinks ?? []
  const legalLinks = settings.legalLinks ?? []
  const whatsappHref = settings.whatsappNumber ? `https://wa.me/${settings.whatsappNumber}` : null
  const emailHref = settings.contactEmail ? `mailto:${settings.contactEmail}` : null

  return (
    <footer className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden bg-night text-paper">
      <div className="wrap grid12 gap-y-10 pt-20 md:pt-28">
        <div className="col-span-12 md:col-span-7">
          <p data-reveal className="t-big max-w-[12ch]">
            {settings.invitation}
          </p>
          <Link data-reveal style={{ '--i': 1 } as React.CSSProperties} href={DEMO_HREF} className="btn btn-on-dark mt-10">
            {settings.invitationButton}
          </Link>
        </div>

        <ul className="col-span-12 space-y-2 md:col-span-3 md:col-start-10">
          {footerLinks.map((link) => (
            <li key={link.id ?? link.href}>
              <Link href={link.href} className="link">
                {link.label}
              </Link>
            </li>
          ))}
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
                Email
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="relative">
        <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2 pb-3 text-[1.0625rem] text-paper/80">
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
        <p
          aria-hidden
          className="wrap translate-y-[26%] whitespace-nowrap text-[min(30vw,32rem)] font-extrabold leading-[0.8] tracking-[-0.07em] text-paper"
        >
          {settings.brandName}
        </p>
      </div>
    </footer>
  )
}
