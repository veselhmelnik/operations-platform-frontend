import UpdateTaskModal from '@/app/components/Modals/UpdateTaskModal'
import { useDeleteTask } from '@/app/hooks/tasks/useDeleteTask'
import { Task } from '@/app/types'
import { getPriority, labelChipStyle } from '@/app/utils/helpers/task.helper'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function TaskCard({
  task,
  children,
  isOverlay,
  delayMs,
}: {
  task: Task
  children?: React.ReactNode
  isOverlay?: boolean
  delayMs?: number
}) {
  const deleteTaskMutation = useDeleteTask()
  const [openUpdateModal, setOpenUpdateModal] = useState(false)

  const entrance = isOverlay ? '' : 'animate-card-in'
  const priority = getPriority(task.priority)
  const labels = (task.labels ?? []).map(({ label }) => label)

  return (
    <div
      style={isOverlay || delayMs === undefined ? undefined : { animationDelay: `${delayMs}ms` }}
      className={`group relative cursor-pointer rounded-[10px] border px-2.5 py-2.25 transition-[border-color,background-color,box-shadow] ${entrance} ${
        isOverlay
          ? 'border-primary-line bg-elevated shadow-[0_26px_50px_-18px_rgba(0,0,0,0.95)]'
          : 'border-border bg-muted hover:border-primary-line hover:bg-elevated hover:shadow-[0_8px_20px_-12px_rgba(0,0,0,0.9)]'
      }`}
    >
      <div
        className="flex items-start gap-2"
        onClick={() => setOpenUpdateModal(true)}
      >
        {children}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm leading-[1.35] font-medium tracking-[-0.012em] text-foreground text-pretty">
              {task.title}
            </h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (!confirm('Delete this task?')) return
                deleteTaskMutation.mutate(task.id)
              }}
              className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm text-faint opacity-35 transition-[opacity,background-color,color] hover:bg-destructive/15 hover:text-destructive hover:opacity-100"
              aria-label="Delete task"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-[1.45] text-muted-foreground">
              {task.description}
            </p>
          )}

          <div className="mt-2.5 flex items-end justify-between gap-2">
            {labels.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 min-w-0">
                {labels.map((label) => (
                  <span
                    key={label.id}
                    className="shrink-0 rounded-full border px-1.5 py-0.5 text-3xs font-medium text-foreground"
                    style={labelChipStyle(label.color)}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            )}

            <span
              className="shrink-0 flex items-center gap-1 rounded-full px-2 py-1 text-3xs font-semibold tracking-[0.06em] text-white uppercase"
              style={{ background: priority.color }}
            >
              <span className="size-1.25 rounded-full" style={{ background: 'rgba(255,255,255,.6)' }} />
              {priority.title}
            </span>
          </div>
        </div>
      </div>

      {openUpdateModal && (
        <UpdateTaskModal setIsAdding={setOpenUpdateModal} task={task} />
      )}
    </div>
  )
}
