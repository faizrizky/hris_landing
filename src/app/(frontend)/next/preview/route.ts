import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export type PreviewSearchParams = {
  path: string
  previewSecret: string
}

const isSafeRelativePath = (path: string) => path.startsWith('/') && !path.startsWith('//')

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path) {
    return new Response('Insufficient search params', { status: 404 })
  }

  if (!isSafeRelativePath(path)) {
    return new Response('This endpoint can only be used for relative previews', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
