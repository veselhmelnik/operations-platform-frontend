'use client'

import { useOrganizationParams } from '@/app/hooks/useParams'
import { useSubscription } from '@/app/hooks/useSubscription'
import { useProjects } from '@/app/hooks/useProjects'
import { useOrganizationMembers } from '@/app/hooks/useOrganizationMembers'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { PLAN_LIMITS } from '@/app/utils/constants'

export default function SubscriptionCard() {
  const { organizationId } = useOrganizationParams()
  const { data: subscription, isError, isLoading } = useSubscription(organizationId)
  const { data: projects = [] } = useProjects(organizationId)
  const { data: members = [] } = useOrganizationMembers(organizationId)
  const { data: currentUser } = useCurrentUser()

  const currentMember = members.find((member) => member.user.id === currentUser?.id)
  const canViewSubscription = currentMember?.role === 'OWNER' || currentMember?.role === 'ADMIN'

  if (!organizationId || isLoading || isError || !subscription || !canViewSubscription) {
    return null
  }

  const limits = PLAN_LIMITS[subscription.plan]

  return (
    <div className="rounded-md border border-border p-4 text-sm">
      <p className="font-semibold mb-3">Current plan: {subscription.plan}</p>

      <div className="flex flex-col gap-1 mb-3 text-muted-foreground">
        <span>
          Projects: {projects.length}
          {limits.projects !== null ? ` / ${limits.projects}` : ''}
        </span>
        <span>
          Members: {members.length}
          {limits.members !== null ? ` / ${limits.members}` : ''}
        </span>
      </div>

      {subscription.plan === 'FREE' && (
        <button
          type="button"
          className="w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Upgrade to Pro
        </button>
      )}
    </div>
  )
}
