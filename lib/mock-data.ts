export type Risk = 'RED' | 'YELLOW' | 'GREEN'
export type UserRole =
  | 'SUPER_ADMIN'
  | 'PLATFORM_ADMIN'
  | 'TENANT_ADMIN'
  | 'PLATFORM_HR'
  | 'CUSTOMER_USER'

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu & Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
  'Andaman & Nicobar',
  'Dadra & Nagar Haveli',
  'Lakshadweep',
]

export const DISTRICTS_BY_STATE: Record<string, string[]> = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj'],
  Delhi: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi'],
}

/* ---------- KPI helpers ---------- */
export interface Kpi {
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down'
  /** Set when a downward movement is the *good* outcome (e.g. latency, errors). */
  goodWhenDown?: boolean
  hint?: string
  /** Optional secondary context line shown under the value. */
  sub?: string
  /** Inline sparkline series for the KPI tile. */
  spark?: number[]
}

export const dashboardKpis: Kpi[] = [
  { label: 'Total Cases Indexed', value: '47,382,194', delta: '+2.3%', trend: 'up', sub: 'vs prev 46.3M', spark: [44.1, 44.6, 45.2, 45.4, 46.1, 46.8, 47.3] },
  { label: 'Searches Today', value: '8,492', delta: '+18%', trend: 'up', sub: 'vs prev 7.2K', spark: [5.1, 6.2, 5.8, 7.1, 7.6, 8.0, 8.49] },
  { label: 'Reports Generated', value: '312', delta: '+4%', trend: 'up', sub: 'vs prev 300', spark: [268, 274, 290, 285, 298, 305, 312] },
  { label: 'Active Tenants', value: '24', delta: '+1', trend: 'up', sub: 'vs prev 23', spark: [20, 21, 21, 22, 23, 23, 24] },
  { label: 'Pipeline Jobs Running', value: '7', hint: 'live', spark: [3, 5, 4, 6, 8, 6, 7] },
  { label: 'Avg Response Time', value: '142ms', delta: '-9ms', trend: 'down', goodWhenDown: true, sub: 'vs prev 151ms', spark: [168, 161, 158, 154, 149, 151, 142] },
]

export const pipelineStages = [
  { stage: 'QUEUED', count: 23, tone: 'neutral' as const },
  { stage: 'RUNNING', count: 7, tone: 'running' as const },
  { stage: 'COMPLETED', count: 1482, tone: 'green' as const },
  { stage: 'FAILED', count: 3, tone: 'red' as const },
  { stage: 'RETRYING', count: 1, tone: 'yellow' as const },
]

export const incidents = [
  { text: 'HC Bombay scraper timeout', time: '14m ago', sev: 'WARN' },
  { text: 'AI Engine latency above 300ms', time: '28m ago', sev: 'WARN' },
  { text: 'Batch #BLK-0841 reprocessed successfully', time: '1h ago', sev: 'INFO' },
  { text: 'eCourts District API rate-limited', time: '2h ago', sev: 'CRIT' },
  { text: 'Redis cache flush completed', time: '3h ago', sev: 'INFO' },
]

export interface TenantRow {
  name: string
  searches: number
  reports: number
  redHits: number
  riskScore: number
  status: 'Active' | 'Suspended'
}

export const tenantRiskRows: TenantRow[] = [
  { name: 'Acme Legal Corp', searches: 12847, reports: 142, redHits: 38, riskScore: 72, status: 'Active' },
  { name: 'TechCorp India', searches: 9420, reports: 88, redHits: 14, riskScore: 41, status: 'Active' },
  { name: 'Meridian HR Partners', searches: 6310, reports: 61, redHits: 9, riskScore: 33, status: 'Active' },
  { name: 'Sterling Verifications', searches: 4180, reports: 47, redHits: 21, riskScore: 58, status: 'Active' },
  { name: 'Nimbus Staffing Pvt Ltd', searches: 2890, reports: 22, redHits: 4, riskScore: 26, status: 'Suspended' },
]

