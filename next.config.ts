import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const DEFAULT_CMS_URL = 'http://localhost:3001'
const cmsUrl = new URL(process.env.CMS_PUBLIC_URL ?? DEFAULT_CMS_URL)

/** Alamat jaringan lokal yang boleh membuka server dev (HP, laptop lain). Tanpa ini JS dev diblokir dan animasi mati. */
const DEV_ALLOWED_ORIGINS = ['192.168.*.*', '10.*.*.*', '172.16.*.*', '*.local']

/** Alamat CMS yang dipakai server landing untuk mengambil file media. */
const CMS_SERVER_ORIGIN = new URL(process.env.CMS_URL ?? DEFAULT_CMS_URL).origin

const nextConfig: NextConfig = {
  allowedDevOrigins: DEV_ALLOWED_ORIGINS,
  async rewrites() {
    return [{ source: '/api/media/file/:path*', destination: `${CMS_SERVER_ORIGIN}/api/media/file/:path*` }]
  },
  images: {
    qualities: [100],
    remotePatterns: [
      // File media di produksi disimpan di Vercel Blob.
      { hostname: '*.public.blob.vercel-storage.com', protocol: 'https' },
      {
        hostname: cmsUrl.hostname,
        port: cmsUrl.port,
        protocol: cmsUrl.protocol.replace(':', '') as 'http' | 'https',
      },
    ],
  },
  reactStrictMode: true,
  devIndicators: false,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default nextConfig
