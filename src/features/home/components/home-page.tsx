import React from 'react'

import { APPROVAL_BAND, ATTENDANCE_BAND } from '../content/home-content'
import { CheckCircleBadge, ShieldCheckBadge } from './accessories'
import { CtaFooterSection } from './cta-footer-section'
import { FaqSection } from './faq-section'
import { FeatureBand } from './feature-band'
import { HeroSection } from './hero-section'
import { HomeHeader } from './home-header'
import { IndustriesSection } from './industries-section'
import { ModulesSection } from './modules-section'
import { ApprovalScreen } from './phone-screens/approval-screen'
import { FaceClockScreen } from './phone-screens/face-clock-screen'
import { PhoneFrame } from './phone-frame'
import { PricingSection } from './pricing-section'
import { RequestsSection } from './requests-section'
import { SmoothScroll } from './smooth-scroll'
import { TestimonialsSection } from './testimonials-section'
import { TrustPointsSection } from './trust-points-section'

/**
 * Beranda: hero, poin kepercayaan, absensi, pengajuan, approval, peta modul, solusi industri,
 * testimoni, harga, FAQ, lalu penutup gelap dengan footer.
 */
export const HomePage: React.FC = () => (
  <main className="bg-white text-ink">
    <SmoothScroll />
    <HomeHeader />
    <HeroSection />
    <TrustPointsSection />
    <FeatureBand
      content={ATTENDANCE_BAND}
      tintClassName="bg-tint-sky"
      accessory={<ShieldCheckBadge />}
    >
      <PhoneFrame tone="sky">
        <FaceClockScreen />
      </PhoneFrame>
    </FeatureBand>
    <RequestsSection />
    <FeatureBand
      content={APPROVAL_BAND}
      tintClassName="bg-tint-lavender"
      accessory={<CheckCircleBadge />}
    >
      <PhoneFrame tone="lavender">
        <ApprovalScreen />
      </PhoneFrame>
    </FeatureBand>
    <ModulesSection />
    <IndustriesSection />
    <TestimonialsSection />
    <PricingSection />
    <FaqSection />
    <CtaFooterSection />
  </main>
)
