export const routes = {
    login: () => '/login',

    dashboard: () => '/',

    organization: (organizationId: string) =>
        `/organizations/${organizationId}`,

    project: (organizationId: string, projectId: string) =>
        `/organizations/${organizationId}/projects/${projectId}`,

    task: (organizationId: string, projectId: string, taskId: string) =>
        `/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}`,
}