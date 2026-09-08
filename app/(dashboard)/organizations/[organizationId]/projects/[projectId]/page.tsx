
import KanbanHeader from '@/app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/KanbanHeader'
import { KanbanBoard } from '@/app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/KanbanBoard'
import TaskStats from '@/app/components/TaskStats'

export default function ProjectPage() {
  return (
    <div className="flex flex-col gap-3.5">
      <TaskStats />
      <KanbanHeader />
      <KanbanBoard />
    </div>
  )
}
