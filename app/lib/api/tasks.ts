import { Task } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { CreateTaskPayload } from "./dto/create-task.dto";
import { apiRoutes } from "./api-routes";
import { UpdateTaskPayload } from "./dto/update-task.dto";

export function createTask(api: ApiFetcher, organizationId: string, projectId: string, data: CreateTaskPayload) {
    return api<Task>(apiRoutes.organizations.projects.tasks.root(organizationId, projectId), {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export function updateTask(api: ApiFetcher, organizationId: string, projectId: string, taskId: string, data: UpdateTaskPayload) {
    return api<Task>(apiRoutes.organizations.projects.tasks.byId(organizationId, projectId, taskId), {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export function moveTask(api: ApiFetcher, organizationId: string, projectId: string, taskId: string, data: { status: string, position: number }) {
    return api(apiRoutes.organizations.projects.tasks.move(organizationId, projectId, taskId), {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export function deleteTask(api: ApiFetcher, organizationId: string, projectId: string, taskId: string) {
    return api(apiRoutes.organizations.projects.tasks.byId(organizationId, projectId, taskId), {
        method: 'DELETE'
    })
}