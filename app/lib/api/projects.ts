import { Board, Project } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { CreateProjectPayload } from "./dto/create-project.dto";

export function getProjectBoard(api: ApiFetcher, organizationId: string, projectId: string) {
    return api<Board>(`/organizations/${organizationId}/projects/${projectId}/board`)
}

export function getProjects(api: ApiFetcher, organizationId: string) {
    return api<Project[]>(`/organizations/${organizationId}/projects/`)
}

export function createProject(api: ApiFetcher, organizationId: string, dto: CreateProjectPayload) {
    return api<Project>(`/organizations/${organizationId}/projects`, {
        method: 'POST',
        body: JSON.stringify(dto)
    })
}