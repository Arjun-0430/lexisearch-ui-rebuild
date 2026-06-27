'use client'

import { cn } from '@/lib/utils'
import { CheckCircle2, FileUp, UploadCloud, X } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../app-context'
import { Table } from './dashboard'
import {
  FieldLabel,
  GlassCard,
  GoldButton,
  NeuSelect,
  PageHeader,
  Panel,
} from '../primitives'

const STAGES = ['Parsing CSV', 'AI Normalizing', 'Searching Database', 'Done']

const resultRows = [
  {
    n: 1,
    raw: 'Sharma Ramesh 1985',
    parsed: 'Name=Ramesh Sharma, DOB≈1985',
    status: 'MATCHED',
    detail: '2 profiles',
  },
  {
    n: 2,
    raw: 'MHAU010012342024',
    parsed: 'CNR detected',
    status: 'MATCHED',
    detail: '1 case',
  },
  {
    n: 3,
    raw: 'Priya V Chennai',
    parsed: 'Name=Priya Venkataraman, Loc=Chennai',
    status: 'MATCHED',
    detail: '1 profile',
  },
  {
    n: 4,
    raw: 'unknown data xyz',
    parsed: 'Parse Failed',
    status: 'NOT FOUND',
    detail: '—',
  },
]

export function BulkSearchPage() {
  const { navigate } = useApp()
  const [file, setFile] = useState<{ name: string; rows: number } | null>(null)
  const [tenant, setTenant] = useState('')
  const [stage, setStage] = useState(-1)
  const [done, setDone] = useState(false)

  const process = () => {
    setDone(false)
    setStage(0)
    let s = 0
    const iv = setInterval(() => {
      s += 1
      setStage(s)
      if (s >= STAGES.length - 1) {
        clearInterval(iv)
        setDone(true)
      }
    }, 700)
  }

  return (
    <div>
      <PageHeader
        title="Bulk Search"
        subtitle="Upload a CSV file — our AI parses and searches all rows automatically."
      />

      <Panel className="mb-5">
        <div className="grid gap-5 md:grid-cols-[260px_1fr]">
          <div>
            <FieldLabel>Customer / Tenant</FieldLabel>
            <NeuSelect value={tenant} onChange={(e) => setTenant(e.target.value)}>
              <option value="">Select tenant…</option>
              <option>Acme Legal Corp</option>
              <option>TechCorp India</option>
              <option>Meridian HR Partners</option>
            </NeuSelect>
          </div>

          <div>
            <FieldLabel>CSV File</FieldLabel>
            {!file ? (
              <button
                onClick={() => setFile({ name: 'candidates_june.csv', rows: 12 })}
                className="neu-inset flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 text-tsecondary transition hover:border-gold/40 hover:text-gold"
              >
                <UploadCloud className="size-7" />
                <span className="text-sm">Drop your CSV here or click to browse</span>
                <span className="text-xs text-tmuted">.csv files only</span>
              </button>
            ) : (
              <div className="neu-inset flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3">
                <FileUp className="size-5 text-gold" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-tprimary">{file.name}</p>
                  <p className="text-xs text-tmuted">
                    18 KB · {file.rows} rows detected
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFile(null)
                    setStage(-1)
                    setDone(false)
                  }}
                  aria-label="Clear file"
                  className="rounded-lg p-1.5 text-tsecondary hover:text-tprimary"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <GoldButton onClick={process} disabled={!file || !tenant}>
            Process Bulk Search
          </GoldButton>
        </div>
      </Panel>

      {stage >= 0 && (
        <Panel title="Processing" className="mb-5">
          <div className="flex flex-wrap items-center gap-2">
            {STAGES.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                    i <= stage
                      ? 'bg-gold/15 text-gold'
                      : 'neu-inset text-tmuted',
                  )}
                >
                  {i < stage || done ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : null}
                  {s}
                </span>
                {i < STAGES.length - 1 && (
                  <span className="h-px w-6 bg-white/10" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-6 text-sm">
            <span className="text-tsecondary">
              <span className="font-mono font-bold text-tprimary">12</span> rows
              found
            </span>
            <span className="text-tsecondary">
              <span className="font-mono font-bold text-tprimary">
                {done ? 12 : stage * 4}
              </span>{' '}
              processed
            </span>
            <span className="text-tsecondary">
              <span className="font-mono font-bold text-risk-green">
                {done ? 9 : 0}
              </span>{' '}
              matched
            </span>
          </div>
        </Panel>
      )}

      {done && (
        <Panel title="Results" bodyClassName="p-0">
          <Table
            head={[
              'Row#',
              'CSV Data',
              'AI Parsed As',
              'Match Status',
              'Details',
              'Action',
            ]}
          >
            {resultRows.map((r) => (
              <tr key={r.n} className="border-t border-white/5">
                <td className="px-5 py-3 font-mono text-sm text-tmuted">{r.n}</td>
                <td className="px-5 py-3 font-mono text-xs text-tsecondary">
                  {r.raw}
                </td>
                <td className="px-5 py-3 text-sm text-tprimary">{r.parsed}</td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[10px] font-bold',
                      r.status === 'MATCHED'
                        ? 'bg-risk-green/15 text-risk-green'
                        : 'bg-risk-red/15 text-risk-red',
                    )}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-tsecondary">{r.detail}</td>
                <td className="px-5 py-3">
                  {r.status === 'MATCHED' ? (
                    <button
                      onClick={() => navigate('search')}
                      className="text-xs font-medium text-gold hover:underline"
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-xs text-tmuted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        </Panel>
      )}
    </div>
  )
}