/* ---------- Chart series ---------- */
export const latencySeries = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  search: 120 + Math.round(Math.sin(i / 2) * 40 + Math.random() * 30),
  reports: 220 + Math.round(Math.cos(i / 3) * 60 + Math.random() * 40),
  pdf: 380 + Math.round(Math.sin(i / 4) * 90 + Math.random() * 60),
}))

export const errorRateSeries = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  rate: i === 3 ? 4.8 : Math.round((0.2 + Math.random() * 0.6) * 100) / 100,
}))

export const authErrorSeries = Array.from({ length: 12 }, (_, i) => ({
  t: `${i * 2}:00`,
  errors: Math.round(Math.random() * 14),
}))

export const caseVolumeSeries = Array.from({ length: 30 }, (_, i) => ({
  d: `D${i + 1}`,
  cases: 28000 + Math.round(Math.sin(i / 3) * 6000 + Math.random() * 5000),
}))

export const searchVolumeSeries = Array.from({ length: 30 }, (_, i) => {
  const weekday = i % 7 < 5
  return {
    d: `${i + 1}`,
    searches: (weekday ? 5200 : 2100) + Math.round(Math.random() * 1800),
  }
})

export const mrrSeries = [
  { m: 'Jul', mrr: 210000 },
  { m: 'Aug', mrr: 232000 },
  { m: 'Sep', mrr: 248000 },
  { m: 'Oct', mrr: 271000 },
  { m: 'Nov', mrr: 290000 },
  { m: 'Dec', mrr: 312000 },
  { m: 'Jan', mrr: 334000 },
  { m: 'Feb', mrr: 351000 },
  { m: 'Mar', mrr: 372000 },
  { m: 'Apr', mrr: 398000 },
  { m: 'May', mrr: 414000 },
  { m: 'Jun', mrr: 428000 },
]

export const responseTrend = Array.from({ length: 100 }, (_, i) => ({
  t: i,
  ms: 120 + Math.round(Math.sin(i / 6) * 80 + Math.random() * 120 + (i > 80 ? 200 : 0)),
}))

export const dbPoolSeries = Array.from({ length: 20 }, (_, i) => ({
  t: `Q${i + 1}`,
  used: 20 + Math.round(Math.random() * 70),
}))

export const topStates = [
  { state: 'Maharashtra', cases: 8420000 },
  { state: 'Uttar Pradesh', cases: 7310000 },
  { state: 'Karnataka', cases: 5120000 },
  { state: 'Tamil Nadu', cases: 4780000 },
  { state: 'West Bengal', cases: 4210000 },
  { state: 'Rajasthan', cases: 3640000 },
  { state: 'Gujarat', cases: 3380000 },
  { state: 'Delhi', cases: 2910000 },
  { state: 'Andhra Pradesh', cases: 2540000 },
  { state: 'Bihar', cases: 2180000 },
]

export const errorByEndpoint = [
  { endpoint: '/api/search', errors: 142 },
  { endpoint: '/api/pdf/generate', errors: 98 },
  { endpoint: '/api/reports', errors: 64 },
  { endpoint: '/api/bulk', errors: 41 },
  { endpoint: '/api/auth', errors: 33 },
  { endpoint: '/api/cases', errors: 22 },
  { endpoint: '/api/tenants', errors: 14 },
  { endpoint: '/api/export', errors: 9 },
]

export const weeklyVerifications = [
  { d: 'Mon', v: 284 },
  { d: 'Tue', v: 312 },
  { d: 'Wed', v: 298 },
  { d: 'Thu', v: 341 },
  { d: 'Fri', v: 367 },
  { d: 'Sat', v: 142 },
  { d: 'Sun', v: 103 },
]

export const scoreDistTrend = Array.from({ length: 30 }, (_, i) => ({
  d: `${i + 1}`,
  green: 30 + Math.round(Math.random() * 20),
  yellow: 10 + Math.round(Math.random() * 12),
  red: 2 + Math.round(Math.random() * 8),
}))

