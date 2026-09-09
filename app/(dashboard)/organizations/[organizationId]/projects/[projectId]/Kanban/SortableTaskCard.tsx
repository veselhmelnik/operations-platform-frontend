import { Task } from "@/app/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import TaskCard from "./TaskCard"
import { GripVertical } from "lucide-react"

export default function SortableTaskCard({
  task,
  delayMs,
}: {
  task: Task
  delayMs?: number
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: 'task', task } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskCard task={task} delayMs={delayMs}>
        {/* touch-none stops the browser claiming the gesture once TouchSensor
            has armed the drag. Larger hit area on touch, tight on desktop. */}
        <button
          {...listeners}
          className="mt-0.5 grid size-7 shrink-0 cursor-grab touch-none place-items-center rounded-sm text-faint transition-colors hover:text-muted-foreground active:cursor-grabbing md:size-4"
          aria-label="Drag task"
        >
          <GripVertical className="size-3.5" />
        </button>
      </TaskCard>
    </div>
  )
}
