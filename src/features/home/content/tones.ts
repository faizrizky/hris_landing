/** Warna aksen dan label bagian di beranda. Hanya presentasi; teksnya datang dari CMS atau konstanta di sini. */

export type AccentColor = 'teal' | 'orange' | 'purple' | 'blue' | 'yellow'
export type TagTone = 'orange' | 'purple' | 'teal' | 'yellow'

export const ACCENT_CYCLE: readonly AccentColor[] = ['orange', 'purple', 'teal', 'blue', 'yellow']

export const getAccentByIndex = (index: number): AccentColor => ACCENT_CYCLE[index % ACCENT_CYCLE.length]

export interface SectionTagContent {
  label: string
  tone: TagTone
}

export const SECTION_TAGS = {
  attendance: { label: 'ABSENSI', tone: 'orange' },
  requests: { label: 'PENGAJUAN', tone: 'purple' },
  approval: { label: 'APPROVAL', tone: 'teal' },
  modules: { label: 'FITUR', tone: 'orange' },
  industries: { label: 'SOLUSI', tone: 'teal' },
  testimonials: { label: 'TESTIMONI', tone: 'yellow' },
  pricing: { label: 'HARGA', tone: 'purple' },
  faq: { label: 'FAQ', tone: 'orange' },
} as const satisfies Record<string, SectionTagContent>

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
