export type SubscriptionPlan = 'FREE' | 'PRO'

export type SubscriptionUsage = {
    projects: number
    members: number
}

export type SubscriptionLimits = {
    projects: number | null
    members: number | null
}

export type Subscription = {
    plan: SubscriptionPlan
    status: string
    usage: SubscriptionUsage
    limits: SubscriptionLimits
}
