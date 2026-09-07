import { useCurrentUser } from './useCurrentUser'
import { useOrganizationMembers } from './useOrganizationMembers'

export function useCurrentMember(organizationId: string) {
  const { data: currentUser } = useCurrentUser()
  const { data: members = [] } = useOrganizationMembers(organizationId)

  return members.find((member) => member.user.id === currentUser?.id)
}
