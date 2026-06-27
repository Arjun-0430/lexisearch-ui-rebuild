'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const C = {
  gold: '#c9a84c',
  red: '#e53e3e',
  yellow: '#d69e2e',
  green: '#38a169',
  blue: '#4a90d9',
  grid: 'rgba(255,255,255,0.06)',
  axis: '#8b8fa8',
}

const tooltipStyle = {
  background: '#2a2f3a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  fontSize: 12,
  color: '#f0ede8',
}

const axis = { stroke: C.axis, fontSize: 11, tickLine: false, axisLine: false }

export function AreaSeries({
  data,
  xKey,
  yKey,
  color = C.gold,
  height = 240,
}: {
  data: any[]
  xKey: string
  yKey: string
  color?: string
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${yKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey={xKey} {...axis} minTickGap={24} />
        <YAxis {...axis} width={48} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: C.grid }} />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#grad-${yKey})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function MultiLine({
  data,
  xKey,
  lines,
  thresholds,
  height = 240,
}: {
  data: any[]
  xKey: string
  lines: { key: string; color: string; name: string }[]
  thresholds?: { y: number; color: string; label: string }[]
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey={xKey} {...axis} minTickGap={24} />
        <YAxis {...axis} width={48} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: C.grid }} />
        {thresholds?.map((t) => (
          <ReferenceLine
            key={t.label}
            y={t.y}
            stroke={t.color}
            strokeDasharray="4 4"
            label={{ value: t.label, fill: t.color, fontSize: 10, position: 'insideTopRight' }}
          />
        ))}
        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.name}
            stroke={l.color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function VBar({
  data,
  xKey,
  yKey,
  color = C.gold,
  height = 240,
}: {
  data: any[]
  xKey: string
  yKey: string
  color?: string
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey={xKey} {...axis} minTickGap={8} />
        <YAxis {...axis} width={48} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function HBar({
  data,
  catKey,
  valKey,
  color = C.gold,
  height = 280,
}: {
  data: any[]
  catKey: string
  valKey: string
  color?: string
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
      >
        <CartesianGrid stroke={C.grid} horizontal={false} />
        <XAxis type="number" {...axis} />
        <YAxis type="category" dataKey={catKey} {...axis} width={110} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Bar dataKey={valKey} fill={color} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function StackedArea({
  data,
  xKey,
  height = 240,
}: {
  data: any[]
  xKey: string
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey={xKey} {...axis} minTickGap={24} />
        <YAxis {...axis} width={40} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="green" stackId="1" stroke={C.green} fill={C.green} fillOpacity={0.4} />
        <Area type="monotone" dataKey="yellow" stackId="1" stroke={C.yellow} fill={C.yellow} fillOpacity={0.4} />
        <Area type="monotone" dataKey="red" stackId="1" stroke={C.red} fill={C.red} fillOpacity={0.4} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function DonutChart({
  data,
  height = 240,
  centerLabel,
}: {
  data: { name: string; value: number; color: string }[]
  height?: number
  centerLabel?: string
}) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      {centerLabel && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-sm font-bold text-tprimary">
            {centerLabel}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-tmuted">
            total cases
          </span>
        </div>
      )}
    </div>
  )
}

export function Sparkline({
  data,
  color = C.gold,
}: {
  data: { v: number }[]
  color?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
