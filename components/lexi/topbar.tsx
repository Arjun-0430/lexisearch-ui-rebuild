'use client'

import { Bell, ChevronRight, Command, Search } from 'lucide-react'
import { useApp, type Route } from './app-context'
import { StatusDot } from './primitives'

const TITLES: Record<Route, string> = {
  login: 'Login',
  dashboard: 'Dashboard',
  search: 'Search',
  'bulk-search': 'Bulk Search',
  reports: 'Reports',
  analytics: 'Analytics',
  'ai-insights': 'AI Insights',
  'risk-profiles': 'Risk Profiles',
  performance: 'Performance',
  'api-dashboard': 'API Dashboard',
  'system-monitoring': 'System Monitoring',
  'ai-models': 'AI Models',
  'user-management': 'User Management',
  'tenant-management': 'Tenant Management',
  'hr-dashboard': 'HR Dashboard',
  'platform-billing': 'Platform Billing',
  alerts: 'Alerts',
  settings: 'Settings',
  'case-detail': 'Case Detail',
}

export function Topbar() {
  const { route, role } = useApp()
  return (
    <header className="glass sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-white/10 px-6">
      <nav className="flex items-center gap-2 text-sm">
        <span className="text-tmuted">Lexisearch</span>
        <ChevronRight className="size-3.5 text-tmuted" />
        <span className="font-medium text-tprimary">{TITLES[route]}</span>
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <button className="neu-inset flex h-8 items-center gap-2 rounded-lg px-3 text-xs text-tsecondary transition hover:text-tprimary">
          <Search className="size-3.5" />
          <span className="hidden sm:inline">Quick search</span>
          <span className="ml-1 hidden items-center gap-0.5 rounded bg-white/5 px-1.5 py-0.5 text-[10px] sm:flex">
            <Command className="size-2.5" />K
          </span>
        </button>

        <span className="flex items-center gap-1.5 rounded-full bg-risk-green/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-risk-green">
          <StatusDot tone="green" /> Production
        </span>

        <button
          aria-label="Notifications"
          className="relative neu-raised rounded-lg p-2 text-tsecondary hover:text-tprimary"
        >
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-gold" />
        </button>

        <div className="flex items-center gap-2 rounded-full border border-white/10 py-1 pl-1 pr-3">
          <div className="flex size-7 items-center justify-center rounded-full bg-surface-3 text-[11px] font-bold text-gold">
            AR
          </div>
          <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-gold sm:inline">
            {role}
          </span>
        </div>
      </div>
    </header>
  )
}
