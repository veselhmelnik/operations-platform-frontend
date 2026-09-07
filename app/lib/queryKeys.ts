
export const queryKeys = {
    organizations: ['organizations'] as const,

    projects: (organizationId: string) => ['projects', organizationId] as const,

    board: (organizationId: string, projectId: string) => ['board', organizationId, projectId] as const,

    organizationMembers: (organizationId: string) => ['members', organizationId],

    members: (organizationId: string) => ['members', organizationId],

    activities: (organizationId: string) => ['activities', organizationId] as const,

    subscription: (organizationId: string) => ['subscription', organizationId] as const,
}