'use client'

import { Eye, EyeOff, Scale } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../app-context'
import type { UserRole } from '@/lib/mock-data'
import { GoldButton, NeuInput } from '../primitives'

const QUICK: { label: string; role: UserRole }[] = [
  { label: 'Super Admin', role: 'SUPER_ADMIN' },
  { label: 'HR', role: 'PLATFORM_HR' },
  { label: 'Legal', role: 'TENANT_ADMIN' },
  { label: 'Customer', role: 'CUSTOMER_USER' },
]

export function LoginPage() {
  const { navigate, setAuthed, setRole } = useApp()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('aditya@lexisearch.ai')
  const [password, setPassword] = useState('demo-password')

  const signIn = (role?: UserRole) => {
    if (role) setRole(role)
    setAuthed(true)
    navigate('dashboard')
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-foreground/10 p-12 lg:flex">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              'radial-gradient(600px 400px at 30% 20%, rgba(184,134,11,0.14), transparent 60%), radial-gradient(500px 500px at 80% 90%, rgba(47,111,208,0.10), transparent 60%)',
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gold text-primary-foreground">
            <Scale className="size-5" />
          </div>
          <span className="text-lg font-bold text-tprimary">Lexisearch AI</span>
        </div>
        <div className="relative">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-tprimary text-balance">
            Search. Verify. Trust.
          </h1>
          <p className="mt-4 max-w-md text-pretty text-tsecondary">
            Legal intelligence across the Supreme Court, High Courts, and
            District Courts of India — with AI-powered background checks and
            risk scoring.
          </p>
        </div>
        <p className="relative font-mono text-xs text-tmuted">
          47,382,194 case records indexed
        </p>
      </div>

      {/* Login card */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="glass w-full max-w-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-tprimary">Welcome back</h2>
          <p className="mt-1 text-sm text-tsecondary">
            Sign in to your Lexisearch account
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-tsecondary">
                Email
              </label>
              <NeuInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-tsecondary">
                Password
              </label>
              <div className="relative">
                <NeuInput
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-tsecondary hover:text-tprimary"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <GoldButton onClick={() => signIn()} className="mt-1 w-full">
              Sign In
            </GoldButton>
            <button className="text-center text-xs text-tmuted hover:text-tsecondary">
              Forgot password?
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-tmuted">
            <span className="h-px flex-1 bg-foreground/10" />
            Dev quick login
            <span className="h-px flex-1 bg-foreground/10" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {QUICK.map((q) => (
              <button
                key={q.role}
                onClick={() => signIn(q.role)}
                className="rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-tsecondary transition hover:border-gold/40 hover:text-gold"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
