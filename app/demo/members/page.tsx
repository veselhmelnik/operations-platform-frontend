'use client'

import { useDemoWorkspace } from '../demo-workspace-context'
import { getInitials } from '@/app/utils/helpers/user.helper'

const DemoMembersPage = () => {
  const { members } = useDemoWorkspace()

  return (
    <div className="animate-fade-up flex flex-col gap-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-semibold tracking-[-0.015em]">
          Organization members
        </h1>
        <div className="rounded-lg bg-secondary px-3 py-1.5 text-2xs text-muted-foreground">
          Demo mode: invite disabled
        </div>
      </div>

      {members.length > 0 ? (
        <ul className="divide-y divide-border-soft overflow-hidden rounded-xl border border-border-soft bg-card">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-3 transition-colors hover:bg-muted/50 md:px-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <div className="grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-elevated text-2xs font-bold text-primary">
                  {getInitials(
                    member.user?.name || member.user?.email || '?',
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-foreground">
                    {member.user?.name || 'Unknown'}
                  </div>
                  <div className="truncate text-2xs text-faint">
                    {member.user?.email || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-secondary px-2 py-1 text-2xs font-semibold text-foreground">
                  {member.role}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-faint">
          No members in this organization.
        </div>
      )}
    </div>
  )
}

export default DemoMembersPage
