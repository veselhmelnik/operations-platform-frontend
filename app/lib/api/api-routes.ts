export const apiRoutes = {
    auth: {
        login: () => '/auth/login',
        logout: () => '/auth/logout',
        me: () => '/auth/me'
    },
    invitations: {
        root: (organizationId: string) =>
            `/invitations/${organizationId}`,
        byToken: (token: string) => `/invitations/${token}`,
        accept: (token: string) => `/invitations/${token}/accept`,
    },
    billing: {
        checkout: (organizationId: string) => `/organizations/${organizationId}/billing/checkout`,
        portal: (organizationId: string) => `/organizations/${organizationId}/billing/portal`,
    },
    organizations: {
        root: () => '/organizations',
        byId: (organizationId: string) =>
            `/organizations/${organizationId}`,
        members: {
            root: (organizationId: string) => `/organizations/${organizationId}/members`,
            byId: (organizationId: string, memberId: string) =>
                `/organizations/${organizationId}/members/${memberId}`,
        },

        activity: {
            root: (organizationId: string) =>
                `/organizations/${organizationId}/activity`,
            deleteAll: (organizationId: string) =>
                `/organizations/${organizationId}/activity/delete`,
        },

        subscription: (organizationId: string) =>
            `/organizations/${organizationId}/subscription`,

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