export const teamPerformance = [
  { name: 'Priya Sharma', v: 412 },
  { name: 'Amit Patel', v: 388 },
  { name: 'Neha Reddy', v: 351 },
  { name: 'Rohit Verma', v: 298 },
  { name: 'Kavya Nair', v: 254 },
]

export const modelAccuracySeries = Array.from({ length: 8 }, (_, i) => ({
  m: `M${i + 1}`,
  acc: 86 + i * 1.05 + Math.random(),
}))
export const modelLatencySeries = Array.from({ length: 8 }, (_, i) => ({
  m: `M${i + 1}`,
  ms: 130 - i * 5 + Math.random() * 6,
}))

export const caseOutcomeTrend = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
].map((m, i) => ({
  m,
  favorable: 52 + i * 1.4 + Math.round(Math.random() * 6),
}))

/* ---------- Profiles & search ---------- */
export interface Profile {
  id: string
  name: string
  father: string
  dob: string
  district: string
  state: string
  cases: number
  match: number
  risk: Risk
  lastVerified: string
}

export const profiles: Profile[] = [
  { id: 'p1', name: 'Ramesh Kumar Sharma', father: 'Suresh Sharma', dob: '14 Mar 1982', district: 'Pune', state: 'Maharashtra', cases: 8, match: 94, risk: 'RED', lastVerified: '2h ago' },
  { id: 'p2', name: 'Priya Venkataraman', father: 'K. Venkataraman', dob: '02 Jul 1990', district: 'Chennai', state: 'Tamil Nadu', cases: 1, match: 88, risk: 'GREEN', lastVerified: '1d ago' },
  { id: 'p3', name: 'Rajesh Mehta', father: 'Dinesh Mehta', dob: '21 Nov 1978', district: 'Mumbai', state: 'Maharashtra', cases: 5, match: 91, risk: 'RED', lastVerified: '3h ago' },
  { id: 'p4', name: 'Sunita Devi Patel', father: 'Mohan Patel', dob: '11 Jan 1986', district: 'Ahmedabad', state: 'Gujarat', cases: 2, match: 79, risk: 'YELLOW', lastVerified: '5h ago' },
  { id: 'p5', name: 'Arun Krishnamurthy', father: 'S. Krishnamurthy', dob: '30 Sep 1984', district: 'Bengaluru', state: 'Karnataka', cases: 0, match: 96, risk: 'GREEN', lastVerified: '2d ago' },
  { id: 'p6', name: 'Imran Sheikh', father: 'Abdul Sheikh', dob: '18 May 1991', district: 'Nagpur', state: 'Maharashtra', cases: 3, match: 84, risk: 'YELLOW', lastVerified: '6h ago' },
  { id: 'p7', name: 'Lakshmi Narayan', father: 'Govind Narayan', dob: '07 Dec 1975', district: 'Lucknow', state: 'Uttar Pradesh', cases: 6, match: 90, risk: 'RED', lastVerified: '4h ago' },
  { id: 'p8', name: 'Deepak Choudhary', father: 'Ramprasad Choudhary', dob: '25 Aug 1988', district: 'Jaipur', state: 'Rajasthan', cases: 1, match: 82, risk: 'GREEN', lastVerified: '1d ago' },
  { id: 'p9', name: 'Fatima Begum', father: 'Yusuf Khan', dob: '03 Feb 1993', district: 'Hyderabad', state: 'Telangana', cases: 2, match: 76, risk: 'YELLOW', lastVerified: '8h ago' },
  { id: 'p10', name: 'Vikram Singh Rathore', father: 'Mahendra Singh', dob: '19 Jun 1980', district: 'Jodhpur', state: 'Rajasthan', cases: 4, match: 87, risk: 'RED', lastVerified: '5h ago' },
]

/* ---------- Reports ---------- */
export interface ReportItem {
  id: string
  subject: string
  generated: string
  status: 'Ready' | 'Generating' | 'Archived'
  risk: Risk
}

