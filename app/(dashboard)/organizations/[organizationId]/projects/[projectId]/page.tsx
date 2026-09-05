import TaskStats from '@/app/components/TaskStats'
import KanbanHeader from '@/app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/KanbanHeader'
import { KanbanBoard } from '@/app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/KanbanBoard'

export default function ProjectPage() {
  return (
    <div className="py-6 px-12 flex flex-col gap-5">
      <div className="flex items-center justify-between"></div>

      <TaskStats />
      <KanbanHeader />
      <KanbanBoard />
    </div>
  )
}
