export type ActivityMetadata = {
    name?: string
    title?: string
    memberName?: string
    email?: string
    role?: string
    oldRole?: string
    newRole?: string
    fromStatus?: string
    toStatus?: string
}

export type Activity = {
    id: string

    organizationId: string

    userId: string | null
    user: {
        id: string
        name: string
        email: string
    } | null

    action: string
    entityType: string
    entityId: string | null
    metadata: ActivityMetadata | null

    createdAt: string
}
