'use client'
import { IoIosArrowForward } from 'react-icons/io'
import { useKanbanBoard } from '../hooks/UseKanbanBoard'
import { useDemoWorkspaceOptional } from '@/app/demo/demo-workspace-context'

const TaskStats = () => {
  const demoWorkspace = useDemoWorkspaceOptional()
  const prodBoard = useKanbanBoard().data

  const board = demoWorkspace ? demoWorkspace.board : prodBoard

  if (!board) {
    return null
  }
  const total = Object.values(board).flat().length

  const stats = [
    {
      id: 1,
      label: 'Total Tasks',
      count: total,
      footer: 'All tasks in project',
      dot: 'var(--primary)',
      pct: 100,
    },
    {
      id: 2,
      label: 'In Progress',
      count: board.IN_PROGRESS.length,
      footer: 'Currently active',
      dot: 'var(--primary)',
      pct: total ? Math.round((board.IN_PROGRESS.length / total) * 100) : 0,
    },
    {
      id: 3,
      label: 'In Review',
      count: board.REVIEW.length,
      footer: 'Waiting for review',
      dot: 'var(--neutral)',
      pct: total ? Math.round((board.REVIEW.length / total) * 100) : 0,
    },
    {
      id: 4,
      label: 'Completed',
      count: board.DONE.length,
      footer: 'Finished tasks',
      dot: 'var(--success)',
      pct: total ? Math.round((board.DONE.length / total) * 100) : 0,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:gap-2.5">
      {stats.map((item, i) => (
        <div
          key={item.id}
          style={{ animationDelay: `${i * 65}ms` }}
          className="group animate-col-in relative overflow-hidden rounded-xl border border-border-soft bg-card p-3"
        >
          <div className="flex items-center gap-1.75">
            <span
              className="size-1.25 shrink-0 rounded-full"
              style={{ background: item.dot }}
            />
            <h3 className="truncate text-sm font-semibold text-muted-foreground">
              {item.label}
            </h3>
          </div>

          <div className="mt-1.5 text-2xl leading-none font-bold tracking-[-0.045em] tabular-nums md:text-3xl">
            {item.count}
          </div>

          <div className="mt-2.5 h-0.5 overflow-hidden rounded-sm bg-border">
            <div
              className="animate-bar-fill h-full origin-left rounded-sm"
              style={{
                width: `${item.pct}%`,
                background: item.dot,
              }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-1 text-2xs text-faint">
            <span className="truncate">{item.footer}</span>
            <IoIosArrowForward className="shrink-0" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskStats
