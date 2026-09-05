import { Board } from "@/app/types"
import { TaskStatus } from "@/app/types/enums"
import { COLUMNS } from "../constants"

type MoveResult = {
    board: Board
    status: TaskStatus
    position: number
}

export function moveTaskInBoard(board: Board, taskId: string, targetStatus: TaskStatus, targetPosition: number): MoveResult {
    const nextBoard: Board = {
        TODO: [...board.TODO],
        IN_PROGRESS: [...board.IN_PROGRESS],
        REVIEW: [...board.REVIEW],
        DONE: [...board.DONE]
    }

    let sourceStatus: TaskStatus | undefined
    let sourceIndex = -1

    for (const status of COLUMNS.map((column) => column.id)) {
        const index = nextBoard[status].findIndex(
            (task) => task.id === taskId
        )

        if (index !== -1) {
            sourceStatus = status
            sourceIndex = index
            break
        }
    }

    if (!sourceStatus || sourceIndex === -1) {
        return {
            board, status: targetStatus, position: targetPosition
        }
    }

    const [task] = nextBoard[sourceStatus].splice(sourceIndex, 1)

    const movedTask = {
        ...task,
        status: targetStatus,
        position: targetPosition
    }

    nextBoard[targetStatus].splice(
        targetPosition,
        0,
        movedTask
    )

    nextBoard[sourceStatus] = nextBoard[sourceStatus].map(
        (task, index) => ({
            ...task,
            position: index
        })
    )

    if (sourceStatus !== targetStatus) {
        nextBoard[targetStatus] = nextBoard[targetStatus].map(
            (task, index) => ({
                ...task,
                position: index
            })
        )
    }

    return {
        board: nextBoard,
        status: targetStatus,
        position: targetPosition
    }
}

export function getDropTarget(
    board: Board,
    overId: string,
): {
    status: TaskStatus
    position: number
} | null {
    const column = COLUMNS.find(
        (column) => column.id === overId,
    )

    if (column) {
        return {
            status: column.id,
            position: board[column.id].length,
        }
    }

    for (const column of COLUMNS) {
        const position = board[column.id].findIndex(
            (task) => task.id === overId,
        )

        if (position !== -1) {
            return {
                status: column.id,
                position,
            }
        }
    }

    return null
}