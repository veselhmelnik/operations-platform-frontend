'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { COLUMNS } from '@/app/utils/constants'
import TaskCard from './TaskCard'
import ColumnContainer from './ColumnContainer'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProjectBoard } from '@/app/lib/api/projects'
import { apiClient } from '@/app/lib/api/api-client'
import { useProjectParams } from '@/app/hooks/useProjectParams'
import { queryKeys } from '@/app/lib/queryKeys'
import { useMoveTask } from '@/app/hooks/tasks/useMoveTask'
import {
  getDropTarget,
  moveTaskInBoard,
} from '@/app/utils/helpers/dndBoard.helper'

export function KanbanBoard() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const queryClient = useQueryClient()
  const { organizationId, projectId } = useProjectParams()
  const moveTaskMutation = useMoveTask()

  const { data: board } = useQuery({
    queryKey: queryKeys.board(organizationId, projectId),
    queryFn: () => getProjectBoard(apiClient, organizationId, projectId),
  })

  const tasks = board ? Object.values(board).flat() : []

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {COLUMNS.map((column) => (
              <ColumnContainer
                key={column.id}
                column={column}
                tasks={tasks.filter((t) => t.status === column.id)}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={null}>
            {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
