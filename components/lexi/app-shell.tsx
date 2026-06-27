'use client'

import { useApp } from './app-context'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { LoginPage } from './pages/login'
import { Router } from './router'

export function AppShell() {
  const { route, authed } = useApp()

  if (route === 'login' || !authed) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-16">
        <Topbar />
        <main className="mx-auto max-w-[1400px] p-6">
          <Router />
        </main>
      </div>
    </div>
  )
}
