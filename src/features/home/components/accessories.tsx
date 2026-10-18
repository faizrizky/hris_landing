import React from 'react'

/** Perisai dengan centang: pengganti roket di pita absensi (identitas terverifikasi). */
export const ShieldCheckBadge: React.FC = () => (
  <svg aria-hidden width="92" height="108" viewBox="0 0 92 108" fill="none">
    <path
      d="M46 4 L84 18 V52 C84 78 66 96 46 104 C26 96 8 78 8 52 V18 Z"
      className="fill-accent-orange"
    />
    <path d="M46 4 L84 18 V52 C84 78 66 96 46 104 Z" className="fill-black/10" />
    <path
      d="M28 54 L42 68 L66 40"
      stroke="white"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/** Lingkaran centang besar: pengganti centang besar di pita approval. */
export const CheckCircleBadge: React.FC = () => (
  <svg aria-hidden width="96" height="96" viewBox="0 0 96 96" fill="none">
    <circle cx="48" cy="48" r="44" className="fill-accent-purple" />
    <circle cx="48" cy="48" r="44" className="fill-black/10" clipPath="inset(50% 0 0 0)" />
    <path
      d="M28 50 L42 64 L68 34"
      stroke="white"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
