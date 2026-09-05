import { OrganizationMember } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { apiRoutes } from "./api-routes";

export function getOrganizationMembers(api: ApiFetcher, organizationId: string) {
    return api<OrganizationMember[]>(apiRoutes.organizations.members.root(organizationId))
}