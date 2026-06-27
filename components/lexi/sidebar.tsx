'use client'

import { cn } from '@/lib/utils'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Brain,
  Building,
  Code,
  Cpu,
  CreditCard,
  Database,
  FileText,
  LayoutDashboard,
  PanelLeft,
  Scale,
  Search,
  Settings,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { useApp, type Route } from './app-context'

const NAV: { label: string; icon: typeof LayoutDashboard; route: Route }[] = [
  { label: 'Dashboard', icon: LayoutDashboard, route: 'dashboard' },
  { label: 'Search', icon: Search, route: 'search' },
  { label: 'Bulk Search', icon: Database, route: 'bulk-search' },
  { label: 'Reports', icon: FileText, route: 'reports' },
  { label: 'Analytics', icon: BarChart3, route: 'analytics' },
  { label: 'AI Insights', icon: Brain, route: 'ai-insights' },
  { label: 'Risk Profiles', icon: AlertTriangle, route: 'risk-profiles' },
  { label: 'Performance', icon: Zap, route: 'performance' },
  { label: 'API Dashboard', icon: Code, route: 'api-dashboard' },
  { label: 'System Monitoring', icon: Activity, route: 'system-monitoring' },
  { label: 'AI Models', icon: Cpu, route: 'ai-models' },
  { label: 'User Management', icon: Users, route: 'user-management' },
  { label: 'Tenant Management', icon: Building, route: 'tenant-management' },
  { label: 'HR Dashboard', icon: UserCheck, route: 'hr-dashboard' },
  { label: 'Platform Billing', icon: CreditCard, route: 'platform-billing' },
  { label: 'Alerts', icon: Bell, route: 'alerts' },
  { label: 'Settings', icon: Settings, route: 'settings' },
]

export function Sidebar() {
  const { route, navigate, sidebarPinned, setSidebarPinned, role } = useApp()
  const [hover, setHover] = useState(false)
  const expanded = sidebarPinned || hover

  return (
    <aside
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        'glass fixed inset-y-0 left-0 z-30 flex flex-col border-r border-white/10 transition-[width] duration-300',
        expanded ? 'w-60' : 'w-16',
      )}
    >
      {/* Brand */}
      <div className="flex h-14 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold text-[#14110a]">
          <Scale className="size-5" />
        </div>
        <div className={cn('overflow-hidden transition-opacity', expanded ? 'opacity-100' : 'opacity-0')}>
          <p className="whitespace-nowrap text-sm font-bold text-tprimary">
            Lexisearch AI
          </p>
          <p className="whitespace-nowrap text-[10px] uppercase tracking-widest text-tmuted">
            Legal Intelligence
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto overflow-x-hidden px-2 py-3">
        <ul className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = route === item.route
            const Icon = item.icon
            return (
              <li key={item.route}>
                <button
                  onClick={() => navigate(item.route)}
                  className={cn(
                    'group relative flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm transition-colors',
                    active
                      ? 'bg-gold/10 text-gold'
                      : 'text-tsecondary hover:bg-white/5 hover:text-tprimary',
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold" />
                  )}
                  <Icon className="size-5 shrink-0" />
                  <span
                    className={cn(
                      'whitespace-nowrap transition-opacity',
                      expanded ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-2">
        <button
          onClick={() => setSidebarPinned(!sidebarPinned)}
          className="flex h-9 w-full items-center gap-3 rounded-xl px-3 text-sm text-tsecondary hover:bg-white/5 hover:text-tprimary"
        >
          <PanelLeft className="size-5 shrink-0" />
          <span className={cn('whitespace-nowrap transition-opacity', expanded ? 'opacity-100' : 'opacity-0')}>
            {sidebarPinned ? 'Collapse' : 'Pin sidebar'}
          </span>
        </button>
        <div className="mt-1 flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-3 text-xs font-bold text-gold">
            AR
          </div>
          <div className={cn('overflow-hidden transition-opacity', expanded ? 'opacity-100' : 'opacity-0')}>
            <p className="whitespace-nowrap text-xs font-semibold text-tprimary">
              Aditya Rao
            </p>
            <p className="whitespace-nowrap text-[10px] text-gold">{role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
