declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_URL: string
      NEXT_PUBLIC_CMS_URL: string
      PREVIEW_SECRET: string
      REVALIDATE_SECRET: string
      VERCEL_PROJECT_PRODUCTION_URL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
