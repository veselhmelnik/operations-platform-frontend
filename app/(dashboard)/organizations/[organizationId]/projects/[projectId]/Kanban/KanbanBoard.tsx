'use client'

import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { COLUMNS } from '@/app/utils/constants'
import TaskCard from './TaskCard'
import ColumnContainer from './ColumnContainer'
import { useProjectParams } from '@/app/hooks/useParams'
import { useKanbanBoardDnd } from '@/app/hooks/useKanbanBoardDnd'
import { useKanbanBoard } from '@/app/hooks/UseKanbanBoard'

export function KanbanBoard() {
  const { organizationId, projectId } = useProjectParams()

  const { data: board } = useKanbanBoard()
  const tasks = board ? Object.values(board).flat() : []

  const {
    sensors,
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanbanBoardDnd({
    board,
    tasks,
    organizationId,
    projectId,
  })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid auto-cols-[minmax(236px,1fr)] grid-flow-col items-start gap-2.5 overflow-x-auto pb-1.5">
        {COLUMNS.map((column, i) => (
          <ColumnContainer
            key={column.id}
            column={column}
            index={i}
            tasks={tasks.filter((t) => t.status === column.id)}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
