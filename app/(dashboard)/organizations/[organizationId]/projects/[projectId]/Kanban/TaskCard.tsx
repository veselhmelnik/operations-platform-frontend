import UpdateTaskModal from '@/app/components/Modals/UpdateTaskModal'
import { useDeleteTask } from '@/app/hooks/tasks/useDeleteTask'
import { Task } from '@/app/types'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function TaskCard({
  task,
  children,
  isOverlay,
}: {
  task: Task
  children?: React.ReactNode
  isOverlay?: boolean
}) {
  const deleteTaskMutation = useDeleteTask()
  const [openUpdateModal, setOpenUpdateModal] = useState(false)

  return (
    <div
      className={`cursor-pointer group relative rounded-lg border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md ${
        isOverlay ? 'rotate-2 scale-105 shadow-xl' : ''
      }`}
    >
      <div
        className="flex items-start gap-2"
        onClick={() => setOpenUpdateModal(true)}
      >
        {children}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-card-foreground">
              {task.title}
            </h3>
            <button
              onClick={() => deleteTaskMutation.mutate(task.id)}
              className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
              aria-label="Delete task"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {task.description}
            </p>
          )}
          <div className="mt-3"></div>
        </div>
      </div>
      {openUpdateModal ? (
        <UpdateTaskModal setIsAdding={setOpenUpdateModal} task={task} />
      ) : (
        ''
      )}
    </div>
  )
}
