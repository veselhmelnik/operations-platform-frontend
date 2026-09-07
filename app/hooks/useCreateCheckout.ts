import { useMutation } from "@tanstack/react-query";
import { useOrganizationParams } from "./useParams";
import { createCheckoutSession } from "../lib/api/billing";
import { apiClient } from "../lib/api/api-client";

export function useCreateCheckout() {
    const { organizationId } = useOrganizationParams()

    return useMutation({
        mutationFn: () => createCheckoutSession(apiClient, organizationId),

        onSuccess: ({ url }) => {
            window.location.href = url
        }
    })
}
