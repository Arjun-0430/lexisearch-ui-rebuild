'use client'

import {
  scoreDistTrend,
  teamPerformance,
  weeklyVerifications,
} from '@/lib/mock-data'
import { Download } from 'lucide-react'
import { C, HBar, StackedArea, VBar } from '../charts'
import {
  GhostButton,
  KpiCard,
  PageHeader,
  Panel,
  RiskBadge,
} from '../primitives'

const kpis = [
  { label: 'Total Verifications', value: '1,847', delta: '+12%', trend: 'up' as const },
  { label: 'Clear (GREEN)', value: '1,284' },
  { label: 'Review (YELLOW)', value: '412' },
  { label: 'High Risk (RED)', value: '151' },
  { label: 'Pending', value: '43' },
]

const recent = [
  { person: 'Rajesh Kumar', risk: 'RED' as const, by: 'Priya Sharma', date: '27 Jun 2026', status: 'Complete' },
  { person: 'Anita Desai', risk: 'GREEN' as const, by: 'Amit Patel', date: '27 Jun 2026', status: 'Complete' },
  { person: 'Mohammed Faisal', risk: 'YELLOW' as const, by: 'Neha Reddy', date: '26 Jun 2026', status: 'Complete' },
  { person: 'Sneha Iyer', risk: 'GREEN' as const, by: 'Priya Sharma', date: '26 Jun 2026', status: 'Complete' },
  { person: 'Vikram Singh', risk: 'RED' as const, by: 'Rohit Verma', date: '25 Jun 2026', status: 'Complete' },
]

export function HrDashboardPage() {
  return (
    <div>
      <PageHeader
        title="HR Dashboard"
        subtitle="Verification activity for HR teams."
        actions={
          <GhostButton>
            <Download className="size-4" /> Export CSV
          </GhostButton>
        }
      />

      <div className="mb-5 grid gap-3 grid-cols-2 lg:grid-cols-5">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <Panel title="Weekly Verification Volume">
          <VBar data={weeklyVerifications} xKey="d" yKey="v" />
        </Panel>
        <Panel title="Score Distribution (30d)">
          <StackedArea data={scoreDistTrend} xKey="d" />
        </Panel>
        <Panel title="Team Performance">
          <HBar data={teamPerformance} catKey="name" valKey="v" color={C.green} height={240} />
        </Panel>
      </div>

      <Panel title="Recent Verifications" bodyClassName="p-0">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-foreground/8 text-left text-[11px] uppercase tracking-wider text-tmuted">
                <th className="px-5 py-3 font-medium">Person</th>
                <th className="px-5 py-3 font-medium">Risk Score</th>
                <th className="px-5 py-3 font-medium">Verified By</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Report</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.person} className="border-b border-foreground/5 last:border-0 hover:bg-foreground/[0.02]">
                  <td className="px-5 py-3 font-medium text-tprimary">{r.person}</td>
                  <td className="px-5 py-3"><RiskBadge level={r.risk} /></td>
                  <td className="px-5 py-3 text-tsecondary">{r.by}</td>
                  <td className="px-5 py-3 text-tsecondary">{r.date}</td>
                  <td className="px-5 py-3 text-tsecondary">{r.status}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-xs font-medium text-gold hover:underline">View Report</button>
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
