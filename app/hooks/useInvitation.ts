import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { acceptInvitation, getInvitation } from '@/app/lib/api/invitations'

export function useInvitation(token: string) {
  return useQuery({
    queryKey: ['invitation', token],
    queryFn: () => getInvitation(apiClient, token),
    enabled: !!token,
  })
}

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (token: string) => acceptInvitation(apiClient, token),
  })
}
