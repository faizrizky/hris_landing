import {
  BarChart3,
  CalendarDays,
  Calculator,
  Clock,
  FileText,
  Hourglass,
  Lock,
  Settings2,
  MessageCircle,
  Star,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import React from 'react'

import type { FeatureCategoryId } from '@/features/site/content/labels'

import type { AccentColor } from '@/features/home/content/tones'

import { GlyphBadge, type BadgeShape } from './glyph-badge'

/** Ikon per kategori fitur, supaya tiap bagian punya lencana sendiri. */
export const CATEGORY_ICON: Record<FeatureCategoryId, LucideIcon> = {
  attendance: Clock,
  requests: CalendarDays,
  payroll: Wallet,
  team: Users,
  hradmin: Settings2,
  documents: FileText,
  security: Lock,
  performance: Star,
  planned: Hourglass,
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

export const UsersBadge: React.FC = () => <GlyphBadge icon={Users} accent="teal" shape="circle" />
export const CalculatorBadge: React.FC = () => <GlyphBadge icon={Calculator} accent="yellow" shape="hexagon" />
export const WalletBadge: React.FC = () => <GlyphBadge icon={Wallet} accent="purple" shape="square" />
export const ChatBadge: React.FC = () => <GlyphBadge icon={MessageCircle} accent="blue" shape="circle" />
export const ChartBadge: React.FC = () => <GlyphBadge icon={BarChart3} accent="teal" shape="hexagon" />
export const CalendarBadge: React.FC = () => <GlyphBadge icon={CalendarDays} accent="purple" shape="shield" />
