import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { createLabel } from '@/app/lib/api/labels'
import { queryKeys } from '@/app/lib/queryKeys'

export function useCreateLabel(organizationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ name, color }: { name: string; color: string }) =>
      createLabel(apiClient, organizationId, { name, color }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.labels(organizationId),
      })
    },
  })
}
