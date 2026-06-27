'use client'

import { cn } from '@/lib/utils'
import {
  authErrorSeries,
  caseVolumeSeries,
  dashboardKpis,
  errorRateSeries,
  incidents,
  infraHealth,
  latencySeries,
  pipelineStages,
  tenantRiskRows,
} from '@/lib/mock-data'
import {
  AlertTriangle,
  BellOff,
  BookOpen,
  Info,
  RefreshCw,
  RotateCw,
  TriangleAlert,
} from 'lucide-react'
import { useState } from 'react'
import {
  AreaSeries,
  C,
  MultiLine,
  StackedArea,
  VBar,
} from '../charts'
import {
  GhostButton,
  GlassCard,
  GoldButton,
  KpiCard,
  NeuSelect,
  Panel,
  SectionLabel,
  SelectPill,
  StatusDot,
} from '../primitives'

const TABS = ['Overview', 'Reliability', 'Business', 'Forensics'] as const
type Tab = (typeof TABS)[number]

const TIME_RANGES = ['1h', '6h', '24h', '7d', '30d']
const REFRESH = ['Off', '30s', '60s', '5m']

export function DashboardPage() {
  const [tab, setTab] = useState<Tab>('Overview')
  const [range, setRange] = useState('24h')
  const [refresh, setRefresh] = useState('30s')

  return (
    <div>
      {/* Filter bar */}
      <GlassCard className="sticky top-14 z-10 mb-5 flex flex-wrap items-center gap-3 px-4 py-3">
        <NeuSelect className="h-9 w-44">
          <option>All Tenants</option>
          <option>Acme Legal Corp</option>
          <option>TechCorp India</option>
          <option>Meridian HR Partners</option>
        </NeuSelect>
        <div className="flex items-center gap-1.5">
          {TIME_RANGES.map((r) => (
            <SelectPill key={r} active={range === r} onClick={() => setRange(r)}>
              {r}
            </SelectPill>
          ))}
        </div>
        <NeuSelect className="h-9 w-36">
          <option>PRODUCTION</option>
          <option>STAGING</option>
        </NeuSelect>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-tsecondary">
            <RefreshCw className="size-3.5" /> Auto
            <NeuSelect
              value={refresh}
              onChange={(e) => setRefresh(e.target.value)}
              className="h-8 w-20"
            >
              {REFRESH.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </NeuSelect>
          </div>
          <GoldButton className="h-9">Apply</GoldButton>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="mb-5 flex items-center gap-1 border-b border-white/8">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'relative px-4 py-2.5 text-sm font-medium transition-colors',
              tab === t ? 'text-gold' : 'text-tsecondary hover:text-tprimary',
            )}
          >
            {t}
            {tab === t && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gold" />
            )}
          </button>
        ))}
      </div>

      {tab === 'Overview' && <Overview />}
      {tab === 'Reliability' && <Reliability />}
      {tab === 'Business' && <Business />}
      {tab === 'Forensics' && <Forensics />}
    </div>
  )
}

