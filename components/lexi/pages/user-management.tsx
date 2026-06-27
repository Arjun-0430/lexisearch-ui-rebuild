'use client'

import { users, type UserRole } from '@/lib/mock-data'
import { Edit, Plus, Power, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  FieldLabel,
  GhostButton,
  GoldButton,
  KpiCard,
  NeuInput,
  NeuSelect,
  PageHeader,
  Panel,
  SlideDrawer,
  StatusDot,
} from '../primitives'
import { cn } from '@/lib/utils'

const roleStyle: Record<UserRole, string> = {
  SUPER_ADMIN: 'bg-gold/15 text-gold ring-gold/25',
  PLATFORM_ADMIN: 'bg-role-blue/15 text-role-blue ring-role-blue/25',
  TENANT_ADMIN: 'bg-[#7c5fce]/15 text-[#7c5fce] ring-[#7c5fce]/25',
  PLATFORM_HR: 'bg-[#1f9e96]/15 text-[#1f9e96] ring-[#1f9e96]/25',
  CUSTOMER_USER: 'bg-foreground/8 text-tsecondary ring-foreground/10',
}

const kpis = [
  { label: 'Total Users', value: '47' },
  { label: 'Active', value: '38', delta: '+3', trend: 'up' as const },
  { label: 'Inactive', value: '9' },
  { label: 'Admins', value: '6' },
]

export function UserManagementPage() {
  const [drawer, setDrawer] = useState(false)

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Invite, edit, and manage platform users."
        actions={
          <GoldButton onClick={() => setDrawer(true)}>
            <Plus className="size-4" /> Invite User
          </GoldButton>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <Panel title="Users" bodyClassName="p-0">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-foreground/8 text-left text-[11px] uppercase tracking-wider text-tmuted">
                <th className="px-5 py-3 font-medium">Name / Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Tenant</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Last Login</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b border-foreground/5 last:border-0 hover:bg-foreground/[0.02]">
                  <td className="px-5 py-3">
                    <p className="font-medium text-tprimary">{u.name}</p>
                    <p className="text-xs text-tmuted">{u.email}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset',
                      roleStyle[u.role],
                    )}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-tsecondary">{u.tenant}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-2 text-xs text-tsecondary">
                      <StatusDot tone={u.active ? 'green' : 'red'} />
                      {u.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-tsecondary">{u.lastLogin}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button aria-label="Edit" className="neu-raised rounded-lg p-1.5 text-tsecondary hover:text-tprimary"><Edit className="size-3.5" /></button>
                      <button aria-label="Toggle" className="neu-raised rounded-lg p-1.5 text-tsecondary hover:text-tprimary"><Power className="size-3.5" /></button>
                      <button aria-label="Delete" className="neu-raised rounded-lg p-1.5 text-tsecondary hover:text-risk-red"><Trash2 className="size-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-foreground/8 px-5 py-3 text-xs text-tmuted">
          <span>Showing {users.length} of 47 users</span>
          <div className="flex gap-2">
            <GhostButton className="h-7 px-2.5 py-0 text-xs">Prev</GhostButton>
            <GhostButton className="h-7 px-2.5 py-0 text-xs">Next</GhostButton>
          </div>
        </div>
      </Panel>

      <SlideDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title="Invite User"
        subtitle="Send an invitation email"
        footer={
          <div className="flex items-center justify-end gap-2">
            <GhostButton onClick={() => setDrawer(false)}>Cancel</GhostButton>
            <GoldButton onClick={() => setDrawer(false)}>Send Invite</GoldButton>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div><FieldLabel>Name</FieldLabel><NeuInput placeholder="Full name" /></div>
          <div><FieldLabel>Email</FieldLabel><NeuInput type="email" placeholder="name@company.com" /></div>
          <div>
            <FieldLabel>Role</FieldLabel>
            <NeuSelect>
              <option>SUPER_ADMIN</option>
              <option>PLATFORM_ADMIN</option>
              <option>TENANT_ADMIN</option>
              <option>PLATFORM_HR</option>
              <option>CUSTOMER_USER</option>
            </NeuSelect>
          </div>
          <div>
            <FieldLabel>Tenant</FieldLabel>
            <NeuSelect>
              <option>Acme Legal Corp</option>
              <option>TechCorp India</option>
              <option>Meridian HR Partners</option>
              <option>Sterling Verifications</option>
            </NeuSelect>
          </div>
        </div>
      </SlideDrawer>
    </div>
  )
}
