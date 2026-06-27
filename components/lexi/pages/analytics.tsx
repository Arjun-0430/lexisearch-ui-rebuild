'use client'

import { searchVolumeSeries, topStates } from '@/lib/mock-data'
import { AreaSeries, C, DonutChart, HBar } from '../charts'
import { KpiCard, PageHeader, Panel } from '../primitives'

const kpis = [
  { label: 'Total Searches', value: '142,847', delta: '+23%', trend: 'up' as const },
  { label: 'Reports Generated', value: '8,312', delta: '+11%', trend: 'up' as const },
  { label: 'High Risk Found', value: '2,847', delta: '+7%', trend: 'up' as const },
  { label: 'API Calls', value: '389,211', delta: '+4%', trend: 'up' as const },
]

const sources = [
  { name: 'District Courts (36 tables)', pct: 78 },
  { name: 'High Courts (25 tables)', pct: 18 },
  { name: 'Supreme Court', pct: 4 },
]

export function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="System-wide usage metrics and case intelligence."
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Search Volume (30 days)">
          <AreaSeries data={searchVolumeSeries} xKey="d" yKey="searches" />
        </Panel>
        <Panel title="Case Type Distribution">
          <DonutChart
            centerLabel="47.3M"
            data={[
              { name: 'Criminal', value: 67, color: C.red },
              { name: 'Civil', value: 33, color: C.blue },
            ]}
          />
          <div className="mt-2 flex justify-center gap-6 text-xs">
            <span className="flex items-center gap-1.5 text-tsecondary">
              <span className="size-2.5 rounded-full bg-risk-red" /> Criminal 67%
            </span>
            <span className="flex items-center gap-1.5 text-tsecondary">
              <span className="size-2.5 rounded-full bg-role-blue" /> Civil 33%
            </span>
          </div>
        </Panel>
        <Panel title="Top 10 States by Case Count">
          <HBar
            data={topStates.map((s) => ({
              state: s.state,
              cases: Math.round(s.cases / 1000),
            }))}
            catKey="state"
            valKey="cases"
            height={320}
          />
        </Panel>
        <Panel title="API Source Distribution">
          <div className="flex flex-col gap-4 py-2">
            {sources.map((s) => (
              <div key={s.name}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-tsecondary">{s.name}</span>
                  <span className="font-mono text-tprimary">{s.pct}%</span>
                </div>
                <div className="neu-inset h-3 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
