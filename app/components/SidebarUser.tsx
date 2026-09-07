'use client'

import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { useOrganizationMembers } from '@/app/hooks/useOrganizationMembers'
import { useOrganizationParams } from '@/app/hooks/useParams'

export default function SidebarUser() {
  const { organizationId } = useOrganizationParams()
  const { data: currentUser } = useCurrentUser()
  const { data: members = [] } = useOrganizationMembers(organizationId)

  if (!currentUser) {
    return null
  }

  const currentMember = members.find((member) => member.user.id === currentUser.id)

  return (
    <div>
      <div>{currentUser.email}</div>
      {currentMember && <div>{currentMember.role}</div>}
    </div>
  )
}
