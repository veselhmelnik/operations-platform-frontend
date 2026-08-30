import { OrganizationRole } from "./enums"
import { User } from "./user"

export type OrganizationMember = {
    id: string
    role: OrganizationRole
    userId: string
    organizationId: string
    createdAt: string

    user?: User
}