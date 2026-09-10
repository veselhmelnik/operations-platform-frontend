'use client'

import { useProjectParams } from '@/app/hooks/useParams'
import { useKanbanBoard } from '@/app/hooks/UseKanbanBoard'
import { KanbanBoard } from './KanbanBoard'

export function ProjectKanbanBoard() {
  const { organizationId, projectId } = useProjectParams()
  const { data: board } = useKanbanBoard()

  if (!board) return null

  return (
    <KanbanBoard
      board={board}
      organizationId={organizationId}
      projectId={projectId}
    />
  )
}