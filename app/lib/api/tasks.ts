import { Task } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { CreateTaskPayload } from "./dto/create-task.dto";
import { apiRoutes } from "./api-routes";

export function moveTask(api: ApiFetcher, organizationId: string, projectId: string, taskId: string, data: { status: string, position: number }) {
    return api(apiRoutes.organizations.projects.tasks.move(organizationId, projectId, taskId), {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export function createTask(api: ApiFetcher, organizationId: string, projectId: string, dto: CreateTaskPayload) {
    return api<Task>(apiRoutes.organizations.projects.tasks.root(organizationId, projectId), {
        method: 'POST',
        body: JSON.stringify(dto)
    })
}

export function deleteTask(api: ApiFetcher, organizationId: string, projectId: string, taskId: string) {
    return api(apiRoutes.organizations.projects.tasks.byId(organizationId, projectId, taskId), {
        method: 'DELETE'
    })
}