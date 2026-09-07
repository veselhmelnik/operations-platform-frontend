'use client'

import { useOrganizationParams } from '@/app/hooks/useParams'
import { useSubscription } from '@/app/hooks/useSubscription'
import { useOrganizationMembers } from '@/app/hooks/useOrganizationMembers'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { useCreateCheckout } from '../hooks/useCreateCheckout'
import { useCreateCustomerPortal } from '../hooks/useCreateCustomerPortal'

export default function SubscriptionCard() {
  const { organizationId } = useOrganizationParams()
  const {
    data: subscription,
    isError,
    isLoading,
  } = useSubscription(organizationId)
  const { data: members = [] } = useOrganizationMembers(organizationId)
  const { data: currentUser } = useCurrentUser()
  const checkout = useCreateCheckout()
  const portal = useCreateCustomerPortal()

  const currentMember = members.find(
    (member) => member.user.id === currentUser?.id,
  )
  const canViewSubscription =
    currentMember?.role === 'OWNER' || currentMember?.role === 'ADMIN'

  if (
    !organizationId ||
    isLoading ||
    isError ||
    !subscription ||
    !canViewSubscription
  ) {
    return null
  }

  const { plan, usage, limits, currentPeriodEnd } = subscription


  const formattedEndPeriod = currentPeriodEnd ? new Date(currentPeriodEnd).toLocaleDateString('en-GB') : null
  console.log(formattedEndPeriod)
  return (
    <div className="rounded-md border border-border p-4 text-sm">
      <p className="font-semibold mb-3">Current plan: {plan}</p>

      <div className="flex flex-col gap-1 mb-3 text-muted-foreground">
        <span>
          Projects: {usage.projects}
          {limits.projects !== null ? ` / ${limits.projects}` : ''}
        </span>
        <span>
          Members: {usage.members}
          {limits.members !== null ? ` / ${limits.members}` : ''}
        </span>
      </div>

      {plan === 'FREE' && (
        <button
          onClick={() => checkout.mutate()}
          type="button"
          className="w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Upgrade to Pro
        </button>
      )}
      {plan === 'PRO' && (
        <button
          onClick={() => portal.mutate()}
          type="button"
          className="w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Manage Subscription
        </button>
      )}
      {formattedEndPeriod ?<div>Cancels on {formattedEndPeriod}</div> : ''}
    </div>
  )
}
