import { Task } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { CreateTaskPayload } from "./dto/create-task.dto";

export function moveTask(api: ApiFetcher, organizationId: string, projectId: string, taskId: string, data: { status: string, position: number }) {
    return api(`/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}/move`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export function createTask(api: ApiFetcher, organizationId: string, projectId: string, dto: CreateTaskPayload) {
    return api<Task>(`/organizations/${organizationId}/projects/${projectId}/tasks`, {
        method: 'POST',
        body: JSON.stringify(dto)
    })
}