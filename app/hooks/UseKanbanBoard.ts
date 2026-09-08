import {  useQuery } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/api-client'
import { getProjectBoard } from '../lib/api/projects'
import { useProjectParams } from './useParams'
import { queryKeys } from '../lib/queryKeys'

export function useKanbanBoard() {
    const {organizationId, projectId} = useProjectParams()
    return useQuery({
        queryKey: queryKeys.board(organizationId, projectId),
        queryFn: () => getProjectBoard(apiClient, organizationId, projectId),
        retry: false,
    })
}

