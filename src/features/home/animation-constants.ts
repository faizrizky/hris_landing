export const MOTION_OK_QUERY = '(prefers-reduced-motion: no-preference)'
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** Atribut data yang dibaca hook animasi. */
export const REVEAL_SELECTOR = '[data-reveal]'
export const PARALLAX_SELECTOR = '[data-parallax]'
export const FLOAT_SELECTOR = '[data-float]'
export const DRAW_SELECTOR = '[data-draw]'

export const MS_PER_SECOND = 1000

/** Smooth scroll (Lenis) */
export const SMOOTH_SCROLL_DURATION_SECONDS = 1.1
export const GSAP_LAG_THRESHOLD_MS = 500
export const GSAP_LAG_ADJUSTED_MS = 33

/** Reveal saat masuk viewport */
export const REVEAL_OFFSET_PX = 32
export const REVEAL_DURATION_SECONDS = 0.8
export const REVEAL_STAGGER_SECONDS = 0.12
export const REVEAL_START = 'top 85%'

/** Parallax: elemen bergerak sejauh (kecepatan x jarak dasar) selama section melintas */
export const PARALLAX_BASE_DISTANCE_PX = 160
export const PARALLAX_SCRUB_SECONDS = 0.6

/** Melayang pelan */
export const FLOAT_DISTANCE_PX = 10
export const FLOAT_DURATION_SECONDS = 3
export const FLOAT_STAGGER_SECONDS = 0.4

/** Garis SVG yang digambar */
export const DRAW_DURATION_SECONDS = 1.6
export const DRAW_START = 'top 90%'

/** Intro hero */
export const HERO_WORD_DURATION_SECONDS = 0.9
export const HERO_WORD_STAGGER_SECONDS = 0.12
export const HERO_WORD_START_PERCENT = 110
export const HERO_FADE_DURATION_SECONDS = 0.7
export const HERO_FADE_OFFSET_PX = 24
export const HERO_CARD_DURATION_SECONDS = 0.9
export const HERO_CARD_STAGGER_SECONDS = 0.12
export const HERO_CARD_OFFSET_PX = 48
export const HERO_CARD_START_SCALE = 0.92
export const HERO_CARD_OVERLAP_SECONDS = 0.6

/** Kartu testimoni */
export const TESTIMONIAL_START = 'top 70%'
export const TESTIMONIAL_DURATION_SECONDS = 0.9
export const TESTIMONIAL_STAGGER_SECONDS = 0.18
export const TESTIMONIAL_OFFSET_PX = 120
export const TESTIMONIAL_START_ROTATION_DEG = 12

/** Daftar approval (centang berurutan) */
export const CHECKLIST_START = 'top 65%'
export const CHECKLIST_ITEM_GAP_SECONDS = 0.7
export const CHECKLIST_FILL_SECONDS = 0.3
export const CHECKLIST_DRAW_SECONDS = 0.35
export const CHECKLIST_BADGE_SECONDS = 0.25

/** Pemindaian wajah (diulang selama terlihat) */
export const FACE_SCAN_START = 'top 80%'
export const FACE_SCAN_END = 'bottom 20%'
export const FACE_SCAN_TRAVEL_PX = 128
export const FACE_SCAN_SWEEP_SECONDS = 0.9
export const FACE_SCAN_SWEEP_REPEATS = 2
export const FACE_SCAN_RESULT_SECONDS = 0.4
export const FACE_SCAN_CHIP_STAGGER_SECONDS = 0.2
export const FACE_SCAN_LOOP_DELAY_SECONDS = 2

/** HP naik dari bawah saat pita masuk layar, lalu objek (pengganti roket) muncul membal */
export const PHONE_ENTRANCE_START = 'top 75%'
export const PHONE_ENTRANCE_OFFSET_PX = 280
export const PHONE_ENTRANCE_START_SCALE = 0.9
export const PHONE_ENTRANCE_DURATION_SECONDS = 1.1
export const POP_START_SCALE = 0
export const POP_START_ROTATION_DEG = -25
export const POP_DURATION_SECONDS = 0.7
export const POP_DELAY_SECONDS = 0.6
