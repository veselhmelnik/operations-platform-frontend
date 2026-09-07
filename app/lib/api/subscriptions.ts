import { Subscription } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { apiRoutes } from "./api-routes";

export function getSubscription(api: ApiFetcher, organizationId: string) {
    return api<Subscription>(apiRoutes.organizations.subscription(organizationId))
}
