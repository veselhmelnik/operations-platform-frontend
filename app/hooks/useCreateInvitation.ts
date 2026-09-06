import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { createInvitation } from '@/app/lib/api/invitations'
import { CreateInvitationPayload } from '@/app/lib/api/dto/create-invitation.dto'

export function useCreateInvitation(organizationId: string) {
  return useMutation({
    mutationFn: (payload: CreateInvitationPayload) =>
      createInvitation(apiClient, organizationId, payload),
  })
}