export const reports: ReportItem[] = [
  { id: 'RP-2024-0847', subject: 'Ramesh Kumar Sharma', generated: '2h ago', status: 'Ready', risk: 'RED' },
  { id: 'RP-2024-0846', subject: 'Priya Venkataraman', generated: '5h ago', status: 'Ready', risk: 'GREEN' },
  { id: 'RP-2024-0845', subject: 'Sunita Devi Patel', generated: '8h ago', status: 'Ready', risk: 'YELLOW' },
  { id: 'RP-2024-0844', subject: 'Vikram Singh Rathore', generated: '1d ago', status: 'Archived', risk: 'RED' },
  { id: 'RP-2024-0843', subject: 'Arun Krishnamurthy', generated: '1d ago', status: 'Ready', risk: 'GREEN' },
  { id: 'RP-2024-0842', subject: 'Imran Sheikh', generated: '2d ago', status: 'Generating', risk: 'YELLOW' },
]

export interface CaseRow {
  cnr: string
  type: string
  court: string
  filing: string
  status: string
  source: string
}

export const reportCases: CaseRow[] = [
  { cnr: 'MHAU010012342024', type: 'Criminal', court: 'Bombay High Court', filing: '14 Mar 2021', status: 'Pending', source: 'NJDG HC' },
  { cnr: 'MHPU020045672023', type: 'Financial Fraud', court: 'District Court Pune', filing: '02 Aug 2022', status: 'Pending', source: 'eCourts' },
  { cnr: 'MHPU020031122022', type: 'Cheque Bounce', court: 'District Court Pune', filing: '11 Jan 2022', status: 'Disposed', source: 'eCourts' },
  { cnr: 'MHMU010078902021', type: 'Civil', court: 'Bombay High Court', filing: '20 Jun 2021', status: 'Disposed', source: 'NJDG HC' },
  { cnr: 'MHNG030011452020', type: 'Criminal', court: 'District Court Nagpur', filing: '09 Feb 2020', status: 'Pending', source: 'eCourts' },
]

export const reportSources = [
  { name: 'Supreme Court India', cases: 0, ok: true },
  { name: 'Bombay High Court', cases: 3, ok: true },
  { name: 'District Courts Maharashtra', cases: 5, ok: true },
  { name: 'District Courts Karnataka', cases: 0, ok: false, note: 'Timeout' },
]

/* ---------- AI Insights ---------- */
export const aiModels = [
  { name: 'Risk Classifier', version: 'v2.1', type: 'classification', acc: 94.2, latency: 87, inferences: '1.2M', status: 'ACTIVE' },
  { name: 'Entity Extractor', version: 'v1.8', type: 'NER', acc: 91.7, latency: 43, inferences: '3.4M', status: 'ACTIVE' },
  { name: 'CNR Parser', version: 'v3.0', type: 'parsing', acc: 99.1, latency: 12, inferences: '47M', status: 'ACTIVE' },
  { name: 'Risk Classifier', version: 'v2.0', type: 'classification', acc: 91.8, latency: 102, inferences: '0.9M', status: 'ARCHIVED' },
]

export const intelligenceFeed = [
  { name: 'Rajesh Mehta', risk: 'RED' as Risk, summary: '3 IPC 420 fraud cases in Bombay HC, 2 pending. Financial crime pattern detected.', tags: ['Fraud', 'Criminal'], date: '27 Jun 2026' },
  { name: 'Sunita Devi Patel', risk: 'YELLOW' as Risk, summary: '1 civil dispute, property matter resolved 2019. No criminal record.', tags: ['Civil'], date: '27 Jun 2026' },
  { name: 'Arun Krishnamurthy', risk: 'GREEN' as Risk, summary: 'No adverse records found across 4 court databases.', tags: ['Clear'], date: '26 Jun 2026' },
  { name: 'Vikram Singh Rathore', risk: 'RED' as Risk, summary: '4 criminal cases across Rajasthan, including assault charges under IPC 324.', tags: ['Criminal'], date: '26 Jun 2026' },
]

