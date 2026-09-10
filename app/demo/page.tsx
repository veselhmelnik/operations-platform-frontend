'use client'

import TaskStats from '@/app/components/TaskStats'
import KanbanHeader from '@/app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/KanbanHeader'
import { KanbanBoard } from '@/app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/KanbanBoard'
import { useDemoWorkspace } from './demo-workspace-context'

export default function DemoPage() {
  const { organization, currentProject, board } = useDemoWorkspace()

  return (
    <div className="flex flex-col gap-3.5">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold tracking-[-0.03em]">
          {organization.name} / {currentProject.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Try dragging tasks between columns, editing properties, or creating new tasks.
        </p>
      </div>

      <TaskStats />
      <KanbanHeader />
      <KanbanBoard
        board={board}
        organizationId={organization.id}
        projectId={currentProject.id}
        demoMode={true}
      />
    </div>
  )
}