import React from 'react'

import { SiteShell } from '@/features/site/components/site-shell'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
