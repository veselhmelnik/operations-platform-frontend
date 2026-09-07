import { Activity } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { apiRoutes } from "./api-routes";

export function getActivities(api: ApiFetcher, organizationId: string) {
    return api<Activity[]>(apiRoutes.organizations.activity.root(organizationId))
}

export function deleteAllActivities(api: ApiFetcher, organizationId: string) {
    return api<{ message: string }>(
        apiRoutes.organizations.activity.deleteAll(organizationId),
        {
            method: 'DELETE',
        },
    )
}
