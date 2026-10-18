import {
  BarChart3,
  CalendarDays,
  Calculator,
  Clock,
  FileText,
  Hourglass,
  Lock,
  MessageCircle,
  Star,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import React from 'react'

import type { FeatureCategoryId } from '@/features/site/content/labels'

import { GlyphBadge } from './glyph-badge'

/** Ikon per kategori fitur, supaya tiap bagian punya lencana sendiri. */
export const CATEGORY_ICON: Record<FeatureCategoryId, LucideIcon> = {
  attendance: Clock,
  requests: CalendarDays,
  payroll: Wallet,
  documents: FileText,
  security: Lock,
  performance: Star,
  planned: Hourglass,
}

export const CategoryBadge: React.FC<{ category: FeatureCategoryId }> = ({ category }) => (
  <GlyphBadge icon={CATEGORY_ICON[category]} accent="orange" shape="square" />
)

export const UsersBadge: React.FC = () => <GlyphBadge icon={Users} accent="teal" shape="circle" />
export const CalculatorBadge: React.FC = () => <GlyphBadge icon={Calculator} accent="yellow" shape="hexagon" />
export const WalletBadge: React.FC = () => <GlyphBadge icon={Wallet} accent="purple" shape="square" />
export const ChatBadge: React.FC = () => <GlyphBadge icon={MessageCircle} accent="blue" shape="circle" />
export const ChartBadge: React.FC = () => <GlyphBadge icon={BarChart3} accent="teal" shape="hexagon" />
export const CalendarBadge: React.FC = () => <GlyphBadge icon={CalendarDays} accent="purple" shape="shield" />
