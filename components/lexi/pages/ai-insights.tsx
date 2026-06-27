'use client'

import { Brain, Sparkles, TrendingUp, AlertTriangle, Scale } from 'lucide-react'
import { AreaSeries, C, DonutChart } from '../charts'
import { Badge, GlassCard, GoldButton, PageHeader, Panel } from '../primitives'
import { caseOutcomeTrend } from '@/lib/mock-data'

const predictions = [
  {
    title: 'Bail Likelihood',
    case: 'State vs. Rajesh Kumar — CRL.A. 4521/2024',
    pct: 72,
    tone: 'amber' as const,
    rationale:
      'Based on 1,284 similar matters before the Delhi High Court, defendants with comparable charge profiles and no prior convictions were granted bail in 72% of cases.',
  },
  {
    title: 'Disposal Timeline',
    case: 'Mehta Industries vs. UoI — W.P.(C) 8890/2023',
    pct: 64,
    tone: 'blue' as const,
    rationale:
      'Writ petitions of this category at this bench are disposed within 14-18 months in 64% of instances. Current pendency suggests Q3 2026 resolution.',
  },
  {
    title: 'Settlement Probability',
    case: 'Sharma vs. Verma — CS(OS) 221/2025',
    pct: 81,
    tone: 'green' as const,
    rationale:
      'Commercial disputes with these parameters reached mediated settlement in 81% of cases once referred to the Delhi Mediation Centre.',
  },
]

const toneMap = {
  amber: { color: C.gold, badge: 'amber' as const },
  blue: { color: C.blue, badge: 'blue' as const },
  green: { color: C.green, badge: 'green' as const },
}

export function AiInsightsPage() {
  return (
    <div>
      <PageHeader
        title="AI Insights"
        subtitle="Predictive case intelligence powered by Lexi-7B fine-tuned on 47M judgments."
        actions={
          <GoldButton>
            <Sparkles className="size-4" /> Run New Analysis
          </GoldButton>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <GlassCard className="flex items-center gap-3 p-4">
          <span className="grid size-10 place-items-center rounded-lg bg-gold/15 text-gold">
            <Brain className="size-5" />
          </span>
          <div>
            <p className="text-lg font-semibold text-tprimary">94.2%</p>
            <p className="text-xs text-tsecondary">Model Accuracy</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-3 p-4">
          <span className="grid size-10 place-items-center rounded-lg bg-role-blue/15 text-role-blue">
            <TrendingUp className="size-5" />
          </span>
          <div>
            <p className="text-lg font-semibold text-tprimary">128,940</p>
            <p className="text-xs text-tsecondary">Predictions Served</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-3 p-4">
          <span className="grid size-10 place-items-center rounded-lg bg-risk-red/15 text-risk-red">
            <AlertTriangle className="size-5" />
          </span>
          <div>
            <p className="text-lg font-semibold text-tprimary">3,211</p>
            <p className="text-xs text-tsecondary">Risk Flags Raised</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4">
          {predictions.map((p) => {
            const t = toneMap[p.tone]
            return (
              <GlassCard key={p.title} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-tprimary">{p.title}</h3>
                      <Badge tone={t.badge}>AI Predicted</Badge>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-tmuted">{p.case}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-2xl font-semibold" style={{ color: t.color }}>
                      {p.pct}%
                    </p>
                  </div>
                </div>
                <div className="neu-inset mt-3 h-2 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.pct}%`, background: t.color }}
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-tsecondary">{p.rationale}</p>
              </GlassCard>
            )
          })}
        </div>

        <div className="flex flex-col gap-5">
          <Panel title="Outcome Trend (12 mo)">
            <AreaSeries data={caseOutcomeTrend} xKey="m" yKey="favorable" color={C.green} />
          </Panel>
          <Panel title="Prediction Confidence">
            <DonutChart
              centerLabel="94%"
              data={[
                { name: 'High', value: 68, color: C.green },
                { name: 'Medium', value: 24, color: C.gold },
                { name: 'Low', value: 8, color: C.red },
              ]}
            />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <span className="text-role-green">High 68%</span>
              <span className="text-gold">Med 24%</span>
              <span className="text-risk-red">Low 8%</span>
            </div>
          </Panel>
          <GlassCard className="flex items-start gap-3 p-4">
            <Scale className="mt-0.5 size-4 shrink-0 text-gold" />
            <p className="text-xs leading-relaxed text-tmuted">
              Predictions are advisory and statistical in nature. They do not constitute legal
              advice and must be independently verified by qualified counsel.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