function Overview() {
  return (
    <div className="flex flex-col gap-5">
      {/* KPI command strip */}
      <div className="scrollbar-thin -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {dashboardKpis.map((k) => (
          <KpiCard key={k.label} {...k} className="flex-1" />
        ))}
      </div>

      {/* Pipeline board */}
      <Panel title="Pipeline">
        <div className="flex flex-wrap gap-3">
          {pipelineStages.map((s) => (
            <div
              key={s.stage}
              className={cn(
                'glass flex items-center gap-3 rounded-xl px-4 py-3',
                s.tone === 'red' && 'shadow-[0_0_18px_rgba(229,62,62,0.25)]',
                s.tone === 'running' && 'animate-pulse-ring',
              )}
            >
              <StatusDot
                tone={
                  s.tone === 'red'
                    ? 'red'
                    : s.tone === 'green'
                      ? 'green'
                      : s.tone === 'yellow'
                        ? 'yellow'
                        : 'gold'
                }
                pulse={s.tone === 'running'}
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-tsecondary">
                  {s.stage}
                </p>
                <p className="font-mono text-lg font-bold text-tprimary">
                  {s.count.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Incidents + Actions */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Incident Feed">
          <ul className="flex flex-col gap-2">
            {incidents.map((i, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
              >
                {i.sev === 'CRIT' ? (
                  <TriangleAlert className="size-4 text-risk-red" />
                ) : i.sev === 'WARN' ? (
                  <AlertTriangle className="size-4 text-risk-yellow" />
                ) : (
                  <Info className="size-4 text-role-blue" />
                )}
                <span className="flex-1 text-sm text-tprimary">{i.text}</span>
                <span className="text-xs text-tmuted">{i.time}</span>
                <span
                  className={cn(
                    'rounded px-1.5 py-0.5 text-[10px] font-bold',
                    i.sev === 'CRIT'
                      ? 'bg-risk-red/15 text-risk-red'
                      : i.sev === 'WARN'
                        ? 'bg-risk-yellow/15 text-risk-yellow'
                        : 'bg-role-blue/15 text-role-blue',
                  )}
                >
                  {i.sev}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Action Center">
          <SectionLabel className="mb-3">SUPER_ADMIN actions</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Retry Failed Jobs', icon: RotateCw },
              { label: 'Mute Alert 1h', icon: BellOff },
              { label: 'Open Runbook', icon: BookOpen },
              { label: 'Reprocess Batch', icon: RefreshCw },
            ].map((a) => (
              <button
                key={a.label}
                className="neu-raised flex items-center gap-2.5 rounded-xl border border-white/5 px-4 py-3.5 text-sm font-medium text-tprimary transition-transform hover:-translate-y-0.5 hover:text-gold"
              >
                <a.icon className="size-4 text-gold" />
                {a.label}
              </button>
            ))}
          </div>
        </Panel>
      </div>

      {/* Tenant risk table */}
      <Panel title="Tenant Risk Overview" bodyClassName="p-0">
        <Table
          head={['Tenant', 'Searches', 'Reports', 'RED Hits', 'Risk Score', 'Status']}
        >
          {tenantRiskRows.map((t) => (
            <tr
              key={t.name}
              className={cn(
                'border-t border-white/5',
                t.riskScore >= 70 && 'bg-risk-red/[0.06]',
              )}
            >
              <td className="px-5 py-3 text-sm font-medium text-tprimary">
                {t.name}
              </td>
              <td className="px-5 py-3 font-mono text-sm text-tsecondary">
                {t.searches.toLocaleString()}
              </td>
              <td className="px-5 py-3 font-mono text-sm text-tsecondary">
                {t.reports}
              </td>
              <td className="px-5 py-3 font-mono text-sm text-risk-red">
                {t.redHits}
              </td>
              <td className="px-5 py-3">
                <RiskMeter score={t.riskScore} />
              </td>
              <td className="px-5 py-3">
                <span className="flex items-center gap-1.5 text-xs text-tsecondary">
                  <StatusDot tone={t.status === 'Active' ? 'green' : 'red'} />
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  )
}

function Reliability() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel title="Latency Breakdown (ms)">
        <MultiLine
          data={latencySeries}
          xKey="t"
          lines={[
            { key: 'search', color: C.gold, name: '/api/search' },
            { key: 'reports', color: C.blue, name: '/api/reports' },
            { key: 'pdf', color: C.green, name: '/api/pdf/generate' },
          ]}
          thresholds={[
            { y: 500, color: C.yellow, label: '500ms' },
            { y: 2000, color: C.red, label: '2000ms' },
          ]}
        />
      </Panel>
      <Panel title="Error Rate (24h %)">
        <MultiLine
          data={errorRateSeries}
          xKey="t"
          lines={[{ key: 'rate', color: C.red, name: 'Error %' }]}
        />
      </Panel>
      <Panel title="Infrastructure Health">
        <div className="grid grid-cols-2 gap-3">
          {infraHealth.slice(0, 4).map((s) => (
            <div
              key={s.name}
              className={cn(
                'neu-raised rounded-xl border border-white/5 p-4',
                s.status === 'DEGRADED' &&
                  'shadow-[0_0_18px_rgba(214,158,46,0.25)]',
              )}
            >
              <div className="flex items-center gap-2">
                <StatusDot
                  tone={s.status === 'HEALTHY' ? 'green' : 'yellow'}
                />
                <span className="text-sm font-medium text-tprimary">
                  {s.name}
                </span>
              </div>
              <p
                className={cn(
                  'mt-2 text-[11px] font-bold uppercase tracking-wider',
                  s.status === 'HEALTHY' ? 'text-risk-green' : 'text-risk-yellow',
                )}
              >
                {s.status} · {s.latency}
              </p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Auth 5xx Errors by Hour">
        <VBar data={authErrorSeries} xKey="t" yKey="errors" color={C.red} />
      </Panel>
    </div>
  )
}

function Business() {
  const funnel = [
    { label: 'Registered', value: 120, pct: 100 },
    { label: 'Verified', value: 98, pct: 82 },
    { label: 'Active', value: 67, pct: 56 },
    { label: 'Paying', value: 45, pct: 38 },
  ]
  const backlog = [
    { label: 'RED', value: 847, tone: 'bg-risk-red', pct: 36 },
    { label: 'YELLOW', value: 2341, tone: 'bg-risk-yellow', pct: 64 },
    { label: 'GREEN', value: 12804, tone: 'bg-risk-green', pct: 100 },
  ]
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel title="Tenant Funnel">
        <div className="flex flex-col gap-2.5">
          {funnel.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="w-20 text-xs text-tsecondary">{f.label}</span>
              <div className="neu-inset h-7 flex-1 overflow-hidden rounded-lg">
                <div
                  className="flex h-full items-center justify-end rounded-lg bg-gold/80 pr-2 text-[11px] font-bold text-[#14110a]"
                  style={{ width: `${f.pct}%` }}
                >
                  {f.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Case Volume Trend (30d)">
        <AreaSeries data={caseVolumeSeries} xKey="d" yKey="cases" />
      </Panel>
      <Panel title="Risk Backlog">
        <div className="flex flex-col gap-3">
          {backlog.map((b) => (
            <div key={b.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-tsecondary">{b.label}</span>
                <span className="font-mono text-tprimary">
                  {b.value.toLocaleString()}
                </span>
              </div>
              <div className="neu-inset h-2.5 overflow-hidden rounded-full">
                <div
                  className={cn('h-full rounded-full', b.tone)}
                  style={{ width: `${b.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Report Throughput">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-3xl font-bold text-tprimary">312</p>
            <p className="text-xs text-tsecondary">reports / day</p>
          </div>
          <div className="h-16 w-40">
            <StackedArea data={caseVolumeSeries.slice(0, 14).map((d) => ({ d: d.d, green: d.cases / 1000, yellow: 0, red: 0 }))} xKey="d" height={64} />
          </div>
        </div>
      </Panel>
    </div>
  )
}

function Forensics() {
  const [dim, setDim] = useState('Tenant')
  const dims = ['Tenant', 'Environment', 'Region', 'User']
  const rows = [
    { v: 'Acme Legal Corp', s: 12847, e: 142, l: '138ms', r: 142 },
    { v: 'TechCorp India', s: 9420, e: 88, l: '151ms', r: 88 },
    { v: 'Meridian HR Partners', s: 6310, e: 41, l: '129ms', r: 61 },
    { v: 'Sterling Verifications', s: 4180, e: 33, l: '167ms', r: 47 },
  ]
  const trace = `{
  "traceId": "4f9a1c7e-3b2d-4a8f-9e1c-7d2b8a4f9e1c",
  "service": "search-api",
  "duration_ms": 142,
  "spans": [
    { "name": "auth.verify", "ms": 8, "status": "OK" },
    { "name": "db.query.cases", "ms": 34, "status": "OK" },
    { "name": "ai.risk.classify", "ms": 87, "status": "OK" },
    { "name": "cache.write", "ms": 4, "status": "OK" }
  ],
  "tenant": "acme-legal",
  "env": "production"
}`
  return (
    <div className="flex flex-col gap-5">
      <Panel title="Drilldown Dimension">
        <div className="flex flex-wrap items-center gap-2">
          {dims.map((d) => (
            <SelectPill key={d} active={dim === d} onClick={() => setDim(d)}>
              {d}
            </SelectPill>
          ))}
        </div>
      </Panel>
      <Panel title={`Breakdown by ${dim}`} bodyClassName="p-0">
        <Table head={[dim, 'Searches', 'Errors', 'Avg Latency', 'Reports']}>
          {rows.map((r) => (
            <tr key={r.v} className="border-t border-white/5">
              <td className="px-5 py-3 text-sm font-medium text-tprimary">
                {r.v}
              </td>
              <td className="px-5 py-3 font-mono text-sm text-tsecondary">
                {r.s.toLocaleString()}
              </td>
              <td className="px-5 py-3 font-mono text-sm text-risk-red">{r.e}</td>
              <td className="px-5 py-3 font-mono text-sm text-tsecondary">
                {r.l}
              </td>
              <td className="px-5 py-3 font-mono text-sm text-tsecondary">
                {r.r}
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
      <Panel title="Trace Viewer">
        <pre className="neu-inset scrollbar-thin overflow-x-auto rounded-xl p-4 font-mono text-xs leading-relaxed text-tsecondary">
          <code>{trace}</code>
        </pre>
      </Panel>
    </div>
  )
}

/* shared table + risk meter */
export function Table({
  head,
  children,
}: {
  head: string[]
  children: React.ReactNode
}) {
  return (
    <div className="scrollbar-thin overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-tmuted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function RiskMeter({ score }: { score: number }) {
  const tone =
    score >= 70 ? 'bg-risk-red' : score >= 45 ? 'bg-risk-yellow' : 'bg-risk-green'
  return (
    <div className="flex items-center gap-2">
      <div className="neu-inset h-2 w-24 overflow-hidden rounded-full">
        <div className={cn('h-full rounded-full', tone)} style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-xs text-tprimary">{score}</span>
    </div>
  )
}
