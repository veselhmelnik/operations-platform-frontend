import { TaskLabel } from '@/app/types/task'
import { ApiFetcher } from './api-client'
import { apiRoutes } from './api-routes'

export function getOrganizationLabels(
  api: ApiFetcher,
  organizationId: string,
) {
  return api<TaskLabel[]>(apiRoutes.organizations.labels.root(organizationId))
}

export function createLabel(
  api: ApiFetcher,
  organizationId: string,
  payload: { name: string; color: string },
) {
  return api<TaskLabel>(
    apiRoutes.organizations.labels.root(organizationId),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  )
}
