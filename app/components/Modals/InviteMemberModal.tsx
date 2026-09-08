'use client'

import { useState } from 'react'
import { useCreateInvitation } from '@/app/hooks/useCreateInvitation'
import { OrganizationRole } from '@/app/types/enums'
import {
  btnGhost,
  btnPrimary,
  fieldInput,
  fieldLabel,
} from '@/app/utils/tailwind-constants'
import { toast } from 'sonner'
import ModalShell from './ModalShell'
import SelectField from '../SelectField'

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const invitation = await createInvitationMutation.mutateAsync({
        email,
        role,
      })

      setInvitationLink(
        `${window.location.origin}/invite/${invitation.token}`,
      )
      setEmail('')
      setRole('MEMBER')
      toast.success('Invitation created')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to send invitation',
      )
    }
  }

  const handleCopyLink = () => {
    if (invitationLink) {
      navigator.clipboard.writeText(invitationLink)
      toast.success('Invitation link copied')
    }
  }

  const handleClose = () => {
    setInvitationLink(null)
    setEmail('')
    setRole('MEMBER')
    onClose()
  }

  if (invitationLink) {
    return (
      <ModalShell
        title="Invitation link"
        onClose={handleClose}
        footer={
          <>
            <button onClick={handleClose} className={btnGhost}>
              Done
            </button>
            <button onClick={handleCopyLink} className={btnPrimary}>
              Copy invite link
            </button>
          </>
        }
      >
        <p className="text-xs text-muted-foreground">
          Share this link with the new member:
        </p>
        <div className="rounded-lg border border-border bg-muted p-3 break-all">
          <code className="text-xs text-foreground">{invitationLink}</code>
        </div>
      </ModalShell>
    )
  }

  return (
    <ModalShell
      title="Invite member"
      onClose={handleClose}
      onSubmit={handleSubmit}
      footer={
        <>
          <button type="button" onClick={handleClose} className={btnGhost}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={createInvitationMutation.isPending || !email}
            className={btnPrimary}
          >
            {createInvitationMutation.isPending
              ? 'Sending…'
              : 'Send invitation'}
          </button>
        </>
      }
    >
      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Email</span>
        <input
          autoFocus
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="member@example.com"
          required
          className={fieldInput}
        />
      </label>

      <SelectField
        label="Role"
        value={role}
        onChange={(value) => setRole(value as OrganizationRole)}
      >
        <option value="MEMBER">Member</option>
        <option value="MANAGER">Manager</option>
        <option value="ADMIN">Admin</option>
        <option value="VIEWER">Viewer</option>
      </SelectField>
    </ModalShell>
  )
}
