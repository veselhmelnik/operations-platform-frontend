import { Task } from "@/app/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import TaskCard from "./TaskCard"
import { GripVertical } from "lucide-react"

export default function SortableTaskCard({
  task,
  onDelete,
}: {
  task: Task
  onDelete: (id: string) => void
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
      <TaskCard task={task} onDelete={onDelete}>
        <button
          {...listeners}
          className="mt-0.5 cursor-grab text-muted-foreground active:cursor-grabbing"
          aria-label="Drag task"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </TaskCard>
    </div>
  )
}
