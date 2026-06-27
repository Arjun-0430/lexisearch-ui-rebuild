'use client'

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { UserRole } from '@/lib/mock-data'

export type Route =
  | 'login'
  | 'dashboard'
  | 'search'
  | 'bulk-search'
  | 'reports'
  | 'analytics'
  | 'ai-insights'
  | 'risk-profiles'
  | 'performance'
  | 'api-dashboard'
  | 'system-monitoring'
  | 'ai-models'
  | 'user-management'
  | 'tenant-management'
  | 'hr-dashboard'
  | 'platform-billing'
  | 'alerts'
  | 'settings'
  | 'case-detail'

interface AppState {
  route: Route
  navigate: (r: Route, payload?: string) => void
  payload?: string
  role: UserRole
  setRole: (r: UserRole) => void
  sidebarPinned: boolean
  setSidebarPinned: (v: boolean) => void
  selectedProfiles: string[]
  toggleProfile: (id: string) => void
  clearProfiles: () => void
  authed: boolean
  setAuthed: (v: boolean) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>('login')
  const [payload, setPayload] = useState<string | undefined>()
  const [role, setRole] = useState<UserRole>('SUPER_ADMIN')
  const [sidebarPinned, setSidebarPinned] = useState(false)
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([])
  const [authed, setAuthed] = useState(false)

  const navigate = (r: Route, p?: string) => {
    setRoute(r)
    setPayload(p)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
  }

  const toggleProfile = (id: string) =>
    setSelectedProfiles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  return (
    <Ctx.Provider
      value={{
        route,
        navigate,
        payload,
        role,
        setRole,
        sidebarPinned,
        setSidebarPinned,
        selectedProfiles,
        toggleProfile,
        clearProfiles: () => setSelectedProfiles([]),
        authed,
        setAuthed,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
