import { ApiFetcher } from "./api-client";

export function moveTask(api: ApiFetcher, organizationId: string, projectId: string, taskId: string, data: { status: string, position: number }) {
    return api(`/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}/move`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}