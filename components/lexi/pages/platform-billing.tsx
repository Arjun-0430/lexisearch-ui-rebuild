'use client'

import { billingRows, mrrSeries } from '@/lib/mock-data'
import { Download } from 'lucide-react'
import { AreaSeries, Sparkline } from '../charts'
import {
  Badge,
  NeuCard,
  PageHeader,
  Panel,
} from '../primitives'

const spark = mrrSeries.map((m) => ({ v: m.mrr }))

const kpis = [
  { label: 'MRR', value: '₹4,28,000', delta: '+12%' },
  { label: 'ARR', value: '₹51,36,000', delta: '+12%' },
  { label: 'Active Subscriptions', value: '21', delta: '+2' },
  { label: 'Overdue Invoices', value: '2', delta: 'attention', warn: true },
]

const statusTone: Record<string, 'green' | 'red' | 'amber'> = {
  PAID: 'green',
  OVERDUE: 'red',
  PENDING: 'amber',
}

export function PlatformBillingPage() {
  return (
    <div>
      <PageHeader
        title="Platform Billing"
        subtitle="Revenue and subscription intelligence."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <NeuCard key={k.label} goldAccent className="p-4">
            <p className="text-xs font-medium text-tsecondary">{k.label}</p>
            <p className="mt-2 font-mono text-2xl font-bold text-tprimary">{k.value}</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className={k.warn ? 'text-xs font-medium text-risk-red' : 'text-xs font-medium text-risk-green'}>
                {k.delta}
              </span>
              <div className="w-20">
                <Sparkline data={spark} color={k.warn ? '#d83a3a' : '#b8860b'} />
              </div>
            </div>
          </NeuCard>
        ))}
      </div>

      <Panel title="MRR Trend (12 months)" className="mb-5">
        <AreaSeries data={mrrSeries} xKey="m" yKey="mrr" height={260} />
      </Panel>

      <Panel title="Tenant Billing" bodyClassName="p-0">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-foreground/8 text-left text-[11px] uppercase tracking-wider text-tmuted">
                <th className="px-5 py-3 font-medium">Tenant</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Next Billing</th>
                <th className="px-5 py-3 font-medium text-right">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingRows.map((b) => (
                <tr key={b.tenant} className="border-b border-foreground/5 last:border-0 hover:bg-foreground/[0.02]">
                  <td className="px-5 py-3 font-medium text-tprimary">{b.tenant}</td>
                  <td className="px-5 py-3"><Badge tone="neutral">{b.plan}</Badge></td>
                  <td className="px-5 py-3 font-mono text-tprimary">₹{b.amount.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3"><Badge tone={statusTone[b.status]}>{b.status}</Badge></td>
                  <td className="px-5 py-3 text-tsecondary">{b.next}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:underline">
                      <Download className="size-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
