'use client'

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
import {
  getDropTarget,
  moveTaskInBoard,
} from '@/app/utils/helpers/dndBoard.helper'
import { useDemoWorkspace } from './demo-workspace-context'
import type { Task, Board } from '@/app/types'

interface UseDemoKanbanBoardDndParams {
  board: Board | undefined
  tasks: Task[]
}

export function useDemoKanbanBoardDnd({
  board,
  tasks,
}: UseDemoKanbanBoardDndParams) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const { moveTask } = useDemoWorkspace()

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

    // Calculate preview in memory but don't persist yet
    moveTaskInBoard(board, active.id as string, target.status, target.position)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over || !board) return

    const taskId = active.id as string

    const target = getDropTarget(board, over.id as string)

    if (!target) return

    const { status, position } = moveTaskInBoard(
      board,
      taskId,
      target.status,
      target.position,
    )

    // Call demo workspace mutation to persist the move
    moveTask(taskId, target.status, position)
  }

  return {
    sensors,
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  }
}
