'use client'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Risk } from '@/lib/mock-data'

/* ---------------- Glass card ---------------- */
export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('glass rounded-2xl', className)}
      {...props}
    >
      {children}
    </div>
  )
}

/* ---------------- Neumorphic card ---------------- */
export function NeuCard({
  className,
  children,
  goldAccent,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { goldAccent?: boolean }) {
  return (
    <div
      className={cn(
        'neu-raised rounded-2xl border border-white/5',
        goldAccent && 'gold-top-accent',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* ---------------- Section label ---------------- */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-[11px] font-semibold uppercase tracking-[0.18em] text-tsecondary',
        className,
      )}
    >
      {children}
    </p>
  )
}

/* ---------------- Risk badge (embossed stamp) ---------------- */
const riskMap: Record<Risk, { bg: string; ring: string; label: string }> = {
  RED: { bg: 'bg-risk-red text-white', ring: 'shadow-[0_0_0_3px_rgba(229,62,62,0.18)]', label: 'HIGH RISK' },
  YELLOW: { bg: 'bg-risk-yellow text-[#1a1300]', ring: 'shadow-[0_0_0_3px_rgba(214,158,46,0.18)]', label: 'REVIEW' },
  GREEN: { bg: 'bg-risk-green text-white', ring: 'shadow-[0_0_0_3px_rgba(56,161,105,0.18)]', label: 'CLEAR' },
}

export function RiskBadge({
  level,
  label,
  className,
  title,
}: {
  level: Risk
  label?: string
  className?: string
  title?: string
}) {
  const r = riskMap[level]
  return (
    <span
      title={title ?? `${level} — ${r.label}`}
      className={cn(
        'stamp inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider',
        r.bg,
        r.ring,
        className,
      )}
    >
      {label ?? r.label}
    </span>
  )
}

/* ---------------- Generic badge ---------------- */
export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: 'neutral' | 'gold' | 'green' | 'red' | 'amber' | 'blue'
  children: ReactNode
  className?: string
}) {
  const map = {
    neutral: 'bg-white/6 text-tsecondary ring-white/10',
    gold: 'bg-gold/15 text-gold ring-gold/25',
    green: 'bg-risk-green/15 text-risk-green ring-risk-green/25',
    red: 'bg-risk-red/15 text-risk-red ring-risk-red/25',
    amber: 'bg-risk-yellow/15 text-risk-yellow ring-risk-yellow/25',
    blue: 'bg-role-blue/15 text-role-blue ring-role-blue/25',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset',
        map[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---------------- Status dot ---------------- */
export function StatusDot({
  tone,
  pulse,
  className,
}: {
  tone: 'green' | 'red' | 'yellow' | 'gold'
  pulse?: boolean
  className?: string
}) {
  const map = {
    green: 'bg-risk-green',
    red: 'bg-risk-red',
    yellow: 'bg-risk-yellow',
    gold: 'bg-gold',
  }
  return (
    <span
      className={cn(
        'inline-block size-2 rounded-full',
        map[tone],
        pulse && 'animate-pulse-ring',
        className,
      )}
    />
  )
}

/* ---------------- Neumorphic input ---------------- */
export function NeuInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'neu-inset h-10 w-full rounded-xl border border-white/5 px-3.5 text-sm text-tprimary placeholder:text-tmuted outline-none transition focus:border-gold/40',
        className,
      )}
      {...props}
    />
  )
}

export function NeuSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'neu-inset h-10 w-full rounded-xl border border-white/5 px-3 text-sm text-tprimary outline-none transition focus:border-gold/40 [&>option]:bg-surface-3 [&>option]:text-tprimary',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-medium text-tsecondary">
      {children}
    </label>
  )
}

/* ---------------- Neumorphic toggle ---------------- */
export function NeuToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full border border-white/5 transition-colors',
        checked ? 'bg-gold/80' : 'neu-inset',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 size-5 rounded-full bg-tprimary shadow transition-all',
          checked ? 'left-[22px] bg-[#14110a]' : 'left-0.5',
        )}
      />
    </button>
  )
}

