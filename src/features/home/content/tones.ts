import type { PageCopy } from '@/payload-types'

/** Warna aksen dan label bagian di beranda. Hanya presentasi; teksnya datang dari CMS atau konstanta di sini. */

export type AccentColor = 'teal' | 'orange' | 'purple' | 'blue' | 'yellow'
export type TagTone = 'orange' | 'purple' | 'teal' | 'yellow'

export const ACCENT_CYCLE: readonly AccentColor[] = ['orange', 'purple', 'teal', 'blue', 'yellow']

export const getAccentByIndex = (index: number): AccentColor => ACCENT_CYCLE[index % ACCENT_CYCLE.length]

export interface SectionTagContent {
  label: string
  tone: TagTone
}

export const SECTION_TAG_KEYS = ['attendance', 'requests', 'approval', 'modules', 'industries', 'testimonials', 'pricing', 'faq'] as const

export type SectionTagKey = (typeof SECTION_TAG_KEYS)[number]
export type SectionTags = Record<SectionTagKey, SectionTagContent>

/** Warna label tiap bagian. Teks labelnya datang dari CMS (Teks Halaman). */
const SECTION_TAG_TONES: Record<SectionTagKey, TagTone> = {
  attendance: 'orange',
  requests: 'purple',
  approval: 'teal',
  modules: 'orange',
  industries: 'teal',
  testimonials: 'yellow',
  pricing: 'purple',
  faq: 'orange',
}

export const buildSectionTags = (copy: PageCopy): SectionTags => ({
  attendance: { label: copy.tagAttendance, tone: SECTION_TAG_TONES.attendance },
  requests: { label: copy.tagRequests, tone: SECTION_TAG_TONES.requests },
  approval: { label: copy.tagApproval, tone: SECTION_TAG_TONES.approval },
  modules: { label: copy.tagModules, tone: SECTION_TAG_TONES.modules },
  industries: { label: copy.tagIndustries, tone: SECTION_TAG_TONES.industries },
  testimonials: { label: copy.tagTestimonials, tone: SECTION_TAG_TONES.testimonials },
  pricing: { label: copy.tagPricing, tone: SECTION_TAG_TONES.pricing },
  faq: { label: copy.tagFaq, tone: SECTION_TAG_TONES.faq },
})

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
