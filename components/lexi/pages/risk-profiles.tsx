'use client'

import { useState } from 'react'
import { Eye, FileText, MapPin, ShieldAlert } from 'lucide-react'
import { profiles, type Profile, type Risk } from '@/lib/mock-data'
import {
  Badge,
  GhostButton,
  GlassCard,
  GoldButton,
  NeuInput,
  PageHeader,
  RiskBadge,
  SlideDrawer,
} from '../primitives'
import { useApp } from '../app-context'

const filters: { label: string; value: Risk | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'High Risk', value: 'RED' },
  { label: 'Medium', value: 'YELLOW' },
  { label: 'Clear', value: 'GREEN' },
]

export function RiskProfilesPage() {
  const { navigate } = useApp()
  const [active, setActive] = useState<Risk | 'ALL'>('ALL')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Profile | null>(null)

  const rows = profiles.filter(
    (p) =>
      (active === 'ALL' || p.risk === active) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <PageHeader
        title="Risk Profiles"
        subtitle="Consolidated subject profiles aggregated across all linked court records."
        actions={
          <GoldButton onClick={() => navigate('search')}>
            <ShieldAlert className="size-4" /> New Verification
          </GoldButton>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={
                active === f.value
                  ? 'rounded-lg bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold ring-1 ring-gold/25'
                  : 'rounded-lg px-3 py-1.5 text-xs font-medium text-tsecondary hover:bg-white/5'
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="ml-auto w-full max-w-xs">
          <NeuInput
            placeholder="Filter by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((p) => (
          <GlassCard key={p.id} className="p-4 transition-transform hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-tprimary">{p.name}</h3>
                <p className="text-xs text-tmuted">S/o {p.father}</p>
              </div>
              <RiskBadge level={p.risk} />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-tsecondary">
              <MapPin className="size-3.5 text-tmuted" />
              {p.district}, {p.state}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="neu-inset rounded-lg py-2">
                <p className="font-mono text-sm font-semibold text-tprimary">{p.cases}</p>
                <p className="text-[10px] text-tmuted">Cases</p>
              </div>
              <div className="neu-inset rounded-lg py-2">
                <p className="font-mono text-sm font-semibold text-gold">{p.match}%</p>
                <p className="text-[10px] text-tmuted">Match</p>
              </div>
              <div className="neu-inset rounded-lg py-2">
                <p className="font-mono text-sm font-semibold text-tprimary">{p.lastVerified}</p>
                <p className="text-[10px] text-tmuted">Verified</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <GhostButton className="flex-1" onClick={() => setSelected(p)}>
                <Eye className="size-3.5" /> View
              </GhostButton>
              <GhostButton className="flex-1" onClick={() => navigate('case-detail')}>
                <FileText className="size-3.5" /> Report
              </GhostButton>
            </div>
          </GlassCard>
        ))}
      </div>

      <SlideDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Badge tone="gold">{selected.match}% Identity Match</Badge>
              <RiskBadge level={selected.risk} />
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Father / Guardian', selected.father],
                ['Date of Birth', selected.dob],
                ['District', selected.district],
                ['State', selected.state],
                ['Linked Cases', String(selected.cases)],
                ['Last Verified', selected.lastVerified],
              ].map(([k, v]) => (
                <div key={k} className="neu-inset rounded-lg p-3">
                  <dt className="text-[11px] uppercase tracking-wide text-tmuted">{k}</dt>
                  <dd className="mt-0.5 text-tprimary">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-tmuted">
                Risk Summary
              </h4>
              <p className="text-sm leading-relaxed text-tsecondary">
                Subject is associated with {selected.cases} court record(s) across{' '}
                {selected.state}. Identity confidence is {selected.match}% based on name, parentage
                and date-of-birth correlation. {selected.risk === 'RED' && 'Multiple pending criminal matters detected — manual review strongly advised.'}
                {selected.risk === 'YELLOW' && 'Minor civil disputes detected — proceed with standard due diligence.'}
                {selected.risk === 'GREEN' && 'No adverse records found beyond routine matters.'}
              </p>
            </div>
            <GoldButton className="w-full" onClick={() => navigate('case-detail')}>
              <FileText className="size-4" /> Open Full Report
            </GoldButton>
          </div>
        )}
      </SlideDrawer>
    </div>
  )
}
