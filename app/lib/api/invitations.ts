import { Invitation } from '@/app/types'
import { ApiFetcher } from './api-client'
import { apiRoutes } from './api-routes'

export function getInvitation(api: ApiFetcher, token: string) {
  return api<Invitation>(apiRoutes.invitations.byToken(token))
}

export function acceptInvitation(api: ApiFetcher, token: string) {
  return api<{ message: string }>(apiRoutes.invitations.accept(token), {
    method: 'POST',
  })
}
