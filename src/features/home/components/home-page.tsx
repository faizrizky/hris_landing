import React from 'react'

import type { FeatureSummary } from '@/features/cms/loaders'
import type { Home, Solution, Testimonial } from '@/payload-types'

import { SECTION_TAGS } from '../content/tones'
import { CheckCircleBadge, ShieldCheckBadge } from './accessories'
import { CtaSection } from './cta-section'
import { FaqSection } from './faq-section'
import { FeatureBand } from './feature-band'
import { HeroSection } from './hero-section'
import { IndustriesSection } from './industries-section'
import { ModulesSection } from './modules-section'
import { ApprovalScreen } from './phone-screens/approval-screen'
import { FaceClockScreen } from './phone-screens/face-clock-screen'
import { PhoneFrame } from './phone-frame'
import { PricingSection } from './pricing-section'
import { RequestsSection } from './requests-section'
import { TestimonialsSection } from './testimonials-section'

const TESTIMONIALS_TITLE = 'Apa kata mereka tentang HRIS'

interface HomePageProps {
  home: Home
  features: FeatureSummary[]
  solutions: Solution[]
  testimonials: Testimonial[]
}

/** Beranda: hero, absensi, pengajuan, approval, fitur, solusi, testimoni asli, harga, FAQ, penutup. */
export const HomePage: React.FC<HomePageProps> = ({ home, features, solutions, testimonials }) => (
  <>
    <HeroSection home={home} />
    <FeatureBand
      id="absensi"
      tag={SECTION_TAGS.attendance}
      title={home.attendanceTitle}
      description={home.attendanceDescription}
      action={home.attendanceAction}
      tintClassName="bg-tint-sky"
      accessory={<ShieldCheckBadge />}
    >
      <PhoneFrame tone="sky">
        <FaceClockScreen home={home} />
      </PhoneFrame>
    </FeatureBand>
    <RequestsSection home={home} />
    <FeatureBand
      id="approval"
      tag={SECTION_TAGS.approval}
      title={home.approvalTitle}
      description={home.approvalDescription}
      action={home.approvalAction}
      tintClassName="bg-tint-lavender"
      accessory={<CheckCircleBadge />}
    >
      <PhoneFrame tone="lavender">
        <ApprovalScreen home={home} />
      </PhoneFrame>
    </FeatureBand>
    {features.length > 0 && <ModulesSection home={home} features={features} />}
    {solutions.length > 0 && <IndustriesSection home={home} solutions={solutions} />}
    {testimonials.length > 0 && <TestimonialsSection title={TESTIMONIALS_TITLE} testimonials={testimonials} />}
    <PricingSection home={home} />
    <FaqSection title={home.faqTitle} items={home.faqItems ?? []} />
    <CtaSection home={home} />
  </>
)
