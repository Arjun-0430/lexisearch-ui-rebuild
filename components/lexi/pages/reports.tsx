'use client'

import { cn } from '@/lib/utils'
import {
  reportCases,
  reports,
  reportSources,
  type ReportItem,
} from '@/lib/mock-data'
import {
  Archive,
  CheckCircle2,
  Download,
  Plus,
  Share2,
  TriangleAlert,
} from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../app-context'
import { Table } from './dashboard'
import {
  FieldLabel,
  GhostButton,
  GlassCard,
  GoldButton,
  NeuInput,
  PageHeader,
  Panel,
  RiskBadge,
  SectionLabel,
  SelectPill,
  StatusDot,
} from '../primitives'

const TABS = ['Identity', 'Cases', 'AI Insights', 'Sources'] as const
type Tab = (typeof TABS)[number]

export function ReportsPage() {
  const { navigate } = useApp()
  const [selected, setSelected] = useState<ReportItem>(reports[0])
  const [filter, setFilter] = useState('All')
  const [tab, setTab] = useState<Tab>('Identity')

  const filtered = reports.filter((r) =>
    filter === 'All' ? true : r.status === filter,
  )

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generated background check reports with AI risk verdicts."
        actions={
          <GoldButton onClick={() => navigate('search')}>
            <Plus className="size-4" /> New Report
          </GoldButton>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        {/* Report list */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Generating', 'Ready', 'Archived'].map((f) => (
              <SelectPill key={f} active={filter === f} onClick={() => setFilter(f)}>
                {f}
              </SelectPill>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <FieldLabel>Start</FieldLabel>
              <NeuInput type="date" className="h-9" />
            </div>
            <div>
              <FieldLabel>End</FieldLabel>
              <NeuInput type="date" className="h-9" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className={cn(
                  'glass relative rounded-xl p-3.5 text-left transition-colors',
                  selected.id === r.id
                    ? 'border-gold/40'
                    : 'hover:border-white/15',
                )}
              >
                {selected.id === r.id && (
                  <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-gold" />
                )}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-tmuted">#{r.id}</span>
                  <RiskBadge level={r.risk} />
                </div>
                <p className="mt-1.5 font-semibold text-tprimary">{r.subject}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-tsecondary">
                  <StatusDot
                    tone={
                      r.status === 'Ready'
                        ? 'green'
                        : r.status === 'Generating'
                          ? 'yellow'
                          : 'gold'
                    }
                  />
                  {r.status} · {r.generated}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report detail */}
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/8 pb-5">
            <div>
              <SectionLabel>Report #{selected.id}</SectionLabel>
              <h2 className="mt-1 text-2xl font-bold text-tprimary">
                {selected.subject}
              </h2>
              <div className="mt-2">
                <RiskBadge level={selected.risk} className="px-3 py-1.5 text-xs" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GoldButton>
                <Download className="size-4" /> Download PDF
              </GoldButton>
              <GhostButton className="px-3">
                <Share2 className="size-4" />
              </GhostButton>
              <GhostButton className="px-3">
                <Archive className="size-4" />
              </GhostButton>
            </div>
          </div>

          {/* tabs */}
          <div className="mt-5 flex items-center gap-1 border-b border-white/8">
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

          <div className="pt-5">
            {tab === 'Identity' && <Identity />}
            {tab === 'Cases' && (
              <div className="-mx-6">
                <Table
                  head={['CNR', 'Type', 'Court', 'Filing Date', 'Status', 'Source']}
                >
                  {reportCases.map((c) => (
                    <tr
                      key={c.cnr}
                      onClick={() => navigate('case-detail', c.cnr)}
                      className="cursor-pointer border-t border-white/5 hover:bg-white/[0.03]"
                    >
                      <td className="px-6 py-3 font-mono text-xs text-gold">
                        {c.cnr}
                      </td>
                      <td className="px-6 py-3 text-sm text-tprimary">{c.type}</td>
                      <td className="px-6 py-3 text-sm text-tsecondary">
                        {c.court}
                      </td>
                      <td className="px-6 py-3 text-sm text-tsecondary">
                        {c.filing}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[10px] font-bold',
                            c.status === 'Pending'
                              ? 'bg-risk-yellow/15 text-risk-yellow'
                              : 'bg-risk-green/15 text-risk-green',
                          )}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-xs text-tmuted">{c.source}</td>
                    </tr>
                  ))}
                </Table>
              </div>
            )}
            {tab === 'AI Insights' && <AiInsights />}
            {tab === 'Sources' && <Sources />}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

function Identity() {
  const fields = [
    ['Name', 'Ramesh Kumar Sharma'],
    ["Father's Name", 'Suresh Sharma'],
    ['Date of Birth', '14 Mar 1982'],
    ['Address', '402, Sunrise Apartments, Kothrud'],
    ['State', 'Maharashtra'],
    ['District', 'Pune'],
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map(([label, value]) => (
        <div key={label} className="neu-raised rounded-xl border border-white/5 p-4">
          <p className="text-xs text-tsecondary">{label}</p>
          <p className="mt-1 font-medium text-tprimary">{value}</p>
        </div>
      ))}
    </div>
  )
}

function AiInsights() {
  return (
    <div className="flex flex-col gap-4">
      <GlassCard className="flex items-center gap-3 border-risk-red/30 bg-risk-red/[0.06] p-4">
        <TriangleAlert className="size-6 text-risk-red" />
        <span className="text-lg font-bold text-risk-red">HIGH RISK</span>
      </GlassCard>
      <p className="text-sm leading-relaxed text-tsecondary">
        Subject has 8 recorded cases across Maharashtra courts. 3 cases involve
        financial fraud charges currently pending. IPC sections 420 and 406 are
        present, indicating a pattern of alleged cheating and criminal breach of
        trust.
      </p>
      <div className="flex flex-wrap gap-2">
        {['Financial Fraud', 'Pending Trial', 'Multi-jurisdiction', 'IPC 420'].map(
          (c) => (
            <span
              key={c}
              className="rounded-full bg-risk-red/12 px-3 py-1 text-xs font-medium text-risk-red"
            >
              {c}
            </span>
          ),
        )}
      </div>
      <p className="text-sm text-tmuted">
        AI Confidence: <span className="font-mono text-tprimary">91%</span>
      </p>
    </div>
  )
}

function Sources() {
  return (
    <ul className="flex flex-col gap-2">
      {reportSources.map((s) => (
        <li
          key={s.name}
          className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
        >
          {s.ok ? (
            <CheckCircle2 className="size-4 text-risk-green" />
          ) : (
            <TriangleAlert className="size-4 text-risk-yellow" />
          )}
          <span className="flex-1 text-sm text-tprimary">{s.name}</span>
          <span className="font-mono text-xs text-tsecondary">
            {s.ok ? `${s.cases} cases` : s.note}
          </span>
        </li>
      ))}
    </ul>
  )
}
