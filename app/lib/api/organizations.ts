import { ApiFetcher } from "./api-client"
import { CreateOrganizationPayload } from "./dto/create-organization.dto"

export type Organization = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

export function getOrganizations(api: ApiFetcher) {
    return api<Organization[]>('/organizations')
}

export function createOrganization(api: ApiFetcher, data: CreateOrganizationPayload) {
    return api<Organization>('/organizations', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}