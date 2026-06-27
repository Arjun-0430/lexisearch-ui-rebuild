'use client'

import { useApp } from './app-context'
import { DashboardPage } from './pages/dashboard'
import { SearchPage } from './pages/search'
import { BulkSearchPage } from './pages/bulk-search'
import { ReportsPage } from './pages/reports'
import { AnalyticsPage } from './pages/analytics'
import { AiInsightsPage } from './pages/ai-insights'
import { RiskProfilesPage } from './pages/risk-profiles'
import { PerformancePage } from './pages/performance'
import { ApiDashboardPage } from './pages/api-dashboard'
import { SystemMonitoringPage } from './pages/system-monitoring'
import { AiModelsPage } from './pages/ai-models'
import { UserManagementPage } from './pages/user-management'
import { TenantManagementPage } from './pages/tenant-management'
import { HrDashboardPage } from './pages/hr-dashboard'
import { PlatformBillingPage } from './pages/platform-billing'
import { AlertsPage } from './pages/alerts'
import { SettingsPage } from './pages/settings'
import { CaseDetailPage } from './pages/case-detail'

export function Router() {
  const { route } = useApp()
  switch (route) {
    case 'dashboard':
      return <DashboardPage />
    case 'search':
      return <SearchPage />
    case 'bulk-search':
      return <BulkSearchPage />
    case 'reports':
      return <ReportsPage />
    case 'analytics':
      return <AnalyticsPage />
    case 'ai-insights':
      return <AiInsightsPage />
    case 'risk-profiles':
      return <RiskProfilesPage />
    case 'performance':
      return <PerformancePage />
    case 'api-dashboard':
      return <ApiDashboardPage />
    case 'system-monitoring':
      return <SystemMonitoringPage />
    case 'ai-models':
      return <AiModelsPage />
    case 'user-management':
      return <UserManagementPage />
    case 'tenant-management':
      return <TenantManagementPage />
    case 'hr-dashboard':
      return <HrDashboardPage />
    case 'platform-billing':
      return <PlatformBillingPage />
    case 'alerts':
      return <AlertsPage />
    case 'settings':
      return <SettingsPage />
    case 'case-detail':
      return <CaseDetailPage />
    default:
      return <DashboardPage />
  }
}
