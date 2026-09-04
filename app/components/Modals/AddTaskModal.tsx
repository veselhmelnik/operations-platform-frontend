'use client'
import { TaskStatus } from '@/app/types/enums'
import { Statuses } from '@/app/utils/constants'
import { X } from 'lucide-react'
import React, { useState } from 'react'

const COLUMNS: Column[] = [
  { id: Statuses.TODO, title: 'To Do' },
  { id: Statuses.IN_PROGRESS, title: 'In Progress' },
  { id: Statuses.REVIEW, title: 'Preview' },
  { id: Statuses.DONE, title: 'Done' },
]

interface Column {
  id: TaskStatus
  title: string
}
type AddTaskModalProps = {
  setIsAdding: (v: boolean) => void
}

const AddTaskModal = ({ setIsAdding }: AddTaskModalProps) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'TODO' as TaskStatus,
  })
  function addTask(e: React.FormEvent) {
    e.preventDefault()
    setIsAdding(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            New task
          </h2>
          <button
            onClick={() => setIsAdding(false)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={addTask} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-card-foreground">
              Title
            </label>
            <input
              autoFocus
              value={newTask.title}
              onChange={(e) =>
                setNewTask((s) => ({ ...s, title: e.target.value }))
              }
              placeholder="Task title"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-card-foreground">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask((s) => ({ ...s, description: e.target.value }))
              }
              placeholder="Short description"
              rows={3}
              className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-card-foreground">
                Column
              </label>
              <select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask((s) => ({
                    ...s,
                    status: e.target.value as TaskStatus,
                  }))
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal
