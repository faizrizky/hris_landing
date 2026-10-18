import { ChevronDown } from 'lucide-react'
import React from 'react'

interface FaqEntry {
  id?: string | null
  question: string
  answer: string
}

interface FaqIndentedProps {
  heading: string
  items: FaqEntry[]
}

/** Judul di kiri, daftar pertanyaan bergaris di kanan. Memakai <details> agar jalan dengan keyboard tanpa skrip. */
export const FaqIndented: React.FC<FaqIndentedProps> = ({ heading, items }) => (
  <section id="faq" className="py-[calc(var(--section)/1.4)]" aria-labelledby="judul-faq">
    <div className="wrap grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <h2 id="judul-faq" data-reveal className="t-big max-w-[10ch]">
        {heading}
      </h2>

      <div className="border-t border-ink">
        {items.map((item, index) => (
          <details
            key={item.id ?? item.question}
            data-reveal
            style={{ '--i': Math.min(index, 4) } as React.CSSProperties}
            className="group border-b border-line py-1"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.125rem] font-semibold [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden
                className="size-5 shrink-0 transition-transform duration-[var(--t-ui)] group-open:rotate-180"
                strokeWidth={2}
              />
            </summary>
            <p className="max-w-[52ch] pb-5 text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)
