'use client'

import Link from 'next/link'
import React, { useCallback, useRef, useState } from 'react'

import type { Feature, Solution } from '@/types/cms'
import { MegaPanel } from './mega-panel'
import { BrandLogo } from '@/features/home/components/decorations'

import {
  FEATURE_CATEGORY_DESCRIPTION,
  FEATURE_CATEGORY_LABEL,
  FEATURE_CATEGORY_ORDER,
  FEATURE_STATUS,
  FEATURE_STATUS_LABEL,
  SOLUTION_TYPE,
  SOLUTION_TYPE_LABEL,
  type FeatureCategoryId,
  type SolutionTypeId,
} from '../content/labels'
import { useBodyScrollLock } from '../hooks/use-body-scroll-lock'
import { useDismissOnOutside } from '../hooks/use-dismiss-on-outside'

const MENU_ID = { FEATURES: 'features', SOLUTIONS: 'solutions' } as const

type MenuId = (typeof MENU_ID)[keyof typeof MENU_ID]

interface NavLink {
  label: string
  href: string
}

interface SiteHeaderProps {
  brandName: string
  action: { label: string; href: string }
  featuresLabel: string
  solutionsLabel: string
  navLinks: NavLink[]
  features: Feature[]
  solutions: Solution[]
}

const MENU_BUTTON_CLASS =
  'inline-flex items-center gap-1 py-2 transition-colors hover:text-ink aria-expanded:text-ink'

const SOLUTION_TYPES: SolutionTypeId[] = [SOLUTION_TYPE.INDUSTRY, SOLUTION_TYPE.SCALE]

/**
 * Header datar: nama merek di kiri; menu, tautan, dan satu aksi di kanan. Menu Fitur dan Solusi membuka
 * panel penuh di bawah header (daftar kategori di kiri, item berupa teks di kanan), tanpa ikon atau kartu.
 */
