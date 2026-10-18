import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

import { redirects } from './redirects'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const DEFAULT_CMS_URL = 'http://localhost:3001'
const cmsUrl = new URL(process.env.NEXT_PUBLIC_CMS_URL ?? DEFAULT_CMS_URL)

const nextConfig: NextConfig = {
  images: {
    qualities: [100],
    remotePatterns: [
      {
        hostname: cmsUrl.hostname,
        port: cmsUrl.port,
        protocol: cmsUrl.protocol.replace(':', '') as 'http' | 'https',
      },
    ],
  },
  reactStrictMode: true,
  redirects,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default nextConfig
