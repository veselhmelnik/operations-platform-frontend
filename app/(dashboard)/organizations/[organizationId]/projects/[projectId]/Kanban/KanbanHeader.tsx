'use client'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddTaskModal from '../../../../../../components/Modals/AddTaskModal'
import { useProjectParams } from '@/app/hooks/useParams'
import { useCurrentMember } from '@/app/hooks/useCurrentMember'
import { canManageWorkspace } from '@/app/utils/helpers/role.helper'

const KanbanHeader = () => {
  const { organizationId } = useProjectParams()
  const currentMember = useCurrentMember(organizationId)
  const canAddTask = canManageWorkspace(currentMember?.role)
  const [isAddingTask, setIsAddingTask] = useState(false)

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {canAddTask && (
            <button
              onClick={() => setIsAddingTask(true)}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Add task
            </button>
          )}
        </div>
      </div>
      {isAddingTask && <AddTaskModal setIsAdding={setIsAddingTask} />}
    </div>
  )
}

export default KanbanHeader
