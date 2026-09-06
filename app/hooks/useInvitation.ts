import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { acceptInvitation, getInvitation } from '@/app/lib/api/invitations'

export function useInvitation(token: string | undefined) {
  return useQuery({
    queryKey: ['invitation', token],
    queryFn: () => (token ? getInvitation(apiClient, token) : null),
    enabled: !!token,
  })
}

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (token: string) => acceptInvitation(apiClient, token),
  })
}
