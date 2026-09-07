export type SubscriptionPlan = 'FREE' | 'PRO'

export type Subscription = {
    id: string
    organizationId: string
    plan: SubscriptionPlan
    createdAt: string
    updatedAt: string
}
