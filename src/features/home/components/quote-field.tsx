import React from 'react'

import type { Testimonial } from '@/payload-types'

interface QuoteFieldProps {
  testimonial: Testimonial
}

/** Satu kutipan asli di atas bidang warna penuh. Hanya dirender jika ada testimoni asli. */
export const QuoteField: React.FC<QuoteFieldProps> = ({ testimonial }) => (
  <section className="bg-accent py-24 text-ink md:py-36">
    <figure className="wrap grid12">
      <blockquote data-reveal className="t-head col-span-12 max-w-[26ch] md:col-span-8 md:col-start-3">
        {testimonial.quote}
      </blockquote>
      <figcaption data-reveal className="col-span-12 mt-8 md:col-span-8 md:col-start-3">
        <span className="font-semibold">{testimonial.name}</span>
        <span className="block">{testimonial.role}</span>
      </figcaption>
    </figure>
  </section>
)
