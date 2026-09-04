'use client'

import { useQuery } from '@tanstack/react-query'
import { getProjectBoard } from '@/app/lib/api/projects'
import TaskStats from '@/app/components/TaskStats'
import KanbanHeader from '@/app/components/Kanban/KanbanHeader'
import { KanbanBoard } from '@/app/components/Kanban/KanbanBoard'
import { useParams } from 'next/navigation'
import { apiClient } from '@/app/lib/api/api-client'

export default function ProjectPage() {
  const params = useParams()
  const organizationId = params.organizationId as string
  const projectId = params.projectId as string

  const { data: board } = useQuery({
    queryKey: ['board', organizationId, projectId],
    queryFn: () => getProjectBoard(apiClient, organizationId, projectId),
  })

  return (
    <div className="py-6 px-12 flex flex-col gap-5">
      <div className="flex items-center justify-between"></div>

      <TaskStats />
      <KanbanHeader organizationId={organizationId} projectId={projectId} />
      <KanbanBoard
        board={board}
        organizationId={organizationId}
        projectId={projectId}
      />
    </div>
  )
}
