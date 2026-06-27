'use client'

import { tenants, type Tenant } from '@/lib/mock-data'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  GhostButton,
  GlassCard,
  GoldButton,
  KpiCard,
  PageHeader,
  SelectPill,
  SlideDrawer,
  StatusDot,
} from '../primitives'

const planTone: Record<Tenant['plan'], 'gold' | 'blue' | 'neutral'> = {
  ENTERPRISE: 'gold',
  PROFESSIONAL: 'blue',
  STARTER: 'neutral',
}

function inr(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

const kpis = [
  { label: 'Total Tenants', value: '24' },
  { label: 'Active', value: '21', delta: '+2', trend: 'up' as const },
  { label: 'Total MRR', value: '₹4,28,000' },
]

export function TenantManagementPage() {
  const [selected, setSelected] = useState<Tenant | null>(null)
  const [tab, setTab] = useState('Overview')

  return (
    <div>
      <PageHeader
        title="Tenant Management"
        subtitle="Fleet-level tenant monitoring and management."
        actions={
          <GoldButton onClick={() => alert('Coming soon')}>
            <Plus className="size-4" /> Add Tenant
          </GoldButton>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tenants.map((t) => {
          const pct = Math.round((t.used / t.quota) * 100)
          return (
            <GlassCard key={t.name} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-surface-3 text-sm font-bold text-gold">
                    {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-tprimary">{t.name}</p>
                    <span className="flex items-center gap-1.5 text-xs text-tsecondary">
                      <StatusDot tone={t.active ? 'green' : 'red'} />
                      {t.active ? 'Active' : 'Suspended'}
                    </span>
                  </div>
                </div>
                <Badge tone={planTone[t.plan]}>{t.plan}</Badge>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-tsecondary">
                    {t.used.toLocaleString('en-IN')} / {t.quota.toLocaleString('en-IN')} searches
                  </span>
                  <span className="font-mono text-tprimary">{pct}%</span>
                </div>
                <div className="neu-inset h-2.5 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: pct > 85 ? '#d69e2e' : '#c9a84c' }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-tmuted">MRR</p>
                  <p className="font-mono font-semibold text-tprimary">{inr(t.mrr)}/mo</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wider text-tmuted">Users</p>
                  <p className="font-mono font-semibold text-tprimary">{t.users}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <GhostButton onClick={() => { setSelected(t); setTab('Overview') }} className="h-8 flex-1 px-2 py-0 text-xs">
                  View
                </GhostButton>
                <GhostButton className="h-8 flex-1 px-2 py-0 text-xs">Billing</GhostButton>
                <GhostButton className="h-8 flex-1 px-2 py-0 text-xs">
                  {t.active ? 'Suspend' : 'Reactivate'}
                </GhostButton>
              </div>
            </GlassCard>
          )
        })}
      </div>

      <SlideDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        subtitle={selected ? `${selected.plan} plan` : ''}
        width="max-w-lg"
      >
        {selected && (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              {['Overview', 'Users', 'Usage', 'Billing', 'Activity'].map((t) => (
                <SelectPill key={t} active={tab === t} onClick={() => setTab(t)}>
                  {t}
                </SelectPill>
              ))}
            </div>
            {tab === 'Overview' ? (
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Plan', selected.plan],
                  ['Status', selected.active ? 'Active' : 'Suspended'],
                  ['MRR', `${inr(selected.mrr)}/mo`],
                  ['Users', String(selected.users)],
                  ['Searches Used', selected.used.toLocaleString('en-IN')],
                  ['Quota', selected.quota.toLocaleString('en-IN')],
                ].map(([k, v]) => (
                  <div key={k} className="neu-inset rounded-xl p-3">
                    <p className="text-[11px] uppercase tracking-wider text-tmuted">{k}</p>
                    <p className="mt-1 font-medium text-tprimary">{v}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-tmuted">
                {tab} details
              </div>
            )}
          </>
        )}
      </SlideDrawer>
    </div>
  )
}
