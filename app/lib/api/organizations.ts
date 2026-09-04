import { ApiFetcher } from "./api-client"
import { apiRoutes } from "./api-routes"
import { CreateOrganizationPayload } from "./dto/create-organization.dto"

export type Organization = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

export function getOrganizations(api: ApiFetcher) {
    return api<Organization[]>(apiRoutes.organizations.root())
}

export function createOrganization(api: ApiFetcher, data: CreateOrganizationPayload) {
    return api<Organization>(apiRoutes.organizations.root(), {
        method: 'POST',
        body: JSON.stringify(data)
    })
}