/* ---------- Users ---------- */
export interface UserRow {
  name: string
  email: string
  role: UserRole
  tenant: string
  active: boolean
  lastLogin: string
}

export const users: UserRow[] = [
  { name: 'Aditya Rao', email: 'aditya@lexisearch.ai', role: 'SUPER_ADMIN', tenant: 'Lexisearch', active: true, lastLogin: '2m ago' },
  { name: 'Meera Iyer', email: 'meera@lexisearch.ai', role: 'PLATFORM_ADMIN', tenant: 'Lexisearch', active: true, lastLogin: '1h ago' },
  { name: 'Sanjay Gupta', email: 'sanjay@acmelegal.in', role: 'TENANT_ADMIN', tenant: 'Acme Legal Corp', active: true, lastLogin: '3h ago' },
  { name: 'Priya Sharma', email: 'priya@acmelegal.in', role: 'PLATFORM_HR', tenant: 'Acme Legal Corp', active: true, lastLogin: '5h ago' },
  { name: 'Amit Patel', email: 'amit@techcorp.in', role: 'PLATFORM_HR', tenant: 'TechCorp India', active: true, lastLogin: '1d ago' },
  { name: 'Ravi Menon', email: 'ravi@techcorp.in', role: 'CUSTOMER_USER', tenant: 'TechCorp India', active: false, lastLogin: '12d ago' },
  { name: 'Neha Reddy', email: 'neha@meridianhr.in', role: 'TENANT_ADMIN', tenant: 'Meridian HR Partners', active: true, lastLogin: '6h ago' },
  { name: 'Karan Malhotra', email: 'karan@sterling.in', role: 'CUSTOMER_USER', tenant: 'Sterling Verifications', active: true, lastLogin: '2d ago' },
  { name: 'Divya Pillai', email: 'divya@nimbus.in', role: 'CUSTOMER_USER', tenant: 'Nimbus Staffing', active: false, lastLogin: '20d ago' },
]

/* ---------- Tenants ---------- */
export interface Tenant {
  name: string
  plan: 'ENTERPRISE' | 'PROFESSIONAL' | 'STARTER'
  active: boolean
  used: number
  quota: number
  mrr: number
  users: number
}

export const tenants: Tenant[] = [
  { name: 'Acme Legal Corp', plan: 'ENTERPRISE', active: true, used: 12847, quota: 20000, mrr: 28000, users: 8 },
  { name: 'TechCorp India', plan: 'PROFESSIONAL', active: true, used: 9420, quota: 12000, mrr: 18000, users: 6 },
  { name: 'Meridian HR Partners', plan: 'PROFESSIONAL', active: true, used: 6310, quota: 10000, mrr: 16000, users: 5 },
  { name: 'Sterling Verifications', plan: 'STARTER', active: true, used: 4180, quota: 5000, mrr: 8000, users: 4 },
  { name: 'Nimbus Staffing', plan: 'STARTER', active: false, used: 2890, quota: 5000, mrr: 8000, users: 3 },
  { name: 'Vanguard Legal LLP', plan: 'ENTERPRISE', active: true, used: 15600, quota: 25000, mrr: 32000, users: 11 },
]

/* ---------- Billing ---------- */
export const billingRows = [
  { tenant: 'Acme Legal Corp', plan: 'ENTERPRISE', amount: 28000, status: 'PAID', next: '01 Jul 2026' },
  { tenant: 'TechCorp India', plan: 'PROFESSIONAL', amount: 18000, status: 'PAID', next: '04 Jul 2026' },
  { tenant: 'Meridian HR Partners', plan: 'PROFESSIONAL', amount: 16000, status: 'PENDING', next: '02 Jul 2026' },
  { tenant: 'Sterling Verifications', plan: 'STARTER', amount: 8000, status: 'OVERDUE', next: '18 Jun 2026' },
  { tenant: 'Vanguard Legal LLP', plan: 'ENTERPRISE', amount: 32000, status: 'PAID', next: '06 Jul 2026' },
  { tenant: 'Nimbus Staffing', plan: 'STARTER', amount: 8000, status: 'OVERDUE', next: '12 Jun 2026' },
]

/* ---------- APIs ---------- */
export const apiSources = [
  { name: 'NJDG Supreme Court', url: 'https://njdg.ecourts.gov.in/sc', type: 'court_records', health: 'HEALTHY', latency: 120, success: 99.8, lastCalled: '12s ago' },
  { name: 'NJDG High Courts', url: 'https://njdg.ecourts.gov.in/hc', type: 'court_records', health: 'HEALTHY', latency: 340, success: 99.1, lastCalled: '8s ago' },
  { name: 'eCourts District', url: 'https://services.ecourts.gov.in', type: 'legal_search', health: 'DEGRADED', latency: 1240, success: 94.2, lastCalled: '4s ago' },
  { name: 'CourtListener', url: 'https://www.courtlistener.com/api', type: 'legal_search', health: 'HEALTHY', latency: 200, success: 99.5, lastCalled: '20s ago' },
]

/* ---------- Infra ---------- */
export const infraHealth = [
  { name: 'PostgreSQL / Neon', status: 'HEALTHY', latency: '12ms' },
  { name: 'Redis Cache', status: 'HEALTHY', latency: '0.4ms' },
  { name: 'Firebase Auth', status: 'HEALTHY', latency: '45ms' },
  { name: 'AI Engine', status: 'DEGRADED', latency: '340ms' },
  { name: 'Background Jobs', status: 'HEALTHY', latency: '—' },
]

export const auditLog = [
  { t: '14:23:01', text: 'User admin@lexisearch.ai retried 3 failed jobs' },
  { t: '14:18:44', text: 'Bulk search batch #BLK-0847 completed' },
  { t: '14:11:09', text: 'Tenant Acme Legal Corp generated report RP-2024-0847' },
  { t: '14:02:11', text: 'HC Bombay scraper timed out' },
  { t: '13:54:37', text: 'AI Engine auto-scaled to 4 replicas' },
  { t: '13:40:02', text: 'User meera@lexisearch.ai invited karan@sterling.in' },
]

/* ---------- Alerts ---------- */
export interface Alert {
  id: string
  sev: 'P0' | 'P1' | 'P2' | 'P3'
  text: string
  time: string
  resolved?: boolean
}

export const activeAlerts: Alert[] = [
  { id: 'a1', sev: 'P0', text: 'AI Engine response time > 500ms for 5 min', time: '8 min ago' },
  { id: 'a2', sev: 'P1', text: 'Bulk search queue depth exceeded 50 items', time: '2h ago' },
  { id: 'a3', sev: 'P2', text: 'District Courts scraper batch delay', time: '4h ago' },
  { id: 'a4', sev: 'P3', text: 'Cache hit rate dropped below 85%', time: '6h ago' },
]

export const resolvedAlerts: Alert[] = [
  { id: 'r1', sev: 'P1', text: 'Redis connection pool exhausted', time: 'resolved 1h ago', resolved: true },
  { id: 'r2', sev: 'P2', text: 'PDF generation backlog cleared', time: 'resolved 3h ago', resolved: true },
]

/* ---------- Case detail ---------- */
export const caseTimeline = [
  { date: '14 Mar 2021', text: 'Case registered at Bombay High Court' },
  { date: '22 Apr 2021', text: 'First hearing, notice issued to respondent' },
  { date: '15 Jun 2021', text: 'Adjournment requested by defence counsel' },
  { date: '08 Sep 2021', text: 'Evidence submitted by prosecution' },
  { date: '12 Jan 2022', text: 'Cross-examination of witnesses' },
  { date: '30 May 2022', text: 'Next hearing scheduled' },
]
