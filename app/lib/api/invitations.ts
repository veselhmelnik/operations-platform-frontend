import { Invitation } from '@/app/types'
import { ApiFetcher } from './api-client'
import { apiRoutes } from './api-routes'
import { CreateInvitationPayload } from './dto/create-invitation.dto'

export function getInvitation(api: ApiFetcher, token: string) {
  return api<Invitation>(apiRoutes.invitations.byToken(token))
}

export function acceptInvitation(api: ApiFetcher, token: string) {
  return api<{ message: string }>(apiRoutes.invitations.accept(token), {
    method: 'POST',
  })
}

export function createInvitation(
  api: ApiFetcher,
  organizationId: string,
  dto: CreateInvitationPayload,
) {
  return api<Invitation>(
    apiRoutes.invitations.root(organizationId),
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
  )
}
