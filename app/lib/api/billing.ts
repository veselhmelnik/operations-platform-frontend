import { ApiFetcher } from "./api-client"
import { apiRoutes } from "./api-routes"

type CheckoutResponse = {
    url: string
}

export function createCheckoutSession(api: ApiFetcher, organizationId: string) {
    return api<CheckoutResponse>(apiRoutes.billing.checkout(organizationId), {
        method: 'POST'
    })
}

export function createCustomerPortalSession(api: ApiFetcher, organizationId: string) {
    return api<CheckoutResponse>(apiRoutes.billing.portal(organizationId), {
        method: 'POST'
    })
}