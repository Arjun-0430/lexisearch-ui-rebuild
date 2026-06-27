import { AppProvider } from '@/components/lexi/app-context'
import { AppShell } from '@/components/lexi/app-shell'

export default function Page() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
