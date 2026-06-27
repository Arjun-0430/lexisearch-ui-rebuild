'use client'

import { activeAlerts, auditLog, infraHealth } from '@/lib/mock-data'
import { useEffect, useState } from 'react'
import {
  Badge,
  GhostButton,
  GlassCard,
  PageHeader,
  Panel,
  StatusDot,
} from '../primitives'

function statusTone(s: string) {
  return s === 'HEALTHY' ? 'green' : s === 'DEGRADED' ? 'yellow' : 'red'
}

export function SystemMonitoringPage() {
  const [secs, setSecs] = useState(14)
  const [ackd, setAckd] = useState<string[]>([])

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s >= 30 ? 0 : s + 1)), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      <PageHeader
        title="System Monitoring"
        subtitle="Real-time infrastructure health. Auto-polls every 30s."
        actions={
          <span className="flex items-center gap-2 text-xs text-tsecondary">
            <StatusDot tone="green" pulse /> Last refreshed: {secs}s ago
          </span>
        }
      />

      {/* Service health cards */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {infraHealth.map((s) => {
          const tone = statusTone(s.status) as 'green' | 'yellow' | 'red'
          return (
            <GlassCard key={s.name} className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-tprimary">{s.name}</p>
                <StatusDot tone={tone} pulse={tone !== 'green'} />
              </div>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider"
                 style={{ color: tone === 'green' ? '#38a169' : tone === 'yellow' ? '#d69e2e' : '#e53e3e' }}>
                {s.status}
              </p>
              <p className="mt-1 font-mono text-sm text-tsecondary">{s.latency}</p>
            </GlassCard>
          )
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Active Alerts */}
        <Panel title="Active Alerts" bodyClassName="p-0">
          <div className="scrollbar-thin max-h-[420px] overflow-y-auto p-3">
            {activeAlerts.filter((a) => !ackd.includes(a.id)).map((a) => (
              <div key={a.id} className="mb-2 rounded-xl border border-white/8 bg-white/[0.02] p-3 last:mb-0">
                <div className="flex items-start gap-2">
                  <StatusDot tone={a.sev === 'P0' ? 'red' : 'yellow'} className="mt-1.5" />
                  <div className="flex-1">
                    <p className="text-sm text-tprimary">{a.text}</p>
                    <p className="mt-0.5 text-xs text-tmuted">{a.time}</p>
                  </div>
                </div>
                <GhostButton
                  onClick={() => setAckd((p) => [...p, a.id])}
                  className="mt-2 h-7 px-2.5 py-0 text-xs"
                >
                  Acknowledge
                </GhostButton>
              </div>
            ))}
            {activeAlerts.every((a) => ackd.includes(a.id)) && (
              <p className="py-8 text-center text-sm text-tmuted">All alerts acknowledged</p>
            )}
          </div>
        </Panel>

        {/* Dependency Matrix */}
        <Panel title="Dependency Matrix" bodyClassName="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left text-[11px] uppercase tracking-wider text-tmuted">
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Latency</th>
              </tr>
            </thead>
            <tbody>
              {infraHealth.map((s) => {
                const tone = statusTone(s.status) as 'green' | 'yellow' | 'red'
                return (
                  <tr key={s.name} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 text-tprimary">{s.name}</td>
                    <td className="px-4 py-3">
                      <Badge tone={tone === 'green' ? 'green' : tone === 'yellow' ? 'amber' : 'red'}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-tsecondary">{s.latency}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Panel>

        {/* Audit Log */}
        <Panel title="Audit Log" bodyClassName="p-0">
          <div className="scrollbar-thin max-h-[420px] overflow-y-auto p-3">
            {auditLog.map((l, i) => (
              <div key={i} className="mb-2 flex gap-3 rounded-lg px-2 py-1.5 text-xs last:mb-0 hover:bg-white/[0.02]">
                <span className="shrink-0 font-mono text-gold">{l.t}</span>
                <span className="text-tsecondary">{l.text}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
