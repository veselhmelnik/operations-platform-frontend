import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import {
  getOrganizationMembers,
  updateOrganizationMember,
  deleteOrganizationMember,
} from '@/app/lib/api/members'
import { UpdateOrganizationMemberDto } from '@/app/lib/api/dto/update-organization-member.dto'
import { queryKeys } from '@/app/lib/queryKeys'

export function useOrganizationMembers(organizationId: string) {
  return useQuery({
    queryKey: queryKeys.members(organizationId),
    queryFn: () => getOrganizationMembers(apiClient, organizationId),
  })
}

export function useUpdateMember(organizationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { memberId: string; dto: UpdateOrganizationMemberDto }) =>
      updateOrganizationMember(apiClient, organizationId, data.memberId, data.dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.members(organizationId),
      })
    },
  })
}

export function useDeleteMember(organizationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (memberId: string) =>
      deleteOrganizationMember(apiClient, organizationId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.members(organizationId),
      })
    },
  })
}
