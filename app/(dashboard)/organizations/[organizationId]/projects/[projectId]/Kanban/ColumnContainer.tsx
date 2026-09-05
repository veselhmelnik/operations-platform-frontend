import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableTaskCard from "./SortableTaskCard"
import { Task } from "@/app/types"
import { Column } from "@/app/utils/constants"
import { useDroppable } from "@dnd-kit/core"

export default function ColumnContainer({
  column,
  tasks,
}: {
  column: Column
  tasks: Task[]
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column', column },
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl border p-4 transition-colors ${
        isOver ? 'border-primary/50 bg-primary/5' : 'border-border bg-muted/40'
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {column.title}
        </h2>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {tasks.length}
        </span>
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex min-h-30 flex-col gap-3">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
