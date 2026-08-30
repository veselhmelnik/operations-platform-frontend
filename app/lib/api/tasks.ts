import { apiFetch } from "./api";

export function moveTask(organizationId: string, projectId: string, taskId: string, data: { status: string, position: number }) {
    return apiFetch(`/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}/move`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}