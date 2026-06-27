'use client'

import { cn } from '@/lib/utils'
import {
  DISTRICTS_BY_STATE,
  INDIAN_STATES,
  profiles,
  type Profile,
  type Risk,
} from '@/lib/mock-data'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, FileText, Search as SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useApp } from '../app-context'
import {
  FieldLabel,
  GhostButton,
  GlassCard,
  GoldButton,
  NeuInput,
  NeuSelect,
  PageHeader,
  RiskBadge,
  SelectPill,
} from '../primitives'

export function SearchPage() {
  const { navigate, selectedProfiles, toggleProfile, clearProfiles } = useApp()
  const [mode, setMode] = useState<'name' | 'cnr'>('name')
  const [searched, setSearched] = useState(true)
  const [state, setState] = useState('Maharashtra')
  const [sort, setSort] = useState('Relevance')
  const [filter, setFilter] = useState<'ALL' | Risk>('ALL')

  const results = useMemo(() => {
    let r = [...profiles]
    if (filter !== 'ALL') r = r.filter((p) => p.risk === filter)
    if (sort === 'Name') r.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'Risk') {
      const order = { RED: 0, YELLOW: 1, GREEN: 2 }
      r.sort((a, b) => order[a.risk] - order[b.risk])
    }
    return r
  }, [filter, sort])

  const counts = {
    red: profiles.filter((p) => p.risk === 'RED').length,
    yellow: profiles.filter((p) => p.risk === 'YELLOW').length,
    green: profiles.filter((p) => p.risk === 'GREEN').length,
  }

  return (
    <div>
      <PageHeader
        title="Search Court Records"
        subtitle="Search Indian court records by name or CNR number across all jurisdictions."
      />
      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        {/* Search panel */}
        <GlassCard className="sticky top-20 h-fit p-5">
          <div className="neu-inset mb-5 flex rounded-xl p-1">
            {(['name', 'cnr'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'flex-1 rounded-lg py-2 text-xs font-semibold transition-all',
                  mode === m
                    ? 'bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(184,134,11,0.4)]'
                    : 'text-tsecondary',
                )}
              >
                {m === 'name' ? 'Name Search' : 'CNR Search'}
              </button>
            ))}
          </div>

          {mode === 'name' ? (
            <div className="flex flex-col gap-3.5">
              <div>
                <FieldLabel>Name *</FieldLabel>
                <NeuInput placeholder="Enter full name or partial name" />
              </div>
              <div>
                <FieldLabel>Father&apos;s Name</FieldLabel>
                <NeuInput placeholder="Father's name" />
              </div>
              <div>
                <FieldLabel>Date of Birth</FieldLabel>
                <NeuInput type="date" />
              </div>
              <div>
                <FieldLabel>State</FieldLabel>
                <NeuSelect value={state} onChange={(e) => setState(e.target.value)}>
                  {INDIAN_STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </NeuSelect>
              </div>
              <div>
                <FieldLabel>District</FieldLabel>
                <NeuSelect>
                  <option>All Districts</option>
                  {(DISTRICTS_BY_STATE[state] ?? []).map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </NeuSelect>
              </div>
              <div>
                <FieldLabel>Establishment</FieldLabel>
                <NeuInput placeholder="Court establishment" />
              </div>
              <div>
                <FieldLabel>Case Status</FieldLabel>
                <NeuSelect>
                  <option>All</option>
                  <option>Pending</option>
                  <option>Disposed</option>
                </NeuSelect>
              </div>
            </div>
          ) : (
            <div>
              <FieldLabel>CNR Number *</FieldLabel>
              <NeuInput
                className="font-mono"
                placeholder="MHAU010012342024"
                minLength={10}
              />
              <p className="mt-2 text-xs text-tmuted">
                Minimum 10 characters. Format: state + establishment + serial +
                year.
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2">
            <GoldButton onClick={() => setSearched(true)} className="w-full">
              <SearchIcon className="size-4" /> Search
            </GoldButton>
            <GhostButton onClick={() => setSearched(false)} className="w-full">
              Clear
            </GhostButton>
          </div>
        </GlassCard>

        {/* Results */}
        <div>
          {searched && (
            <>
              <GlassCard className="mb-4 flex flex-wrap items-center gap-4 px-5 py-3.5">
                <span className="text-sm font-semibold text-tprimary">
                  247 profiles found
                </span>
                <span className="flex items-center gap-1.5 text-xs text-risk-red">
                  ● 32 high risk
                </span>
                <span className="flex items-center gap-1.5 text-xs text-risk-yellow">
                  ● 89 medium
                </span>
                <span className="flex items-center gap-1.5 text-xs text-risk-green">
                  ● 126 clear
                </span>
              </GlassCard>

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="mr-1 text-[10px] uppercase tracking-wider text-tmuted">
                    Sort
                  </span>
                  {['Relevance', 'Name', 'Risk', 'Date'].map((s) => (
                    <SelectPill key={s} active={sort === s} onClick={() => setSort(s)}>
                      {s}
                    </SelectPill>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="mr-1 text-[10px] uppercase tracking-wider text-tmuted">
                    Filter
                  </span>
                  {(['ALL', 'RED', 'YELLOW', 'GREEN'] as const).map((f) => (
                    <SelectPill
                      key={f}
                      active={filter === f}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </SelectPill>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pb-24">
                {results.map((p) => (
                  <ProfileRow
                    key={p.id}
                    profile={p}
                    selected={selectedProfiles.includes(p.id)}
                    onToggle={() => toggleProfile(p.id)}
                    onView={() => navigate('case-detail', 'MHAU010012342024')}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Multi-select bar */}
      <AnimatePresence>
        {selectedProfiles.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-6 pb-6"
          >
            <div className="glass flex items-center gap-4 rounded-2xl border border-gold/30 px-6 py-3.5 shadow-2xl">
              <span className="text-sm font-medium text-tprimary">
                {selectedProfiles.length} profile
                {selectedProfiles.length > 1 ? 's' : ''} selected
              </span>
              <GoldButton onClick={() => navigate('reports')}>
                Generate Report <ArrowRight className="size-4" />
              </GoldButton>
              <button
                onClick={clearProfiles}
                className="text-xs text-tsecondary hover:text-tprimary"
              >
                Clear Selection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProfileRow({
  profile: p,
  selected,
  onToggle,
  onView,
}: {
  profile: Profile
  selected: boolean
  onToggle: () => void
  onView: () => void
}) {
  return (
    <GlassCard
      className={cn(
        'flex flex-wrap items-center gap-4 p-4 transition-colors',
        selected && 'border-gold/40 bg-gold/[0.04]',
      )}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggle}
        aria-label={`Select ${p.name}`}
        className="size-4 accent-[#b8860b]"
      />
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-3 text-sm font-bold text-gold">
        {p.name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')}
      </div>
      <div className="min-w-[180px] flex-1">
        <p className="font-semibold text-tprimary">{p.name}</p>
        <p className="text-xs text-tsecondary">
          Father: {p.father} · DOB: {p.dob}
        </p>
        <p className="text-xs text-tmuted">
          {p.district}, {p.state}
        </p>
      </div>
      <div className="text-right">
        <p className="rounded-md bg-foreground/5 px-2 py-1 text-xs font-medium text-tprimary">
          {p.cases} cases
        </p>
        <p className="mt-1 font-mono text-xs text-tsecondary">{p.match}% match</p>
      </div>
      <RiskBadge level={p.risk} />
      <div className="flex items-center gap-2">
        <GhostButton onClick={onView} className="px-3 py-1.5 text-xs">
          View Details
        </GhostButton>
        <button
          onClick={onView}
          aria-label="Quick report"
          className="neu-raised rounded-lg p-2 text-gold hover:bg-foreground/5"
        >
          <FileText className="size-4" />
        </button>
      </div>
    </GlassCard>
  )
}
