import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useProjectParams } from "../useProjectParams"
import { UpdateTaskPayload } from "@/app/lib/api/dto/update-task.dto"
import { queryKeys } from "@/app/lib/queryKeys"
import { updateTask } from "@/app/lib/api/tasks"
import { apiClient } from "@/app/lib/api/api-client"

export function useUpdateTask() {
  const queryClient = useQueryClient()
  const { organizationId, projectId } = useProjectParams()

  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string
      data: UpdateTaskPayload
    }) =>
      updateTask(
        apiClient,
        organizationId,
        projectId,
        taskId,
        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.board(organizationId, projectId),
      })
    },
  })
}