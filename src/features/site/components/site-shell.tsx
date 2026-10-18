import React from 'react'

import { getFeatureSummaries, getSiteSettings, getSolutionSummaries } from '@/features/cms/loaders'

import { SmoothScroll } from '@/features/home/components/smooth-scroll'

import { ContentUnavailable } from './content-unavailable'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

interface SiteShellProps {
  children: React.ReactNode
}

/** Kerangka halaman: header dengan mega menu, isi halaman, dan footer. Data diambil dari CMS. */
export const SiteShell = async ({ children }: SiteShellProps) => {
  const [settingsResult, featuresResult, solutionsResult] = await Promise.all([
    getSiteSettings(),
    getFeatureSummaries(),
    getSolutionSummaries(),
  ])

  if (!settingsResult.isOk) return <ContentUnavailable message={settingsResult.message} />

  const settings = settingsResult.data
  const features = featuresResult.isOk ? featuresResult.data : []
  const solutions = solutionsResult.isOk ? solutionsResult.data : []

  return (
    <>
      <SmoothScroll />
      <SiteHeader
        brandName={settings.brandName}
        actionLabel={settings.actionLabel}
        navLinks={(settings.navLinks ?? []).map(({ label, href }) => ({ label, href }))}
        features={features}
        solutions={solutions}
      />
      <main id="isi">{children}</main>
      <SiteFooter settings={settings} />
    </>
  )
}
