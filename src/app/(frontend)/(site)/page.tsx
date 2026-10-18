import type { Metadata } from 'next'

import { getHome, getHomeSolutions, getRealTestimonials, getSiteSettings } from '@/features/cms/loaders'
import { CallResponse } from '@/features/home/components/call-response'
import { ChecksTable } from '@/features/home/components/checks-table'
import { CtaWord } from '@/features/home/components/cta-word'
import { HeroStatement } from '@/features/home/components/hero-statement'
import { OfferSentence } from '@/features/home/components/offer-sentence'
import { PastPictures } from '@/features/home/components/past-pictures'
import { PosterList } from '@/features/home/components/poster-list'
import { QuoteField } from '@/features/home/components/quote-field'
import { SwitchBands } from '@/features/home/components/switch-bands'
import { ThreeStates } from '@/features/home/components/three-states'
import { ContentUnavailable } from '@/features/site/components/content-unavailable'
import { FaqIndented } from '@/features/site/components/faq-indented'

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getSiteSettings()

  if (!settings.isOk) return {}

  return {
    title: { absolute: settings.data.seoTitle ?? settings.data.brandName },
    description: settings.data.seoDescription ?? undefined,
  }
}

export default async function HomePage() {
  const [homeResult, solutionsResult, testimonialsResult] = await Promise.all([
    getHome(),
    getHomeSolutions(),
    getRealTestimonials(),
  ])

  if (!homeResult.isOk) return <ContentUnavailable message={homeResult.message} />

  const home = homeResult.data
  const solutions = solutionsResult.isOk ? solutionsResult.data : []
  const featuredTestimonial = testimonialsResult.isOk ? testimonialsResult.data[0] : undefined

  return (
    <>
      <HeroStatement home={home} />
      <ThreeStates heading={home.showcaseHeading} states={home.showcaseStates} row={home.showcaseRow} />
      <CallResponse heading={home.howHeading} steps={home.howSteps ?? []} />
      <SwitchBands items={home.switches ?? []} />
      <PastPictures sentence={home.pastSentence} credit={home.pastCredit} />
      {solutions.length > 0 && <PosterList solutions={solutions} />}
      <ChecksTable
        heading={home.checksHeading}
        recordTitle={home.recordTitle}
        records={home.records ?? []}
        rows={home.checks ?? []}
      />
      {featuredTestimonial && <QuoteField testimonial={featuredTestimonial} />}
      <OfferSentence
        sentence={home.offerSentence}
        action={home.offerAction}
        included={(home.offerIncluded ?? []).map((item) => item.text)}
      />
      <FaqIndented heading={home.faqHeading} items={home.faqItems ?? []} />
      <CtaWord word={home.ctaWord} sentence={home.ctaSentence} />
    </>
  )
}
