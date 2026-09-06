import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjectParams } from "../useParams";
import { moveTask } from "../../lib/api/tasks";
import { apiClient } from "../../lib/api/api-client";
import { MoveTaskPayload } from "../../lib/api/dto/move-task.dto";
import { queryKeys } from "../../lib/queryKeys";
import { Board } from "@/app/types";

type MoveTaskVariables = {
    taskId: string
    data: MoveTaskPayload
    board: Board
}

export function useMoveTask() {
    const queryClient = useQueryClient()
    const { organizationId, projectId } =
        useProjectParams()

    const boardKey = queryKeys.board(
        organizationId,
        projectId,
    )

    return useMutation({
        mutationFn: ({ taskId, data }: MoveTaskVariables) =>
            moveTask(
                apiClient,
                organizationId,
                projectId,
                taskId,
                data,
            ),

        onMutate: async ({ board }) => {
            await queryClient.cancelQueries({
                queryKey: boardKey,
            })

            const previousBoard =
                queryClient.getQueryData<Board>(boardKey)

            queryClient.setQueryData(boardKey, board)

            return { previousBoard }
        },

        onError: (_error, _variables, context) => {
            if (context?.previousBoard) {
                queryClient.setQueryData(
                    boardKey,
                    context.previousBoard,
                )
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: boardKey,
            })
        },
    })
}