'use client'

import { Camera, Copy, RotateCw } from 'lucide-react'
import { useState } from 'react'
import {
  FieldLabel,
  GhostButton,
  GlassCard,
  GoldButton,
  NeuInput,
  NeuSelect,
  NeuToggle,
  PageHeader,
  SectionLabel,
} from '../primitives'
import { INDIAN_STATES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const SECTIONS = ['Profile', 'Notifications', 'Security', 'API Keys', 'Tenant Config']

const notifRows = ['Report Ready', 'High Risk Detected', 'System Alerts', 'Weekly Digest']

const sessions = [
  { device: 'Chrome — macOS', ip: '103.21.58.10', location: 'Mumbai, IN', last: 'Active now' },
  { device: 'Safari — iPhone', ip: '49.36.12.88', location: 'Pune, IN', last: '2h ago' },
  { device: 'Firefox — Windows', ip: '157.32.44.2', location: 'Delhi, IN', last: '3d ago' },
]

export function SettingsPage() {
  const [section, setSection] = useState('Profile')
  const [notifs, setNotifs] = useState<Record<string, { email: boolean; app: boolean }>>(
    Object.fromEntries(notifRows.map((r) => [r, { email: true, app: true }])),
  )
  const [mfa, setMfa] = useState(false)

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile, security and preferences." />

      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Settings sidebar */}
        <nav className="flex shrink-0 gap-1 overflow-x-auto lg:w-48 lg:flex-col">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={cn(
                'whitespace-nowrap rounded-xl px-3.5 py-2 text-left text-sm transition-colors',
                section === s
                  ? 'bg-gold/10 text-gold'
                  : 'text-tsecondary hover:bg-foreground/5 hover:text-tprimary',
              )}
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="flex-1">
          {section === 'Profile' && (
            <GlassCard className="p-6">
              <div className="flex items-center gap-5">
                <button className="group relative flex size-20 items-center justify-center rounded-full bg-surface-3 text-xl font-bold text-gold">
                  AR
                  <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <Camera className="size-5 text-tprimary" />
                  </span>
                </button>
                <div>
                  <p className="font-semibold text-tprimary">Aditya Rao</p>
                  <p className="text-sm text-tmuted">SUPER_ADMIN</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div><FieldLabel>Name</FieldLabel><NeuInput defaultValue="Aditya Rao" /></div>
                <div>
                  <FieldLabel>Email</FieldLabel>
                  <NeuInput defaultValue="aditya@lexisearch.ai" disabled className="opacity-60" />
                </div>
              </div>
              <div className="mt-4">
                <FieldLabel>New Password</FieldLabel>
                <NeuInput type="password" placeholder="Leave blank to keep current" />
              </div>
              <div className="mt-6">
                <GoldButton>Save Changes</GoldButton>
              </div>
            </GlassCard>
          )}

          {section === 'Notifications' && (
            <GlassCard className="p-6">
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-8 gap-y-4">
                <div />
                <SectionLabel>Email</SectionLabel>
                <SectionLabel>In-App</SectionLabel>
                {notifRows.map((r) => (
                  <FragmentRow
                    key={r}
                    label={r}
                    state={notifs[r]}
                    onEmail={(v) => setNotifs((p) => ({ ...p, [r]: { ...p[r], email: v } }))}
                    onApp={(v) => setNotifs((p) => ({ ...p, [r]: { ...p[r], app: v } }))}
                  />
                ))}
              </div>
              <p className="mt-6 text-xs text-tmuted">Changes save automatically.</p>
            </GlassCard>
          )}

          {section === 'Security' && (
            <div className="flex flex-col gap-5">
              <GlassCard className="flex items-center justify-between p-6">
                <div>
                  <p className="font-medium text-tprimary">Multi-Factor Authentication</p>
                  <p className="mt-1 text-sm text-tmuted">
                    {mfa ? 'Enabled — your account is protected.' : 'Enable for enhanced security.'}
                  </p>
                </div>
                <NeuToggle checked={mfa} onChange={setMfa} label="MFA" />
              </GlassCard>
              <GlassCard className="p-0">
                <div className="border-b border-foreground/8 px-6 py-3.5">
                  <h3 className="text-sm font-semibold text-tprimary">Active Sessions</h3>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-foreground/8 text-left text-[11px] uppercase tracking-wider text-tmuted">
                      <th className="px-6 py-3 font-medium">Device</th>
                      <th className="px-6 py-3 font-medium">IP</th>
                      <th className="px-6 py-3 font-medium">Location</th>
                      <th className="px-6 py-3 font-medium">Last Active</th>
                      <th className="px-6 py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((s) => (
                      <tr key={s.ip} className="border-b border-foreground/5 last:border-0">
                        <td className="px-6 py-3 text-tprimary">{s.device}</td>
                        <td className="px-6 py-3 font-mono text-xs text-tsecondary">{s.ip}</td>
                        <td className="px-6 py-3 text-tsecondary">{s.location}</td>
                        <td className="px-6 py-3 text-tsecondary">{s.last}</td>
                        <td className="px-6 py-3 text-right">
                          <button className="text-xs font-medium text-risk-red hover:underline">Revoke</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            </div>
          )}

          {section === 'API Keys' && (
            <GlassCard className="p-6">
              <FieldLabel>Your API Key</FieldLabel>
              <div className="flex items-center gap-2">
                <code className="neu-inset flex-1 rounded-xl px-4 py-2.5 font-mono text-sm text-tprimary">
                  lxs_**********************3f8a
                </code>
                <button aria-label="Copy" className="neu-raised rounded-xl p-2.5 text-tsecondary hover:text-tprimary">
                  <Copy className="size-4" />
                </button>
              </div>
              <div className="mt-4">
                <GhostButton onClick={() => confirm('Regenerate API key? The old key will stop working.')}>
                  <RotateCw className="size-4" /> Regenerate
                </GhostButton>
              </div>
            </GlassCard>
          )}

          {section === 'Tenant Config' && (
            <GlassCard className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><FieldLabel>Tenant Name</FieldLabel><NeuInput defaultValue="Lexisearch" /></div>
                <div>
                  <FieldLabel>Default State</FieldLabel>
                  <NeuSelect defaultValue="Maharashtra">
                    {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  </NeuSelect>
                </div>
                <div>
                  <FieldLabel>Default Case Type</FieldLabel>
                  <NeuSelect>
                    <option>All</option>
                    <option>Criminal</option>
                    <option>Civil</option>
                  </NeuSelect>
                </div>
              </div>
              <div className="mt-6"><GoldButton>Save Config</GoldButton></div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}

function FragmentRow({
  label,
  state,
  onEmail,
  onApp,
}: {
  label: string
  state: { email: boolean; app: boolean }
  onEmail: (v: boolean) => void
  onApp: (v: boolean) => void
}) {
  return (
    <>
      <span className="text-sm text-tprimary">{label}</span>
      <NeuToggle checked={state.email} onChange={onEmail} label={`${label} email`} />
      <NeuToggle checked={state.app} onChange={onApp} label={`${label} in-app`} />
    </>
  )
}
