'use client'

import {
  dbPoolSeries,
  errorByEndpoint,
  responseTrend,
} from '@/lib/mock-data'
import { C, DonutChart, HBar, MultiLine, VBar } from '../charts'
import { KpiCard, PageHeader, Panel } from '../primitives'

const kpis = [
  { label: 'Avg Response Time', value: '142ms', delta: '-9ms', trend: 'down' as const },
  { label: 'p95 Latency', value: '847ms', delta: '+38ms', trend: 'up' as const },
  { label: 'DB Query Avg', value: '34ms', delta: '-2ms', trend: 'down' as const },
  { label: 'Cache Hit Rate', value: '87.3%', delta: '+1.4%', trend: 'up' as const },
  { label: 'Error Rate', value: '0.42%', delta: '-0.05%', trend: 'down' as const },
  { label: 'Uptime', value: '99.97%', hint: '30d' },
]

export function PerformancePage() {
  return (
    <div>
      <PageHeader
        title="Performance"
        subtitle="System response metrics and reliability health."
      />
      <div className="mb-5 grid gap-3 grid-cols-2 lg:grid-cols-6">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Response Time Trend (last 100)">
          <MultiLine
            data={responseTrend}
            xKey="t"
            lines={[{ key: 'ms', color: C.gold, name: 'Response (ms)' }]}
            thresholds={[
              { y: 500, color: C.yellow, label: '500ms' },
              { y: 2000, color: C.red, label: '2000ms' },
            ]}
          />
        </Panel>
        <Panel title="DB Pool Utilization">
          <VBar data={dbPoolSeries} xKey="t" yKey="used" color={C.blue} />
        </Panel>
        <Panel title="Cache Hit / Miss">
          <DonutChart
            data={[
              { name: 'Hit', value: 87, color: C.gold },
              { name: 'Miss', value: 13, color: '#9aa1b2' },
            ]}
          />
          <div className="mt-2 flex justify-center gap-6 text-xs">
            <span className="flex items-center gap-1.5 text-tsecondary">
              <span className="size-2.5 rounded-full bg-gold" /> Hit 87%
            </span>
            <span className="flex items-center gap-1.5 text-tsecondary">
              <span className="size-2.5 rounded-full bg-tmuted" /> Miss 13%
            </span>
          </div>
        </Panel>
        <Panel title="Error Rate by Endpoint">
          <HBar
            data={errorByEndpoint}
            catKey="endpoint"
            valKey="errors"
            color={C.red}
            height={300}
          />
        </Panel>
      </div>
    </div>
  )
}
