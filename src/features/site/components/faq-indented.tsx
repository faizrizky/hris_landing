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

/** Judul lebar di kiri, pertanyaan menjorok mulai kolom 5. Memakai <details> agar jalan dengan keyboard tanpa skrip. */
export const FaqIndented: React.FC<FaqIndentedProps> = ({ heading, items }) => (
  <section id="faq" className="py-[calc(var(--section)/2)]" aria-labelledby="judul-faq">
    <div className="wrap">
      <h2 id="judul-faq" data-reveal className="t-big max-w-[14ch]">
        {heading}
      </h2>

      <div className="mt-14 grid12 md:mt-20">
        <div className="col-span-12 md:col-span-8 md:col-start-5">
          {items.map((item, index) => (
            <details
              key={item.id ?? item.question}
              data-reveal
              style={{ '--i': Math.min(index, 4) } as React.CSSProperties}
              className="group px-4 py-4 open:bg-paper-2 md:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-2 text-[1.25rem] [&::-webkit-details-marker]:hidden md:text-[1.5rem]">
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden
                  className="size-5 shrink-0 transition-transform duration-[var(--t-ui)] group-open:rotate-180"
                  strokeWidth={2}
                />
              </summary>
              <p className="mt-3 max-w-[48ch] pb-2 text-[1.0625rem]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
)
