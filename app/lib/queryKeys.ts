
export const queryKeys = {
    organizations: ['organizations'] as const,

    projects: (organizationId: string) => ['projects', organizationId] as const,

    board: (organizationId: string, projectId: string) => ['board', organizationId, projectId] as const
}