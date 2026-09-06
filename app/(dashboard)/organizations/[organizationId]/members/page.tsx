'use client'

import { useState } from 'react'
import { useOrganizationMembers, useUpdateMember, useDeleteMember } from '@/app/hooks/useOrganizationMembers'
import InviteMemberModal from '@/app/components/Modals/InviteMemberModal'
import { OrganizationRole } from '@/app/types/enums'
import { toast } from 'sonner'
import { useOrganizationParams } from '@/app/hooks/useParams'

const MembersPage = () => {
  const { organizationId } = useOrganizationParams()
  const { data: members = [], isLoading } = useOrganizationMembers(organizationId)
  const updateMember = useUpdateMember(organizationId)
  const deleteMember = useDeleteMember(organizationId)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)

  const handleRoleChange = async (memberId: string, newRole: OrganizationRole) => {
    try {
      await updateMember.mutateAsync({
        memberId,
        dto: { role: newRole },
      })
      setEditingMemberId(null)
      toast.success('Member role updated')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update member')
    }
  }

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return

    try {
      await deleteMember.mutateAsync(memberId)
      toast.success('Member removed')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to remove member')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading members...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Organization Members</h1>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Invite Member
        </button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 text-sm">{member.user?.name || 'Unknown'}</td>
                <td className="px-6 py-4 text-sm">{member.user?.email || 'N/A'}</td>
                <td className="px-6 py-4 text-sm">
                  {editingMemberId === member.id ? (
                    <select
                      value={member.role}
                      onChange={(e) =>
                        handleRoleChange(member.id, e.target.value as OrganizationRole)
                      }
                      disabled={updateMember.isPending}
                      className="px-2 py-1 border border-input rounded bg-background text-foreground text-sm"
                    >
                      <option value="MEMBER">Member</option>
                      <option value="MANAGER">Manager</option>
                      <option value="ADMIN">Admin</option>
                      <option value="VIEWER">Viewer</option>
                    </select>
                  ) : (
                    <span
                      onClick={() => setEditingMemberId(member.id)}
                      className="cursor-pointer hover:underline"
                    >
                      {member.role}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {editingMemberId !== member.id && (
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      disabled={deleteMember.isPending}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-medium disabled:opacity-50"
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

      {members.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No members yet. Invite someone to get started!
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
