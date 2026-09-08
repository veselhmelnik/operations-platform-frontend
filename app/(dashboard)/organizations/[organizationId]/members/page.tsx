'use client'

import { useState } from 'react'
import {
  useOrganizationMembers,
  useUpdateMember,
  useDeleteMember,
} from '@/app/hooks/useOrganizationMembers'
import InviteMemberModal from '@/app/components/Modals/InviteMemberModal'
import SelectField from '@/app/components/SelectField'
import { OrganizationRole } from '@/app/types/enums'
import { toast } from 'sonner'
import { useOrganizationParams } from '@/app/hooks/useParams'
import { getInitials } from '@/app/utils/helpers/user.helper'
import { btnPrimary } from '@/app/utils/tailwind-constants'

const MembersPage = () => {
  const { organizationId } = useOrganizationParams()
  const { data: members = [], isLoading } =
    useOrganizationMembers(organizationId)
  const updateMember = useUpdateMember(organizationId)
  const deleteMember = useDeleteMember(organizationId)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)

  const handleRoleChange = async (
    memberId: string,
    newRole: OrganizationRole,
  ) => {
    try {
      await updateMember.mutateAsync({ memberId, dto: { role: newRole } })
      setEditingMemberId(null)
      toast.success('Member role updated')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update member',
      )
    }
  }

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return

    try {
      await deleteMember.mutateAsync(memberId)
      toast.success('Member removed')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to remove member',
      )
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading members…</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-up flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-[-0.015em]">
          Organization members
        </h1>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className={btnPrimary}
        >
          Invite member
        </button>
      </div>

      {members.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border-soft bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-soft bg-muted">
                <th className="px-4 py-2.5 text-left text-3xs font-semibold tracking-[0.11em] uppercase text-faint">
                  Member
                </th>
                <th className="px-4 py-2.5 text-left text-3xs font-semibold tracking-[0.11em] uppercase text-faint">
                  Role
                </th>
                <th className="w-px px-4 py-2.5 text-right text-3xs font-semibold tracking-[0.11em] uppercase text-faint">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="transition-colors hover:bg-muted/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-elevated text-2xs font-bold text-primary">
                        {getInitials(member.user?.name || member.user?.email || '?')}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-foreground">
                          {member.user?.name || 'Unknown'}
                        </div>
                        <div className="truncate text-2xs text-faint">
                          {member.user?.email || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {editingMemberId === member.id ? (
                      <div className="max-w-40">
                        <SelectField
                          value={member.role}
                          disabled={updateMember.isPending}
                          onChange={(value) =>
                            handleRoleChange(
                              member.id,
                              value as OrganizationRole,
                            )
                          }
                        >
                          <option value="MEMBER">Member</option>
                          <option value="MANAGER">Manager</option>
                          <option value="ADMIN">Admin</option>
                          <option value="VIEWER">Viewer</option>
                        </SelectField>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingMemberId(member.id)}
                        className={`cursor-pointer rounded-full border px-2 py-0.5 text-2xs font-semibold tracking-[0.08em] transition-colors ${
                          member.role === 'OWNER'
                            ? 'border-primary-line bg-primary-soft text-primary'
                            : 'border-border bg-elevated text-muted-foreground hover:border-primary-line hover:text-primary'
                        }`}
                      >
                        {member.role}
                      </button>
                    )}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {editingMemberId === member.id ? (
                      <button
                        onClick={() => setEditingMemberId(null)}
                        className="cursor-pointer rounded-lg px-3 py-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        disabled={deleteMember.isPending}
                        className="cursor-pointer rounded-lg px-3 py-1 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-faint">
          No members yet. Invite someone to get started.
        </div>
      )}

      <InviteMemberModal
        organizationId={organizationId}
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  )
}

export default MembersPage
