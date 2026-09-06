export const routes = {
    login: (next?: string) => next ? `/login?next=${encodeURIComponent(next)}` : '/login',
    invite: (token: string) => `/invite/${token}`,

    dashboard: () => '/',

    organization: (organizationId: string) =>
        `/organizations/${organizationId}`,
    
    members: (organizationId: string) => `/organizations/${organizationId}/members`,

    project: (organizationId: string, projectId: string) =>
        `/organizations/${organizationId}/projects/${projectId}`,

    task: (organizationId: string, projectId: string, taskId: string) =>
        `/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}`,
}