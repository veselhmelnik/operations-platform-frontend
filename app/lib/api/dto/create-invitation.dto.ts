import { OrganizationRole } from "@/app/types/enums"

export type CreateInvitationPayload = {
  email: string
  role: OrganizationRole
}