export const SiteHeader: React.FC<SiteHeaderProps> = ({
  brandName,
  action,
  featuresLabel,
  solutionsLabel,
  navLinks,
  features,
  solutions,
}) => {
  const headerRef = useRef<HTMLElement>(null)
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const [activeCategory, setActiveCategory] = useState<FeatureCategoryId>(FEATURE_CATEGORY_ORDER[0])
  const [activeSolutionType, setActiveSolutionType] = useState<SolutionTypeId>(SOLUTION_TYPE.INDUSTRY)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const closeMenus = useCallback(() => setOpenMenu(null), [])
  const closeAll = useCallback(() => {
    setOpenMenu(null)
    setIsSheetOpen(false)
  }, [])

  useDismissOnOutside(headerRef, openMenu !== null, closeMenus)
  useBodyScrollLock(isSheetOpen)

  const handleToggleMenu = (menuId: MenuId) => setOpenMenu((current) => (current === menuId ? null : menuId))

  const categoriesWithFeatures = FEATURE_CATEGORY_ORDER.filter((categoryId) =>
    features.some((feature) => feature.category === categoryId),
  )
  const activeFeatures = features.filter((feature) => feature.category === activeCategory)
  const activeSolutions = solutions.filter((solution) => solution.type === activeSolutionType)

  return (
    <header ref={headerRef} className="absolute inset-x-0 top-0 z-30">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" onClick={closeAll} aria-label={`${brandName}, ke beranda`}>
          <BrandLogo name={brandName} tone="dark" />
        </Link>

        <nav aria-label="Menu utama" className="hidden items-center gap-7 text-sm font-medium text-ink-muted lg:flex">
          <button
            type="button"
            className={MENU_BUTTON_CLASS}
            aria-expanded={openMenu === MENU_ID.FEATURES}
            aria-controls="menu-fitur"
            onClick={() => handleToggleMenu(MENU_ID.FEATURES)}
          >
            {featuresLabel}
          </button>
          <button
            type="button"
            className={MENU_BUTTON_CLASS}
            aria-expanded={openMenu === MENU_ID.SOLUTIONS}
            aria-controls="menu-solusi"
            onClick={() => handleToggleMenu(MENU_ID.SOLUTIONS)}
          >
            {solutionsLabel}
          </button>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeAll} className="py-2 transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
          <Link href={action.href} onClick={closeAll} className="btn min-h-0 px-5 py-2 text-xs">
            {action.label}
          </Link>
        </nav>

        <button
          type="button"
          className="py-2 text-[1.0625rem] font-semibold lg:hidden"
          aria-expanded={isSheetOpen}
          aria-controls="menu-sheet"
          onClick={() => setIsSheetOpen((current) => !current)}
        >
          {isSheetOpen ? 'Tutup' : 'Menu'}
        </button>
      </div>

      {openMenu === MENU_ID.FEATURES && (
        <MegaPanel id="menu-fitur" revision={activeCategory}>
          <div className="container grid12 py-10">
            <ul className="col-span-3 space-y-1">
              {categoriesWithFeatures.map((categoryId) => (
                <li key={categoryId} data-menu-item>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(categoryId)}
                    aria-pressed={activeCategory === categoryId}
                    className={`py-1.5 text-left text-[1.0625rem] transition-colors ${
                      activeCategory === categoryId ? 'font-bold text-accent-deep' : 'text-ink hover:text-accent-deep'
                    }`}
                  >
                    {FEATURE_CATEGORY_LABEL[categoryId]}
                  </button>
                </li>
              ))}
            </ul>
            <div className="col-span-9">
              <p data-menu-item className="max-w-[60ch] text-ink-soft">{FEATURE_CATEGORY_DESCRIPTION[activeCategory]}</p>
              <ul className="mt-6 grid grid-cols-3 gap-x-8 gap-y-6">
                {activeFeatures.map((feature) => (
                  <li key={feature.id} data-menu-item>
                    <Link href={`/fitur/${feature.slug}`} onClick={closeAll} className="group block">
                      <span className="block font-semibold group-hover:text-accent-deep">{feature.name}</span>
                      <span className="mt-0.5 block text-ink-soft">{feature.shortDescription}</span>
                      {feature.availability !== FEATURE_STATUS.AVAILABLE && (
                        <span className="mt-0.5 block font-semibold text-ink-soft">
                          {FEATURE_STATUS_LABEL[feature.availability]}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/fitur" onClick={closeAll} data-menu-item className="link mt-8 inline-block font-semibold">
                Lihat semua fitur →
              </Link>
            </div>
          </div>
        </MegaPanel>
      )}

      {openMenu === MENU_ID.SOLUTIONS && (
        <MegaPanel id="menu-solusi" revision={activeSolutionType}>
          <div className="container grid12 py-10">
            <ul className="col-span-3 space-y-1">
              {SOLUTION_TYPES.map((typeId) => (
                <li key={typeId} data-menu-item>
                  <button
                    type="button"
                    onClick={() => setActiveSolutionType(typeId)}
                    aria-pressed={activeSolutionType === typeId}
                    className={`py-1.5 text-left text-[1.0625rem] transition-colors ${
                      activeSolutionType === typeId ? 'font-bold text-accent-deep' : 'text-ink hover:text-accent-deep'
                    }`}
                  >
                    {SOLUTION_TYPE_LABEL[typeId]}
                  </button>
                </li>
              ))}
            </ul>
            <div className="col-span-9">
              <ul className="grid grid-cols-3 gap-x-8 gap-y-6">
                {activeSolutions.map((solution) => (
                  <li key={solution.id} data-menu-item>
                    <Link href={`/solusi/${solution.slug}`} onClick={closeAll} className="group block">
                      <span className="block font-semibold group-hover:text-accent-deep">{solution.name}</span>
                      <span className="mt-0.5 block text-ink-soft">{solution.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/solusi" onClick={closeAll} data-menu-item className="link mt-8 inline-block font-semibold">
                Lihat semua solusi →
              </Link>
            </div>
          </div>
        </MegaPanel>
      )}

      {isSheetOpen && (
        <div id="menu-sheet" className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-20 lg:hidden">
          <div className="container space-y-10 pb-16">
            <div>
              <p className="font-semibold text-ink-soft">{featuresLabel}</p>
              <ul className="mt-3 space-y-2">
                {features.map((feature) => (
                  <li key={feature.id}>
                    <Link href={`/fitur/${feature.slug}`} onClick={closeAll} className="text-[1.0625rem]">
                      {feature.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink-soft">{solutionsLabel}</p>
              <ul className="mt-3 space-y-2">
                {solutions.map((solution) => (
                  <li key={solution.id}>
                    <Link href={`/solusi/${solution.slug}`} onClick={closeAll} className="text-[1.0625rem]">
                      {solution.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={closeAll} className="text-[1.0625rem] font-semibold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={action.href} onClick={closeAll} className="btn w-full">
              {action.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
