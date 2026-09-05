import { OrganizationRole } from "./enums"

export type OrganizationMember = {
    id: string
    role: OrganizationRole
    user: {
        id: string
        name: string
        email: string
    }
}