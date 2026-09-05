'use client'
import { useUpdateTask } from '@/app/hooks/tasks/useUpdateTask'
import { useProjectParams } from '@/app/hooks/useProjectParams'
import { apiClient } from '@/app/lib/api/api-client'
import { UpdateTaskPayload } from '@/app/lib/api/dto/update-task.dto'
import { getOrganizationMembers } from '@/app/lib/api/members'
import { queryKeys } from '@/app/lib/queryKeys'
import { Task } from '@/app/types'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import React, { useState } from 'react'

type UpdateTaskModalProps = {
  setIsAdding: (v: boolean) => void
  task: Task
}

const UpdateTaskModal = ({ setIsAdding, task }: UpdateTaskModalProps) => {
  const [updatedTask, setUpdatedTask] = useState<UpdateTaskPayload>({
    title: task.title,
    description: task.description,
    status: task.status,
    assigneeId: task.assigneeId,
  })
  const { organizationId } = useProjectParams()
  const updateTaskMutation = useUpdateTask()
  const { data: members = [] } = useQuery({
    queryKey: queryKeys.organizationMembers(organizationId),
    queryFn: () => getOrganizationMembers(apiClient, organizationId),
  })
  const updateTask = (e: React.SubmitEvent) => {
    e.preventDefault()
    updateTaskMutation.mutate({ taskId: task.id, data: updatedTask })
    setIsAdding(false)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            Update task
          </h2>
          <button
            onClick={() => setIsAdding(false)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={updateTask} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-card-foreground">
              New Title
            </label>
            <input
              autoFocus
              value={updatedTask.title}
              onChange={(e) =>
                setUpdatedTask((s) => ({ ...s, title: e.target.value }))
              }
              placeholder="New Task title"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-card-foreground">
              New Description
            </label>
            <textarea
              value={updatedTask.description ?? ''}
              onChange={(e) =>
                setUpdatedTask((s) => ({ ...s, description: e.target.value }))
              }
              placeholder="Short description"
              rows={3}
              className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-card-foreground">
              Add Assignee
            </label>
            <select
              value={updatedTask.assigneeId ?? ''}
              onChange={(e) =>
                setUpdatedTask((prev) => ({
                  ...prev,
                  assigneeId: e.target.value || null,
                }))
              }
            >
              <option value="">Unassigned</option>

              {members.map((member) => (
                <option key={member.id} value={member.user.id}>
                  {member.user.name}
                </option>
              ))}
            </select>
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
              //   disabled={createTaskMutation.isPending}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {/* {createTaskMutation.isPending ? 'Creating...' : 'Add Task'} */}
              asdf
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTaskModal
