'use client'

import {
  DndContext,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core'
import { COLUMNS } from '@/app/utils/constants'
import TaskCard from './TaskCard'
import ColumnContainer from './ColumnContainer'
import { useQuery } from '@tanstack/react-query'
import { getProjectBoard } from '@/app/lib/api/projects'
import { apiClient } from '@/app/lib/api/api-client'
import { useProjectParams } from '@/app/hooks/useParams'
import { queryKeys } from '@/app/lib/queryKeys'
import { useKanbanBoardDnd } from '../../../../../../hooks/useKanbanBoardDnd'

export function KanbanBoard() {
  const { organizationId, projectId } = useProjectParams()

  const { data: board } = useQuery({
    queryKey: queryKeys.board(organizationId, projectId),
    queryFn: () => getProjectBoard(apiClient, organizationId, projectId),
  })

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
