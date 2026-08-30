import { apiFetch } from "./api";


export function getProjectBoard(organizationId: string, projectId: string) {
    return apiFetch(`/organizations/${organizationId}/projects/${projectId}/board`)
}