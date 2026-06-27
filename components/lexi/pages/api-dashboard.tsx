'use client'

import { apiSources } from '@/lib/mock-data'
import {
  Edit,
  Play,
  Plus,
  Power,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  FieldLabel,
  GhostButton,
  GlassCard,
  GoldButton,
  NeuInput,
  NeuSelect,
  PageHeader,
  Panel,
  SelectPill,
  SlideDrawer,
  StatusDot,
} from '../primitives'

function healthTone(h: string) {
  return h === 'HEALTHY' ? 'green' : h === 'DEGRADED' ? 'yellow' : 'red'
}

export function ApiDashboardPage() {
  const [drawer, setDrawer] = useState(false)
  const [tab, setTab] = useState('Basic Config')

  return (
    <div>
      <PageHeader
        title="API Dashboard"
        subtitle="External court data source registry and health."
        actions={
          <GoldButton onClick={() => setDrawer(true)}>
            <Plus className="size-4" /> Add New API
          </GoldButton>
        }
      />

      {/* Health matrix */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {apiSources.map((a) => {
          const tone = healthTone(a.health) as 'green' | 'yellow' | 'red'
          return (
            <GlassCard key={a.name} className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-tprimary">{a.name}</p>
                <StatusDot tone={tone} pulse={tone !== 'green'} />
              </div>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider"
                 style={{ color: tone === 'green' ? '#38a169' : tone === 'yellow' ? '#d69e2e' : '#e53e3e' }}>
                {a.health}
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-tprimary">{a.latency}ms</p>
            </GlassCard>
          )
        })}
      </div>

      {/* Connected sources table */}
      <Panel title="Connected Sources" bodyClassName="p-0">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left text-[11px] uppercase tracking-wider text-tmuted">
                <th className="px-5 py-3 font-medium">API Name</th>
                <th className="px-5 py-3 font-medium">Base URL</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Last Called</th>
                <th className="px-5 py-3 font-medium">Success</th>
                <th className="px-5 py-3 font-medium">Latency</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiSources.map((a) => (
                <tr key={a.name} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-tprimary">{a.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-tsecondary">{a.url}</td>
                  <td className="px-5 py-3"><Badge tone="neutral">{a.type}</Badge></td>
                  <td className="px-5 py-3 text-tsecondary">{a.lastCalled}</td>
                  <td className="px-5 py-3 font-mono text-tprimary">{a.success}%</td>
                  <td className="px-5 py-3 font-mono text-tprimary">{a.latency}ms</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <IconBtn label="Test"><Play className="size-3.5" /></IconBtn>
                      <IconBtn label="Edit"><Edit className="size-3.5" /></IconBtn>
                      <IconBtn label="Toggle"><Power className="size-3.5" /></IconBtn>
                      <IconBtn label="Delete" danger><Trash2 className="size-3.5" /></IconBtn>
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
        title="Add New API"
        subtitle="Register a new court data source"
        width="max-w-lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <GhostButton>Test Connection</GhostButton>
            <GoldButton onClick={() => setDrawer(false)}>Save API</GoldButton>
          </div>
        }
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {['Basic Config', 'Advanced', 'Field Mapping', 'Case Type Mapping'].map((t) => (
            <SelectPill key={t} active={tab === t} onClick={() => setTab(t)}>
              {t}
            </SelectPill>
          ))}
        </div>

        {tab === 'Basic Config' && (
          <div className="flex flex-col gap-4">
            <div><FieldLabel>Name</FieldLabel><NeuInput placeholder="e.g. NJDG Supreme Court" /></div>
            <div><FieldLabel>Base URL</FieldLabel><NeuInput placeholder="https://..." /></div>
            <div>
              <FieldLabel>Type</FieldLabel>
              <NeuSelect>
                <option>legal_search</option>
                <option>court_records</option>
                <option>custom</option>
              </NeuSelect>
            </div>
            <div>
              <FieldLabel>Auth Type</FieldLabel>
              <NeuSelect>
                <option>API Key</option>
                <option>Basic</option>
                <option>None</option>
              </NeuSelect>
            </div>
            <div><FieldLabel>API Key</FieldLabel><NeuInput placeholder="••••••••••••" /></div>
            <div><FieldLabel>Description</FieldLabel><NeuInput placeholder="Short description" /></div>
          </div>
        )}

        {tab === 'Advanced' && (
          <div className="flex flex-col gap-4">
            <div><FieldLabel>Search Endpoint Path</FieldLabel><NeuInput placeholder="/api/v1/search" /></div>
            <div>
              <FieldLabel>HTTP Method</FieldLabel>
              <NeuSelect><option>GET</option><option>POST</option></NeuSelect>
            </div>
            <div><FieldLabel>Query Param Name</FieldLabel><NeuInput placeholder="q" /></div>
            <div>
              <FieldLabel>Body Template</FieldLabel>
              <textarea
                rows={4}
                placeholder='{ "name": "{{name}}" }'
                className="neu-inset w-full rounded-xl border border-white/5 p-3 font-mono text-xs text-tprimary placeholder:text-tmuted outline-none focus:border-gold/40"
              />
            </div>
            <div><FieldLabel>Response Root Path</FieldLabel><NeuInput placeholder="data.results" /></div>
          </div>
        )}

        {(tab === 'Field Mapping' || tab === 'Case Type Mapping') && (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-tmuted">
            {tab} configuration
          </div>
        )}
      </SlideDrawer>
    </div>
  )
}

function IconBtn({
  children,
  label,
  danger,
}: {
  children: React.ReactNode
  label: string
  danger?: boolean
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className={
        'neu-raised rounded-lg p-1.5 text-tsecondary transition hover:text-tprimary ' +
        (danger ? 'hover:text-risk-red' : '')
      }
    >
      {children}
    </button>
  )
}
