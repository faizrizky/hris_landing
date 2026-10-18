/** Hanya pin di layar lebar dan jika user tidak meminta gerakan dikurangi. */
export const PINNED_MEDIA_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
export const PINNED_CLASS_NAME = 'is-pinned'

export const PANEL_SELECTOR = '[data-story-panel]'
export const CHIP_SELECTOR = '[data-story-chip]'

/** Jarak scroll per langkah, dalam persen tinggi viewport. */
export const SCROLL_DISTANCE_PER_STEP_PERCENT = 100
export const SCRUB_SMOOTHING_SECONDS = 0.6

export const STEP_TRANSITION_SECONDS = 0.5
export const PANEL_ENTER_DELAY_SECONDS = 0.1
export const CHIP_ENTER_DELAY_SECONDS = 0.3
export const CHIP_STAGGER_SECONDS = 0.12
export const CHIP_DURATION_SECONDS = 0.4
export const CHIP_OFFSET_PX = 16
export const PANEL_OFFSET_PX = 24
export const HOLD_LAST_STEP_SECONDS = 0.5
