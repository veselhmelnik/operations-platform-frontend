import { useMutation } from "@tanstack/react-query";
import { useOrganizationParams } from "./useParams";
import { createCustomerPortalSession } from "../lib/api/billing";
import { apiClient } from "../lib/api/api-client";

export function useCreateCustomerPortal() {
    const { organizationId } = useOrganizationParams()

    return useMutation({
        mutationFn: () => createCustomerPortalSession(apiClient, organizationId),

        onSuccess: ({ url }) => {
            window.location.href = url
        }
    })
}