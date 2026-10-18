import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { array, object, string, type InferType } from 'yup'

const REVALIDATE_SECRET_HEADER = 'x-revalidate-secret'
const CACHE_PROFILE = 'max'

const revalidateBodySchema = object({
  paths: array().of(string().required().matches(/^\//)).default([]),
  tags: array().of(string().required()).default([]),
})

type RevalidateBody = InferType<typeof revalidateBodySchema>

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret || request.headers.get(REVALIDATE_SECRET_HEADER) !== secret) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  let body: RevalidateBody

  try {
    body = await revalidateBodySchema.validate(await request.json(), { stripUnknown: true })
  } catch {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
  }

  const paths = body.paths ?? []
  const tags = body.tags ?? []

  paths.forEach((path) => revalidatePath(path))
  tags.forEach((tag) => revalidateTag(tag, CACHE_PROFILE))

  return NextResponse.json({ revalidated: true, paths, tags })
}
