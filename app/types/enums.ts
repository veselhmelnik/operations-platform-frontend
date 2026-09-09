export type OrganizationRole =
    | 'OWNER'
    | 'ADMIN'
    | 'MANAGER'
    | 'MEMBER'
    | 'VIEWER'

export type TaskStatus =
    | 'TODO'
    | 'IN_PROGRESS'
    | 'REVIEW'
    | 'DONE'

export type TaskPriority = 
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'URGENT'