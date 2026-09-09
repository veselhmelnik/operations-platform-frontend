import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableTaskCard from "./SortableTaskCard"
import { Task } from "@/app/types"
import { Column } from "@/app/utils/constants"
import { useDroppable } from "@dnd-kit/core"
import { Plus } from "lucide-react"

export default function ColumnContainer({
  column,
  tasks,
  index = 0,
}: {
  column: Column
  tasks: Task[]
  index?: number
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column', column },
  })

  return (
    <div
      ref={setNodeRef}
      style={{ animationDelay: `${120 + index * 70}ms` }}
      className={`animate-col-in flex snap-start flex-col rounded-xl border p-2.5 transition-colors ${
        isOver
          ? 'border-primary/50 bg-primary/5'
          : 'border-border-soft bg-card'
      }`}
    >
      <div className="mb-2.5 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.75">
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ background: column.dot }}
          />
          <h2 className="text-2xs font-bold tracking-widest uppercase text-muted-foreground">
            {column.title}
          </h2>
        </div>
        <span className="min-w-4.75 rounded-full border border-border bg-elevated px-1.5 py-0.5 text-center text-2xs font-semibold text-muted-foreground tabular-nums">
          {tasks.length}
        </span>
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex min-h-23 flex-col gap-1.75">
          {tasks.map((task, taskIndex) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              delayMs={180 + index * 60 + taskIndex * 34}
            />
          ))}

          {tasks.length === 0 && (
            <div className="animate-fade-in flex min-h-23 flex-col items-center justify-center gap-1.75 rounded-[10px] border border-dashed border-border bg-muted/40">
              <div className="animate-float-y grid size-6.5 place-items-center rounded-md border border-dashed border-border text-faint">
                <Plus className="size-3" />
              </div>
              <span className="text-2xs text-faint">Nothing here yet</span>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
