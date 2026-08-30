import { OrganizationMember } from "./organizationMember"
import { Project } from "./project"


export type Organization = {
    id: string
    name: string
    createdAt: string
    updatedAt: string

    members?: OrganizationMember[]
    projects?: Project[]
}
