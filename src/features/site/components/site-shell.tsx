import React from 'react'

import { SmoothScroll } from '@/features/home/components/smooth-scroll'
import { defaultLocale } from '@/lib/i18n/config'
import { getFeatures, getFooter, getNavigation, getSiteSettings, getSolutions } from '@/lib/cms/queries'

import { ContentUnavailable } from './content-unavailable'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

interface SiteShellProps {
  children: React.ReactNode
}

const DEFAULT_ACTION = { label: 'Minta demo', href: '/demo' }

/** Kerangka halaman: header dengan mega menu, isi halaman, dan footer. Data diambil dari CMS (Settings dan koleksi). */
export const SiteShell = async ({ children }: SiteShellProps) => {
  const [settings, navigation, footer, features, solutions] = await Promise.all([
    getSiteSettings(defaultLocale),
    getNavigation(defaultLocale),
    getFooter(defaultLocale),
    getFeatures(defaultLocale),
    getSolutions(defaultLocale),
  ])

  if (!settings) return <ContentUnavailable message="Pengaturan situs belum bisa dimuat dari CMS." />

  const navLinks = (navigation?.links ?? []).filter((link) => link.visible !== false)

  return (
    <>
      <SmoothScroll />
      <SiteHeader
        brandName={settings.siteName}
        action={navigation?.cta ?? DEFAULT_ACTION}
        featuresLabel={navigation?.featuresLabel ?? 'Fitur'}
        solutionsLabel={navigation?.solutionsLabel ?? 'Solusi'}
        navLinks={navLinks.map(({ label, href }) => ({ label, href }))}
        features={features}
        solutions={solutions}
      />
      <main id="isi">{children}</main>
      <SiteFooter settings={settings} footer={footer} />
    </>
  )
}
