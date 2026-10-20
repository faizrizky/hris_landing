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

/** Lonceng notifikasi dengan titik oranye: penanda pengajuan baru. */
export const BellBadge: React.FC = () => (
  <svg aria-hidden width="96" height="104" viewBox="0 0 96 104" fill="none">
    <path
      d="M48 8c-18 0-30 13-30 31v18l-8 14c-1.5 3 .5 6 4 6h68c3.500 0 5.500-3 4-6l-8-14V39C78 21 66 8 48 8z"
      className="fill-accent-purple"
    />
    <path d="M36 82a12 12 0 0 0 24 0z" className="fill-phone-lavender" />
    <circle cx="70" cy="22" r="11" className="fill-accent-orange" />
  </svg>
)
