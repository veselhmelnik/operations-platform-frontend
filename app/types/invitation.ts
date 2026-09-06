import { Organization } from './organization'

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
}

export enum MemberRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export type Invitation = {
  id: string
  token: string
  email: string
  role: MemberRole
  status: InvitationStatus
  organization: Organization
  createdAt: string
  expiresAt: string
}

export type InvitationResponse = {
  invitation: Invitation
  organization: Organization
}
