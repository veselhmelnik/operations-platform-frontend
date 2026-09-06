import { useParams } from "next/navigation";

export function useProjectParams() {
    return useParams<{ organizationId: string, projectId: string }>()
}

export function useOrganizationParams() {
    return useParams<{
        organizationId: string
    }>()
}