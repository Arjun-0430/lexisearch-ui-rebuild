'use client'

import { activeAlerts, resolvedAlerts, type Alert } from '@/lib/mock-data'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  GhostButton,
  GlassCard,
  GoldButton,
  PageHeader,
  SectionLabel,
  SelectPill,
  SlideDrawer,
} from '../primitives'

const sevBorder: Record<Alert['sev'], string> = {
  P0: 'border-l-risk-red',
  P1: 'border-l-risk-yellow',
  P2: 'border-l-risk-yellow',
  P3: 'border-l-role-blue',
}

const sevTone: Record<Alert['sev'], 'red' | 'amber' | 'blue'> = {
  P0: 'red',
  P1: 'amber',
  P2: 'amber',
  P3: 'blue',
}

const FILTERS = ['All', 'P0 Critical', 'P1 High', 'P2 Medium', 'P3 Low']

export function AlertsPage() {
  const [filter, setFilter] = useState('All')
  const [resolved, setResolved] = useState<string[]>([])
  const [drawer, setDrawer] = useState(false)

  const visible = activeAlerts.filter((a) => {
    if (resolved.includes(a.id)) return false
    if (filter === 'All') return true
    return filter.startsWith(a.sev)
  })

  return (
    <div>
      <PageHeader
        title="Alerts"
        subtitle="Operational alert management."
        actions={
          <GoldButton onClick={() => setDrawer(true)}>
            <Plus className="size-4" /> Create Alert Rule
          </GoldButton>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <SelectPill key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </SelectPill>
        ))}
      </div>

      <SectionLabel className="mb-3">Active Alerts</SectionLabel>
      <div className="mb-8 flex flex-col gap-3">
        <AnimatePresence>
          {visible.map((a) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: 40 }}
            >
              <GlassCard className={`border-l-4 ${sevBorder[a.sev]} p-4`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Badge tone={sevTone[a.sev]}>{a.sev}</Badge>
                    <div>
                      <p className="text-sm text-tprimary">{a.text}</p>
                      <p className="mt-0.5 text-xs text-tmuted">{a.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <GhostButton className="h-8 px-3 py-0 text-xs">Acknowledge</GhostButton>
                    <GoldButton
                      onClick={() => setResolved((p) => [...p, a.id])}
                      className="h-8 px-3 py-0 text-xs"
                    >
                      Resolve
                    </GoldButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <p className="py-8 text-center text-sm text-tmuted">No active alerts match this filter.</p>
        )}
      </div>

      <SectionLabel className="mb-3">Resolved Alerts</SectionLabel>
      <div className="flex flex-col gap-3">
        {[...resolvedAlerts, ...activeAlerts.filter((a) => resolved.includes(a.id)).map((a) => ({ ...a, time: 'resolved just now', resolved: true }))].map((a) => (
          <GlassCard key={a.id} className="p-4 opacity-60">
            <div className="flex items-center gap-3">
              <span className="flex size-6 items-center justify-center rounded-full bg-risk-green/15 text-risk-green">
                <Check className="size-3.5" />
              </span>
              <div>
                <p className="text-sm text-tsecondary">{a.text}</p>
                <p className="mt-0.5 text-xs text-tmuted">{a.time}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <SlideDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title="Create Alert Rule"
        footer={<GhostButton onClick={() => setDrawer(false)}>Close</GhostButton>}
      >
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-tmuted">
          Coming soon
        </div>
      </SlideDrawer>
    </div>
  )
}
