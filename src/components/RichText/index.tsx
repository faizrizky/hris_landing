import {
  type DefaultNodeTypes,
  type SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { cn } from '@/utilities/ui'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc

  if (!doc || typeof doc.value !== 'object') return '/'

  return `/${(doc.value as { slug?: string }).slug ?? ''}`
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

interface RichTextProps {
  data: DefaultTypedEditorState
  className?: string
}

/** Teks kaya dari CMS (halaman hukum). Gayanya diatur kelas `legal-text` di globals.css. */
export default function RichText({ data, className }: RichTextProps) {
  return <ConvertRichText converters={jsxConverters} data={data} className={cn('legal-text', className)} />
}
