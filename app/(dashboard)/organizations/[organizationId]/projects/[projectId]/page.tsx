
import KanbanHeader from '@/app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/KanbanHeader'
import TaskStats from '@/app/components/TaskStats'
import { ProjectKanbanBoard } from './Kanban/ProjectKanbanBoard'

export default function ProjectPage() {
  return (
    <div className="flex flex-col gap-3.5">
      <TaskStats />
      <KanbanHeader />
      <ProjectKanbanBoard />
    </div>
  )
}
