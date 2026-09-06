'use client'

import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { useInvitation, useAcceptInvitation } from '@/app/hooks/useInvitation'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { routes } from '@/app/lib/routes'
import { useEffect } from 'react'

export default function InvitePage() {
  const {token} = useParams<{token: string}>()
  const router = useRouter()
  const { data: currentUser, isLoading: userLoading } = useCurrentUser()
  const { data: invitation, isLoading: invitationLoading, error: invitationError } = useInvitation(token)
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
      toast.error(error instanceof Error ? error.message : 'Failed to accept invitation')
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading invitation...</p>
        </div>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm rounded-xl border border-border p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold">Invalid Invitation</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This invitation link is invalid, expired, or has already been used.
          </p>
          <a
            href={routes.dashboard()}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm rounded-xl border border-border p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold">{invitation.organization.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            invited you as {invitation.role}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={routes.login(`/invite/${token}`)}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Log in
            </a>
            <a
              href={`/register?next=${encodeURIComponent(`/invite/${token}`)}`}
              className="w-full inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-border p-6 text-center shadow-sm">
        <h1 className="text-lg font-semibold">{invitation.organization.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          invited you as {invitation.role}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {invitation.email}
        </p>
        <button
          onClick={handleAccept}
          disabled={acceptMutation.isPending}
          className="mt-6 w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {acceptMutation.isPending ? 'Accepting...' : 'Accept invitation'}
        </button>
      </div>
    </div>
  )
}
