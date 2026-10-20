import { appIcon, type IconComponent } from '@/components/app-icon'
import React from 'react'

import type { FeatureCategoryId } from '@/features/site/content/labels'

import type { AccentColor } from '@/features/home/content/tones'

import { GlyphBadge, type BadgeShape } from './glyph-badge'

/** Ikon per kategori fitur, supaya tiap bagian punya lencana sendiri. */
export const CATEGORY_ICON: Record<FeatureCategoryId, IconComponent> = {
  attendance: appIcon('clock'),
  requests: appIcon('leave'),
  payroll: appIcon('payslip'),
  team: appIcon('user'),
  hradmin: appIcon('briefcase'),
  documents: appIcon('document'),
  security: appIcon('shield'),
  performance: appIcon('appraisal'),
  planned: appIcon('overtime'),
}

/** Warna dan bentuk lencana tiap kategori, supaya daftar fitur tidak seragam satu warna. */
const CATEGORY_BADGE_STYLE: Record<FeatureCategoryId, { accent: AccentColor; shape: BadgeShape }> = {
  attendance: { accent: 'blue', shape: 'circle' },
  requests: { accent: 'purple', shape: 'square' },
  payroll: { accent: 'teal', shape: 'hexagon' },
  team: { accent: 'orange', shape: 'circle' },
  hradmin: { accent: 'yellow', shape: 'hexagon' },
  documents: { accent: 'teal', shape: 'square' },
  security: { accent: 'purple', shape: 'shield' },
  performance: { accent: 'orange', shape: 'hexagon' },
  planned: { accent: 'blue', shape: 'square' },
}

export const CategoryBadge: React.FC<{ category: FeatureCategoryId }> = ({ category }) => {
  const { accent, shape } = CATEGORY_BADGE_STYLE[category]
  return <GlyphBadge icon={CATEGORY_ICON[category]} accent={accent} shape={shape} />
}

export const UsersBadge: React.FC = () => <GlyphBadge icon={appIcon('user')} accent="teal" shape="circle" />
export const CalculatorBadge: React.FC = () => <GlyphBadge icon={appIcon('tax')} accent="yellow" shape="hexagon" />
export const WalletBadge: React.FC = () => <GlyphBadge icon={appIcon('payslip')} accent="purple" shape="square" />
export const ChatBadge: React.FC = () => <GlyphBadge icon={appIcon('bell')} accent="blue" shape="circle" />
export const ChartBadge: React.FC = () => <GlyphBadge icon={appIcon('attendanceRate')} accent="teal" shape="hexagon" />
export const CalendarBadge: React.FC = () => <GlyphBadge icon={appIcon('calendar')} accent="purple" shape="shield" />
