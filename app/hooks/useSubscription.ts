import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { getSubscription } from '@/app/lib/api/subscriptions'
import { queryKeys } from '@/app/lib/queryKeys'

export function useSubscription(organizationId: string) {
  return useQuery({
    queryKey: queryKeys.subscription(organizationId),
    queryFn: () => getSubscription(apiClient, organizationId),
    enabled: !!organizationId,
    retry: false,
  })
}
