import type { Page } from "@/types/cms";

import type { BlockContext } from "./types";

type Block = Extract<Page["layout"][number], { blockType: "textSections" }>;

/** Isi teks: baris kosong memisah paragraf, baris berawalan "- " menjadi daftar. */
function renderBody(body: string) {
  return body
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk, index) => {
      const lines = chunk.split("\n").map((line) => line.trim());

      if (lines.every((line) => line.startsWith("- "))) {
        return (
          <ul key={index}>
            {lines.map((line) => (
              <li key={line}>{line.slice(2)}</li>
            ))}
          </ul>
        );
      }

      return <p key={index}>{lines.join(" ")}</p>;
    });
}

/** Teks panjang berjudul untuk halaman hukum, dalam kartu putih berradius besar. */
export function TextSectionsBlock({ block }: { block: Block; ctx: BlockContext }) {
  return (
    <article className="container pb-20">
      <div className="legal-text rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.35)] md:p-10">
        {(block.sections ?? []).map((section) => (
          <div key={section.id ?? section.heading ?? section.body.slice(0, 20)}>
            {section.heading && <h2>{section.heading}</h2>}
            {renderBody(section.body)}
          </div>
        ))}
      </div>
    </article>
  );
}
