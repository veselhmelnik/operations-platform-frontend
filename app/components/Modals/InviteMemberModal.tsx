'use client'

import { useState } from 'react'
import { useCreateInvitation } from '@/app/hooks/useCreateInvitation'
import { OrganizationRole } from '@/app/types/enums'
import { toast } from 'sonner'

type InviteMemberModalProps = {
  organizationId: string
  isOpen: boolean
  onClose: () => void
}

export default function InviteMemberModal({
  organizationId,
  isOpen,
  onClose,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<OrganizationRole>('MEMBER')
  const [invitationLink, setInvitationLink] = useState<string | null>(null)
  const createInvitationMutation = useCreateInvitation(organizationId)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await createInvitationMutation.mutateAsync({
        email,
        role,
      })
      
      // Extract token from response to build the invite link
      // Assuming response contains the invitation token
      const token = response.token || response.id
      if (token) {
        const link = `${window.location.origin}/invite/${token}`
        setInvitationLink(link)
        setEmail('')
        setRole('MEMBER')
        toast.success('Invitation sent successfully')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send invitation')
    }
  }

  const handleCopyLink = () => {
    if (invitationLink) {
      navigator.clipboard.writeText(invitationLink)
      toast.success('Invitation link copied to clipboard')
    }
  }

  const handleClose = () => {
    setInvitationLink(null)
    setEmail('')
    setRole('MEMBER')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg border border-border p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {invitationLink ? 'Invitation Link' : 'Invite Member'}
        </h2>

        {!invitationLink ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@example.com"
                required
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as OrganizationRole)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="MEMBER">Member</option>
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createInvitationMutation.isPending || !email}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createInvitationMutation.isPending ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Share this link with the new member:
            </p>
            <div className="p-3 bg-muted rounded-md break-all">
              <code className="text-sm">{invitationLink}</code>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Copy Invite Link
              </button>
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
