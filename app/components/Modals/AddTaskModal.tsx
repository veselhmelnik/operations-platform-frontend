'use client'
import { apiClient } from '@/app/lib/api/api-client'
import { CreateTaskPayload } from '@/app/lib/api/dto/create-task.dto'
import { createTask } from '@/app/lib/api/tasks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

type AddTaskModalProps = {
  setIsAdding: (v: boolean) => void
}

const AddTaskModal = ({ setIsAdding }: AddTaskModalProps) => {
  const [newTask, setNewTask] = useState<CreateTaskPayload>({
    title: '',
    description: '',
  })
  const queryClient = useQueryClient()
  const params = useParams<{
    organizationId: string
    projectId: string
  }>()
  const { organizationId, projectId } = params

  const createTaskMutation = useMutation({
    mutationFn: (task: CreateTaskPayload) => createTask(apiClient, organizationId, projectId, task),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', organizationId, projectId] })
      setIsAdding(false)
    },
  })

  function addTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!newTask.title.trim()) return

    createTaskMutation.mutate(newTask)
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
          <div className="grid grid-cols-2 gap-4"></div>
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
              disabled={createTaskMutation.isPending}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {createTaskMutation.isPending ? 'Creating...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal
