import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { getProjects } from '@/app/lib/api/projects'
import { queryKeys } from '@/app/lib/queryKeys'

export function useProjects(organizationId: string) {
  return useQuery({
    queryKey: queryKeys.projects(organizationId),
    queryFn: () => getProjects(apiClient, organizationId),
    enabled: !!organizationId,
  })
}
