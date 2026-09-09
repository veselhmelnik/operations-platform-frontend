'use client'

import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { useEffect, useRef, useState } from 'react'
import { COLUMNS } from '@/app/utils/constants'
import TaskCard from './TaskCard'
import ColumnContainer from './ColumnContainer'
import { useProjectParams } from '@/app/hooks/useParams'
import { useKanbanBoardDnd } from '@/app/hooks/useKanbanBoardDnd'
import { useKanbanBoard } from '@/app/hooks/UseKanbanBoard'

export function KanbanBoard() {
  const { organizationId, projectId } = useProjectParams()

  const { data: board } = useKanbanBoard()
  const tasks = board ? Object.values(board).flat() : []

  const {
    sensors,
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanbanBoardDnd({
    board,
    tasks,
    organizationId,
    projectId,
  })

  const stripRef = useRef<HTMLDivElement>(null)
  const [activeColumn, setActiveColumn] = useState(0)

  const tasksByColumn = COLUMNS.map((column) =>
    tasks.filter((task) => task.status === column.id),
  )

  /* Track which column is centred so the switcher can show where you are.
     All columns are equal width, so position divides out cleanly. */
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const onScroll = () => {
      const step = strip.scrollWidth / COLUMNS.length
      setActiveColumn(
        Math.min(COLUMNS.length - 1, Math.round(strip.scrollLeft / step)),
      )
    }

    strip.addEventListener('scroll', onScroll, { passive: true })
    return () => strip.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToColumn = (index: number) => {
    const strip = stripRef.current
    const column = strip?.children[index] as HTMLElement | undefined
    if (!strip || !column) return

    strip.scrollTo({
      left:
        column.getBoundingClientRect().left -
        strip.getBoundingClientRect().left +
        strip.scrollLeft,
      behavior: 'smooth',
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* Secondary navigation — swipe still works, this just jumps.
          Two rows rather than one scrolling row: the scrollbar is hidden on
          mobile, so an overflowing row silently clipped the last column. */}
      <div className="mb-2.5 grid grid-cols-2 gap-1.5 md:hidden">
        {COLUMNS.map((column, i) => (
          <button
            key={column.id}
            type="button"
            onClick={() => scrollToColumn(i)}
            className={`flex cursor-pointer items-center justify-between gap-1.5 rounded-full border px-2.5 py-1.5 text-2xs font-semibold transition-colors ${
              activeColumn === i
                ? 'border-primary-line bg-primary-soft text-primary'
                : 'border-border bg-muted text-muted-foreground'
            }`}
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: column.dot }}
              />
              <span className="truncate">{column.title}</span>
            </span>
            <span className="shrink-0 tabular-nums opacity-70">
              {tasksByColumn[i].length}
            </span>
          </button>
        ))}
      </div>

      {/* Snap is dropped while a card is in hand: mandatory snapping fights
          dnd-kit's edge auto-scroll and yanks the strip back mid-drag. */}
      <div
        ref={stripRef}
        className={`grid auto-cols-[85vw] grid-flow-col items-start gap-2.5 overflow-x-auto pb-1.5 max-md:no-scrollbar md:auto-cols-[minmax(236px,1fr)] ${
          activeTask ? '' : 'max-md:snap-x max-md:snap-mandatory'
        }`}
      >
        {COLUMNS.map((column, i) => (
          <ColumnContainer
            key={column.id}
            column={column}
            index={i}
            tasks={tasksByColumn[i]}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
