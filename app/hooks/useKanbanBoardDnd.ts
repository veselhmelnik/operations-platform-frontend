import { useState } from 'react'
import {
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useQueryClient } from '@tanstack/react-query'
import {
  getDropTarget,
  moveTaskInBoard,
} from '@/app/utils/helpers/dndBoard.helper'
import { queryKeys } from '@/app/lib/queryKeys'
import { useMoveTask } from '@/app/hooks/tasks/useMoveTask'
import type { Task } from '@/app/types'
import type { Board } from '@/app/types'

interface UseKanbanBoardDndParams {
  board: Board | undefined
  tasks: Task[]
  organizationId: string
  projectId: string
}

export function useKanbanBoardDnd({
  board,
  tasks,
  organizationId,
  projectId,
}: UseKanbanBoardDndParams) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const queryClient = useQueryClient()
  const moveTaskMutation = useMoveTask()

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event

    if (!over || !board) return

    const target = getDropTarget(board, over.id as string)

    if (!target) return

    const result = moveTaskInBoard(
      board,
      active.id as string,
      target.status,
      target.position,
    )

    queryClient.setQueryData(
      queryKeys.board(organizationId, projectId),
      result.board,
    )
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over || !board) return

    const taskId = active.id as string

    const target = getDropTarget(board, over.id as string)

    if (!target) return

    const {
      board: nextBoard,
      status,
      position,
    } = moveTaskInBoard(board, taskId, target.status, target.position)

    moveTaskMutation.mutate({
      taskId,
      data: {
        status,
        position,
      },
      board: nextBoard,
    })
  }

  return {
    sensors,
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  }
}
