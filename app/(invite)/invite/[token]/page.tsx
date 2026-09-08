'use client'

import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { useInvitation, useAcceptInvitation } from '@/app/hooks/useInvitation'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { routes } from '@/app/lib/routes'
import { useEffect } from 'react'
import LogoMark from '@/app/components/LogoMark'
import { btnGhost, btnPrimary } from '@/app/utils/tailwind-constants'

function InviteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <LogoMark />
          <span className="text-base font-bold tracking-[-0.035em] text-primary">
            TaskFlow
          </span>
        </div>
        <div className="animate-spring-in rounded-2xl border border-border bg-card p-6 text-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function InvitePage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()
  const { data: currentUser, isLoading: userLoading } = useCurrentUser()
  const {
    data: invitation,
    isLoading: invitationLoading,
    error: invitationError,
  } = useInvitation(token)
  const acceptMutation = useAcceptInvitation()

  const isLoading = userLoading || invitationLoading

  useEffect(() => {
    if (invitationError) {
      toast.error('Invalid invitation link')
    }
  }, [invitationError])

  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(token)
      if (invitation) {
        router.push(routes.organization(invitation.organization.id))
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to accept invitation',
      )
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading invitation…</p>
      </div>
    )
  }

  if (!invitation) {
    return (
      <InviteShell>
        <h1 className="text-lg font-semibold tracking-[-0.015em]">
          Invalid invitation
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          This invitation link is invalid, expired, or has already been used.
        </p>
        <a href={routes.dashboard()} className={`${btnGhost} mt-5 w-full`}>
          Back to dashboard
        </a>
      </InviteShell>
    )
  }

  return (
    <InviteShell>
      <h1 className="text-lg font-semibold tracking-[-0.015em]">
        {invitation.organization.name}
      </h1>
      <p className="mt-2 text-xs text-muted-foreground">
        invited you as{' '}
        <span className="font-semibold text-primary">{invitation.role}</span>
      </p>

      {currentUser ? (
        <>
          <p className="mt-1 text-2xs text-faint">{invitation.email}</p>
          <button
            onClick={handleAccept}
            disabled={acceptMutation.isPending}
            className={`${btnPrimary} mt-5 w-full`}
          >
            {acceptMutation.isPending ? 'Accepting…' : 'Accept invitation'}
          </button>
        </>
      ) : (
        <div className="mt-5 flex flex-col gap-2.5">
          <a
            href={routes.login(`/invite/${token}`)}
            className={`${btnPrimary} w-full`}
          >
            Log in
          </a>
          <a
            href={`/register?next=${encodeURIComponent(`/invite/${token}`)}`}
            className={`${btnGhost} w-full`}
          >
            Create account
          </a>
        </div>
      )}
    </InviteShell>
  )
}
