/** Warna aksen dan label bagian. Hanya presentasi; teksnya datang dari CMS. */

export type AccentColor = 'teal' | 'orange' | 'purple' | 'blue' | 'yellow'
export type TagTone = 'orange' | 'purple' | 'teal' | 'yellow'

export const ACCENT_CYCLE: readonly AccentColor[] = ['orange', 'purple', 'teal', 'blue', 'yellow']

export const getAccentByIndex = (index: number): AccentColor => ACCENT_CYCLE[index % ACCENT_CYCLE.length]

export interface SectionTagContent {
  label: string
  tone: TagTone
}

const TAG_TONES: readonly TagTone[] = ['orange', 'purple', 'teal', 'yellow']

/** Label bagian dari teks CMS. Warnanya dipilih tetap dari isi teks, jadi label yang sama selalu berwarna sama. */
export const tagFor = (label: string | null | undefined): SectionTagContent | undefined => {
  const text = label?.trim()

  if (!text) return undefined

  const sum = [...text].reduce((total, char) => total + char.charCodeAt(0), 0)

  return { label: text, tone: TAG_TONES[sum % TAG_TONES.length] }
}

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
