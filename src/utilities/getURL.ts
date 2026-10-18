import canUseDOM from './canUseDOM'

const DEFAULT_SITE_URL = 'http://localhost:3000'
const DEFAULT_CMS_URL = 'http://localhost:3001'

export const getServerSideURL = () => {
  return (
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : DEFAULT_SITE_URL)
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.SITE_URL || ''
}

/** Alamat hris-cms. Dipakai untuk API dan untuk URL media yang relatif. */
export const getCmsURL = () => process.env.NEXT_PUBLIC_CMS_URL || DEFAULT_CMS_URL
