'use client'

import { caseTimeline } from '@/lib/mock-data'
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../app-context'
import {
  Badge,
  GhostButton,
  GlassCard,
  GoldButton,
  RiskBadge,
  SectionLabel,
} from '../primitives'
import { cn } from '@/lib/utils'

const petitioners = [
  { name: 'State of Maharashtra', role: 'Petitioner', advocate: 'Public Prosecutor' },
]
const respondents = [
  { name: 'Ramesh Kumar Sharma', role: 'Respondent', advocate: 'Adv. S. Deshmukh' },
]

function Accordion({
  title,
  defaultOpen,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <GlassCard className="overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-tprimary">{title}</span>
        {open ? <ChevronDown className="size-4 text-tsecondary" /> : <ChevronRight className="size-4 text-tsecondary" />}
      </button>
      {open && <div className="border-t border-foreground/8 p-5">{children}</div>}
    </GlassCard>
  )
}

function PartyTable({ rows, label }: { rows: typeof petitioners; label: string }) {
  return (
    <div>
      <SectionLabel className="mb-2">{label}</SectionLabel>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-tmuted">
            <th className="py-2 font-medium">Name</th>
            <th className="py-2 font-medium">Role</th>
            <th className="py-2 font-medium">Advocate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-foreground/5">
              <td className="py-2 text-tprimary">{r.name}</td>
              <td className="py-2 text-tsecondary">{r.role}</td>
              <td className="py-2 text-tsecondary">{r.advocate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CaseDetailPage() {
  const { payload, navigate } = useApp()
  const cnr = payload ?? 'MHAU010012342024'

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm">
        <button onClick={() => navigate('search')} className="flex items-center gap-1.5 text-tsecondary hover:text-tprimary">
          <ArrowLeft className="size-4" /> Back
        </button>
        <span className="text-tmuted">/</span>
        <span className="text-tmuted">Search</span>
        <span className="text-tmuted">/</span>
        <span className="font-mono text-tprimary">{cnr}</span>
      </div>

      {/* Header */}
      <GlassCard className="mb-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-gold">{cnr}</p>
            <h1 className="mt-1 text-2xl font-bold text-tprimary text-balance">
              State vs Ramesh Kumar Sharma
            </h1>
            <p className="mt-1 text-sm text-tsecondary">Bombay High Court — Bench 3</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-tsecondary">Filing Date: <span className="text-tprimary">14 Mar 2021</span></span>
              <Badge tone="red">Pending</Badge>
            </div>
          </div>
          <RiskBadge level="RED" className="px-4 py-2 text-xs" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <GoldButton onClick={() => navigate('reports')}>Generate Report</GoldButton>
          <GhostButton onClick={() => navigate('search')}>Back to Search</GhostButton>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-4">
        <Accordion title="Case Overview" defaultOpen>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Case Type', 'Criminal'],
              ['IPC Sections', '420, 406'],
              ['Filing Number', 'CRL/2342/2021'],
              ['First Hearing', '22 Apr 2021'],
              ['Next Hearing', '30 May 2022'],
              ['Stage', 'Evidence'],
            ].map(([k, v]) => (
              <div key={k} className="neu-inset rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-wider text-tmuted">{k}</p>
                <p className="mt-1 font-medium text-tprimary">{v}</p>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="Parties">
          <div className="flex flex-col gap-5">
            <PartyTable rows={petitioners} label="Petitioner(s)" />
            <PartyTable rows={respondents} label="Respondent(s)" />
          </div>
        </Accordion>

        <Accordion title="Case History / Orders Timeline" defaultOpen>
          <ol className="relative ml-2 border-l border-foreground/10">
            {caseTimeline.map((e, i) => (
              <li key={i} className="mb-5 ml-5 last:mb-0">
                <span className={cn(
                  'absolute -left-[6px] mt-1 size-3 rounded-full',
                  i === caseTimeline.length - 1 ? 'bg-gold' : 'bg-surface-3 ring-1 ring-foreground/20',
                )} />
                <p className="font-mono text-xs text-gold">{e.date}</p>
                <p className="mt-0.5 text-sm text-tprimary">{e.text}</p>
              </li>
            ))}
          </ol>
        </Accordion>

        <Accordion title="AI Analysis">
          <div className="rounded-xl bg-risk-red/10 p-4 ring-1 ring-risk-red/25">
            <p className="text-sm font-bold uppercase tracking-wider text-risk-red">High Risk</p>
            <p className="mt-2 text-sm leading-relaxed text-tsecondary">
              This case involves financial fraud charges under IPC sections 420 and 406, currently
              pending trial. The subject has multiple related cases across Maharashtra courts,
              indicating an elevated risk profile.
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Financial Fraud', 'Pending Trial', 'IPC 420', 'IPC 406'].map((f) => (
              <Badge key={f} tone="red">{f}</Badge>
            ))}
          </div>
          <p className="mt-3 text-xs text-tmuted">AI Confidence: 91%</p>
        </Accordion>
      </div>
    </div>
  )
}
