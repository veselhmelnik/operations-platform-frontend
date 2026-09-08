'use client'

import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { useOrganizationMembers } from '@/app/hooks/useOrganizationMembers'
import { useOrganizationParams } from '@/app/hooks/useParams'
import { getInitials } from '@/app/utils/helpers/user.helper'

export default function SidebarUser() {
  const { organizationId } = useOrganizationParams()
  const { data: currentUser } = useCurrentUser()
  const { data: members = [] } = useOrganizationMembers(organizationId)

  if (!currentUser) {
    return null
  }

  const currentMember = members.find(
    (member) => member.user.id === currentUser.id,
  )

  return (
    <div className="animate-fade-in flex items-center gap-2.25 border-t border-border-soft px-3.5 py-3 [animation-delay:240ms]">
      <div className="grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-elevated text-2xs font-bold text-primary">
        {getInitials(currentUser.email)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">
          {currentUser.email}
        </div>
        {currentMember && (
          <div className="text-3xs font-semibold tracking-[0.09em] uppercase text-faint">
            {currentMember.role}
          </div>
        )}
      </div>
    </div>
  )
}