/* ---------------- Pill button (filter / sort / segmented) ---------------- */
export function SelectPill({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all',
        active
          ? 'bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(201,168,76,0.4)]'
          : 'neu-raised text-tsecondary hover:text-tprimary',
        className,
      )}
    >
      {children}
    </button>
  )
}

/* ---------------- Mini sparkline (dependency-free SVG) ---------------- */
function MiniSpark({
  data,
  positive,
  className,
}: {
  data: number[]
  positive: boolean
  className?: string
}) {
  if (!data || data.length < 2) return null
  const w = 80
  const h = 28
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stroke = positive ? 'var(--color-risk-green)' : 'var(--color-risk-red)'
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((d - min) / range) * (h - 4) - 2
    return [x, y] as const
  })
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `0,${h} ${line} ${w},${h}`
  const gid = `spk-${Math.abs(data.reduce((a, b) => a + b, 0) * data.length) | 0}`
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn('h-7 w-20', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.28} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline
        points={line}
        fill="none"
        stroke={stroke}
        strokeWidth={1.75}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ---------------- KPI stat card ---------------- */
export function KpiCard({
  label,
  value,
  delta,
  trend,
  goodWhenDown,
  hint,
  sub,
  spark,
  index = 0,
  className,
}: {
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down'
  goodWhenDown?: boolean
  hint?: string
  sub?: string
  spark?: number[]
  index?: number
  className?: string
}) {
  // Semantic delta color: "good" direction is green, "bad" is red.
  const isGood = trend === 'down' ? !!goodWhenDown : !goodWhenDown
  const deltaTone = !trend ? 'text-tmuted' : isGood ? 'text-risk-green' : 'text-risk-red'
  const Arrow = trend === 'down' ? ArrowDownRight : ArrowUpRight
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      className={cn('min-w-[180px] flex-1', className)}
    >
      <NeuCard
        goldAccent
        className="group h-full p-4 transition-transform hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium text-tsecondary">{label}</p>
          {hint && (
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-tmuted">
              <StatusDot tone="gold" pulse /> {hint}
            </span>
          )}
        </div>
        <p className="mt-2 font-mono text-2xl font-bold text-tprimary tabular-nums">
          {value}
        </p>
        <div className="mt-2 flex items-end justify-between gap-2">
          <div className="min-w-0">
            {delta && (
              <span
                className={cn('inline-flex items-center gap-0.5 text-xs font-semibold', deltaTone)}
              >
                {trend && <Arrow className="size-3" />}
                {delta}
              </span>
            )}
            {sub && <p className="mt-0.5 truncate text-[10px] text-tmuted">{sub}</p>}
          </div>
          {spark && <MiniSpark data={spark} positive={isGood} />}
        </div>
      </NeuCard>
    </motion.div>
  )
}

/* ---------------- Slide drawer ---------------- */
export function SlideDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'max-w-md',
}: {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  width?: string
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className={cn(
              'fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-white/10 bg-surface-3 shadow-2xl',
              width,
            )}
          >
            <div className="flex items-start justify-between border-b border-white/10 p-5">
              <div>
                <h3 className="text-lg font-bold text-tprimary">{title}</h3>
                {subtitle && (
                  <p className="mt-0.5 text-sm text-tsecondary">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="neu-raised rounded-lg p-1.5 text-tsecondary hover:text-tprimary"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="scrollbar-thin flex-1 overflow-y-auto p-5">
              {children}
            </div>
            {footer && (
              <div className="border-t border-white/10 p-5">{footer}</div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

/* ---------------- Page header ---------------- */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-tprimary text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-tsecondary text-pretty">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

/* ---------------- Panel (titled content card) ---------------- */
export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <GlassCard className={cn('flex flex-col', className)}>
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-white/8 px-5 py-3.5">
          <h3 className="text-sm font-semibold text-tprimary">{title}</h3>
          {action}
        </div>
      )}
      <div className={cn('p-5', bodyClassName)}>{children}</div>
    </GlassCard>
  )
}

/* ---------------- Gold button ---------------- */
export function GoldButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-[#14110a] transition-all hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function GhostButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-tsecondary transition-all hover:border-white/20 hover:text-tprimary',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
