'use client'

import { useOrganizationParams } from '@/app/hooks/useParams'
import { useSubscription } from '@/app/hooks/useSubscription'
import { useOrganizationMembers } from '@/app/hooks/useOrganizationMembers'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { useCreateCheckout } from '../hooks/useCreateCheckout'
import { useCreateCustomerPortal } from '../hooks/useCreateCustomerPortal'

function UsageBar({
  label,
  used,
  limit,
}: {
  label: string
  used: number
  limit: number | null
}) {
  const pct = limit && limit > 0 ? Math.min(100, (used / limit) * 100) : null

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-medium text-foreground">
          {limit === null ? `${used} · Unlimited` : `${used} / ${limit}`}
        </span>
      </div>
      {pct !== null && (
        <div className="h-0.75 overflow-hidden rounded-[3px] bg-border">
          <div
            className="animate-bar-fill h-full origin-left rounded-[3px] bg-primary"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  )
}

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
  const isFree = plan === 'FREE'

  const formattedEndPeriod = currentPeriodEnd
    ? new Date(currentPeriodEnd).toLocaleDateString('en-GB')
    : null

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-muted p-3">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 100% 0%, var(--primary-soft), transparent 70%)',
        }}
      />

      <div className="relative">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Current plan
          </span>
          <span className="rounded-full border border-border bg-elevated px-1.75 py-0.5 text-3xs font-semibold tracking-[0.08em] text-muted-foreground">
            {plan}
          </span>
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <UsageBar
            label="Projects"
            used={usage.projects}
            limit={limits.projects}
          />
          <UsageBar
            label="Members"
            used={usage.members}
            limit={limits.members}
          />
        </div>

        <button
          type="button"
          onClick={() => (isFree ? checkout.mutate() : portal.mutate())}
          className="w-full cursor-pointer rounded-lg bg-primary px-2.5 py-2 text-xs font-bold tracking-[-0.01em] text-primary-foreground transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_8px_22px_-8px_var(--primary-line)] active:translate-y-0 active:scale-[0.985]"
        >
          {isFree ? 'Upgrade to Pro' : 'Manage subscription'}
        </button>

        {formattedEndPeriod && (
          <div className="mt-2 text-2xs text-faint">
            Cancels on {formattedEndPeriod}
          </div>
        )}
      </div>
    </div>
  )
}
