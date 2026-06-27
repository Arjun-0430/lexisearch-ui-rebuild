'use client'

import { useApp } from './app-context'
import { PageHeader } from './primitives'
import { DashboardPage } from './pages/dashboard'
import { SearchPage } from './pages/search'

function ComingSoon({ title }: { title: string }) {
  return (
    <div>
      <PageHeader title={title} subtitle="This module is being prepared." />
      <div className="glass flex h-64 items-center justify-center rounded-2xl text-sm text-tmuted">
        Coming soon
      </div>
    </div>
  )
}

export function Router() {
  const { route } = useApp()
  switch (route) {
    case 'dashboard':
      return <DashboardPage />
    case 'search':
      return <SearchPage />
    default:
      return <ComingSoon title={route} />
  }
}
