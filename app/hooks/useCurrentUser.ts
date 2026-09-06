import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { getCurrentUser } from '@/app/lib/api/auth'

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(apiClient),
    retry: false,
  })
}
