import { apiFetch } from "./api"

export type Organization = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

export function getOrganizations() {
    return apiFetch<Organization[]>('/organizations')
}