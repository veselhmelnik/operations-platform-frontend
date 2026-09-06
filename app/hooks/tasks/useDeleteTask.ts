import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useProjectParams } from "../useParams"
import { deleteTask } from "../../lib/api/tasks"
import { apiClient } from "../../lib/api/api-client"
import { queryKeys } from "../../lib/queryKeys"

export function useDeleteTask() {
  const queryClient = useQueryClient()

  const { organizationId, projectId } = useProjectParams()

  return useMutation({
    mutationFn: (taskId: string) =>
      deleteTask(
        apiClient,
        organizationId,
        projectId,
        taskId,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.board(
          organizationId,
          projectId,
        ),
      })
    },
  })
}