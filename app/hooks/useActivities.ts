import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { getActivities, deleteAllActivities } from '@/app/lib/api/activities'
import { queryKeys } from '@/app/lib/queryKeys'

export function useActivities(organizationId: string) {
  return useQuery({
    queryKey: queryKeys.activities(organizationId),
    queryFn: () => getActivities(apiClient, organizationId),
  })
}

export function useDeleteAllActivities(organizationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteAllActivities(apiClient, organizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.activities(organizationId),
      })
    },
  })
}
