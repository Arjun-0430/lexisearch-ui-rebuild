'use client'

import {
  aiModels,
  modelAccuracySeries,
  modelLatencySeries,
} from '@/lib/mock-data'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { C, MultiLine } from '../charts'
import {
  Badge,
  GhostButton,
  GlassCard,
  GoldButton,
  PageHeader,
  Panel,
  SlideDrawer,
  StatusDot,
} from '../primitives'

export function AiModelsPage() {
  const [drawer, setDrawer] = useState(false)

  return (
    <div>
      <PageHeader
        title="AI Models"
        subtitle="Model registry and operational health."
        actions={
          <GoldButton onClick={() => setDrawer(true)}>
            <Plus className="size-4" /> Add Model
          </GoldButton>
        }
      />

      {/* Spotlight */}
      <GlassCard className="mb-5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <StatusDot tone="green" pulse />
            <div>
              <p className="text-lg font-bold text-tprimary">Risk Classifier v2.1</p>
              <Badge tone="green">ACTIVE</Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            {[
              ['Accuracy', '94.2%'],
              ['Latency', '87ms'],
              ['Inferences', '1.2M'],
              ['Uptime', '99.9%'],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[11px] uppercase tracking-wider text-tmuted">{k}</p>
                <p className="mt-1 font-mono text-xl font-bold text-tprimary">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Charts */}
      <div className="mb-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Accuracy Over Time">
          <MultiLine
            data={modelAccuracySeries}
            xKey="m"
            lines={[{ key: 'acc', color: C.green, name: 'Accuracy %' }]}
          />
        </Panel>
        <Panel title="Latency Over Time">
          <MultiLine
            data={modelLatencySeries}
            xKey="m"
            lines={[{ key: 'ms', color: C.gold, name: 'Latency ms' }]}
          />
        </Panel>
      </div>

      {/* Registry table */}
      <Panel title="Model Registry" bodyClassName="p-0">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left text-[11px] uppercase tracking-wider text-tmuted">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Version</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Accuracy</th>
                <th className="px-5 py-3 font-medium">Latency</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {aiModels.map((m) => (
                <tr key={`${m.name}-${m.version}`} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-tprimary">{m.name}</td>
                  <td className="px-5 py-3 font-mono text-tsecondary">{m.version}</td>
                  <td className="px-5 py-3"><Badge tone="neutral">{m.type}</Badge></td>
                  <td className="px-5 py-3 font-mono text-tprimary">{m.acc}%</td>
                  <td className="px-5 py-3 font-mono text-tprimary">{m.latency}ms</td>
                  <td className="px-5 py-3">
                    <Badge tone={m.status === 'ACTIVE' ? 'green' : 'neutral'}>{m.status}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-tsecondary hover:text-tprimary">Edit</button>
                      <button className="text-xs text-tsecondary hover:text-risk-red">
                        {m.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <SlideDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title="Add Model"
        subtitle="Register a new AI model"
        footer={<GhostButton onClick={() => setDrawer(false)}>Close</GhostButton>}
      >
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-tmuted">
          Coming soon
        </div>
      </SlideDrawer>
    </div>
  )
}
