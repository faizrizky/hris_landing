import Image from 'next/image'
import React from 'react'

interface PastPicturesProps {
  sentence: string
  credit: string
}

/**
 * Dua foto arsip tentang cara absen dulu (kartu dan mesin pencatat waktu), disandingkan dengan satu
 * pernyataan tentang cara sekarang. Foto menunjukkan dunia absensi, bukan produk atau pelanggan kita.
 */
export const PastPictures: React.FC<PastPicturesProps> = ({ sentence, credit }) => (
  <section className="py-[calc(var(--section)/2)]" aria-label="Dulu dan sekarang">
    <div className="wrap grid12 items-start gap-y-10">
      <figure data-reveal className="col-span-12 lg:col-span-7">
        <Image
          src="/pictures/a-day-in-the-life-of-a.jpg"
          width={1300}
          height={994}
          sizes="(min-width: 1024px) 58vw, 100vw"
          alt="Seorang pekerja pabrik menyelipkan kartu absen ke mesin pencatat waktu, dengan barisan rekan kerja menunggu di belakangnya"
          className="h-auto w-full"
        />
      </figure>

      <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:mt-28">
        <figure data-reveal style={{ '--i': 1 } as React.CSSProperties}>
          <Image
            src="/pictures/time-clock-at-wookey-hole-cave-museum.jpg"
            width={1920}
            height={1440}
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt="Mesin pencatat waktu dari kayu dengan jam dinding dan rak kartu absen di kiri dan kanannya"
            className="h-auto w-full"
          />
        </figure>
        <p data-reveal style={{ '--i': 2 } as React.CSSProperties} className="t-statement mt-8 max-w-[34ch]">
          {sentence}
        </p>
        <p data-reveal style={{ '--i': 3 } as React.CSSProperties} className="mt-5 max-w-[52ch] text-ink-soft">
          {credit}
        </p>
      </div>
    </div>
  </section>
)
