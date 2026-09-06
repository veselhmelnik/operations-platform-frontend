import { OrganizationMember } from "@/app/types";
import { ApiFetcher } from "./api-client";
import { apiRoutes } from "./api-routes";
import { UpdateOrganizationMemberDto } from "./dto/update-organization-member.dto";

export function getOrganizationMembers(api: ApiFetcher, organizationId: string) {
    return api<OrganizationMember[]>(apiRoutes.organizations.members.root(organizationId))
}

export function updateOrganizationMember(
    api: ApiFetcher,
    organizationId: string,
    memberId: string,
    dto: UpdateOrganizationMemberDto
) {
    return api<OrganizationMember>(
        apiRoutes.organizations.members.byId(organizationId, memberId),
        {
            method: 'PATCH',
            body: JSON.stringify(dto)
        }
    )
}

export function deleteOrganizationMember(
    api: ApiFetcher,
    organizationId: string,
    memberId: string
) {
    return api<{ message: string }>(
        apiRoutes.organizations.members.byId(organizationId, memberId),
        {
            method: 'DELETE'
        }
    )
}