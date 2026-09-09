import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { getOrganizationLabels } from '@/app/lib/api/labels'
import { queryKeys } from '@/app/lib/queryKeys'
import { useOrganizationParams } from './useParams'

export function useOrganizationLabels() {
  const { organizationId } = useOrganizationParams()

  return useQuery({
    queryKey: queryKeys.labels(organizationId),
    queryFn: () => getOrganizationLabels(apiClient, organizationId),
    enabled: !!organizationId,
  })
}
