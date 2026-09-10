'use client'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddTaskModal from '../../../../../../components/Modals/AddTaskModal'
import { useProjectParams } from '@/app/hooks/useParams'
import { useCurrentMember } from '@/app/hooks/useCurrentMember'
import { canManageWorkspace } from '@/app/utils/helpers/role.helper'
import { btnPrimary } from '@/app/utils/tailwind-constants'
import { useDemoWorkspaceOptional } from '@/app/demo/demo-workspace-context'

const KanbanHeader = () => {
  const demoWorkspace = useDemoWorkspaceOptional()
  const prodParams = useProjectParams()
  const organizationId = demoWorkspace ? demoWorkspace.organization.id : prodParams.organizationId
  const currentMember = useCurrentMember(organizationId)
  const canAddTask = demoWorkspace ? true : canManageWorkspace(currentMember?.role)
  const [isAddingTask, setIsAddingTask] = useState(false)

  return (
    <div className="animate-fade-up flex items-center gap-2 [animation-delay:240ms]">
      {canAddTask && (
        <button onClick={() => setIsAddingTask(true)} className={btnPrimary}>
          <Plus className="size-3.5" />
          Add task
        </button>
      )}

      <div className="flex-1" />

      {/* Mouse-specific wording, and there is no room for it on a phone */}
      <div className="hidden items-center gap-1.5 text-2xs text-faint sm:flex">
        <span className="animate-breathe size-1 rounded-full bg-primary" />
        Drag a card between columns
      </div>

      {isAddingTask && <AddTaskModal setIsAdding={setIsAddingTask} />}
    </div>
  )
}

export default KanbanHeader
