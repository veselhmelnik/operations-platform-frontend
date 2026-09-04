export const apiRoutes = {
    auth: {
        login: () => '/auth/login',
        logout: () => '/auth/logout',
        me: () => '/auth/me'
    },
    organizations: {
        root: () => '/organizations',
        byId: (organizationId: string) =>
            `/organizations/${organizationId}`,

        projects: {
            root: (organizationId: string) =>
                `/organizations/${organizationId}/projects`,

            byId: (organizationId: string, projectId: string) =>
                `/organizations/${organizationId}/projects/${projectId}`,

            board: (organizationId: string, projectId: string) =>
                `/organizations/${organizationId}/projects/${projectId}/board`,

            tasks: {
                root: (organizationId: string, projectId: string) =>
                    `/organizations/${organizationId}/projects/${projectId}/tasks`,

                byId: (
                    organizationId: string,
                    projectId: string,
                    taskId: string,
                ) =>
                    `/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}`,

                move: (
                    organizationId: string,
                    projectId: string,
                    taskId: string,
                ) =>
                    `/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}/move`,
            },
        },
    },
}