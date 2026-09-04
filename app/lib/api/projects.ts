import { Board, Project } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { CreateProjectPayload } from "./dto/create-project.dto";
import { apiRoutes } from "./api-routes";

export function getProjectBoard(api: ApiFetcher, organizationId: string, projectId: string) {
    return api<Board>(apiRoutes.organizations.projects.board(organizationId, projectId))
}

export function getProjects(api: ApiFetcher, organizationId: string) {
    return api<Project[]>(apiRoutes.organizations.projects.root(organizationId))
}

export function createProject(api: ApiFetcher, organizationId: string, dto: CreateProjectPayload) {
    return api<Project>(apiRoutes.organizations.projects.root(organizationId), {
        method: 'POST',
        body: JSON.stringify(dto)
    })
}