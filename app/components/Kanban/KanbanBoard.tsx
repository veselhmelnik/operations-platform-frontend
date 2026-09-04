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
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { TaskStatus } from '@/app/types/enums'
import { Board, Task } from '@/app/types'
import { COLUMNS } from '@/app/utils/constants'
import TaskCard from './TaskCard'
import ColumnContainer from './ColumnContainer'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProjectBoard } from '@/app/lib/api/projects'
import { apiClient } from '@/app/lib/api/api-client'
import { useProjectParams } from '@/app/hooks/useProjectParams'
import { queryKeys } from '@/app/lib/queryKeys'

export function KanbanBoard() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const queryClient = useQueryClient()
  const { organizationId, projectId } = useProjectParams()
  type TasksUpdater = Task[] | ((prev: Task[]) => Task[])
  const { data: board } = useQuery({
    queryKey: queryKeys.board(organizationId, projectId),
    queryFn: () => getProjectBoard(apiClient, organizationId, projectId),
  })

  function updateTasks(updater: TasksUpdater) {
    queryClient.setQueryData<Board>(
      ['board', organizationId, projectId],
      (oldBoard) => {
        if (!oldBoard) return oldBoard

        const currentTasks = Object.values(oldBoard).flat()

        const nextTasks =
          typeof updater === 'function' ? updater(currentTasks) : updater

        const nextBoard: Board = {
          TODO: [],
          IN_PROGRESS: [],
          REVIEW: [],
          DONE: [],
        }

        for (const task of nextTasks) {
          nextBoard[task.status].push(task)
        }
        return nextBoard
      },
    )
  }

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
    if (!over) return

    const activeTaskId = active.id as string
    const overId = over.id as string

    const activeColumnId = tasks.find((t) => t.id === activeTaskId)?.status
    const overColumnId = COLUMNS.some((c) => c.id === overId)
      ? (overId as TaskStatus)
      : tasks.find((t) => t.id === overId)?.status

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId)
      return

    updateTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskId ? { ...t, status: overColumnId } : t,
      ),
    )
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeTaskId = active.id as string
    const overId = over.id as string

    const activeIndex = tasks.findIndex((t) => t.id === activeTaskId)
    const overColumnId = COLUMNS.some((c) => c.id === overId)
      ? (overId as TaskStatus)
      : tasks.find((t) => t.id === overId)?.status

    if (!overColumnId) return

    if (COLUMNS.some((c) => c.id === overId)) {
      updateTasks((prev) =>
        prev.map((t) =>
          t.id === activeTaskId ? { ...t, status: overColumnId } : t,
        ),
      )
      return
    }

    const overIndex = tasks.findIndex((t) => t.id === overId)
    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
      return

    const activeTaskItem = tasks[activeIndex]!
    const overTaskItem = tasks[overIndex]!

    if (activeTaskItem.status !== overTaskItem.status) {
      const moved: Task = { ...activeTaskItem, status: overTaskItem.status }
      const next = [...tasks]
      next.splice(activeIndex, 1)
      next.splice(overIndex, 0, moved)
      updateTasks(next)
      return
    }

    updateTasks((prev) => arrayMove(prev, activeIndex, overIndex))
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
