'use client'
import { apiClient } from '@/app/lib/api/api-client'
import { CreateTaskPayload } from '@/app/lib/api/dto/create-task.dto'
import { createTask } from '@/app/lib/api/tasks'
import { queryKeys } from '@/app/lib/queryKeys'
import { useProjectParams } from '@/app/hooks/useParams'
import {
  btnGhost,
  btnPrimary,
  fieldInput,
  fieldLabel,
} from '@/app/utils/tailwind-constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import ModalShell from './ModalShell'
import { useDemoWorkspaceOptional } from '@/app/demo/demo-workspace-context'
import { Task } from '@/app/types'
import { Statuses, Priorities } from '@/app/utils/constants'

type AddTaskModalProps = {
  setIsAdding: (v: boolean) => void
}

const AddTaskModal = ({ setIsAdding }: AddTaskModalProps) => {
  const demoWorkspace = useDemoWorkspaceOptional()
  const [newTask, setNewTask] = useState<CreateTaskPayload>({
    title: '',
    description: '',
  })
  const [isCreating, setIsCreating] = useState(false)
  const queryClient = useQueryClient()
  const prodParams = useProjectParams()
  const organizationId = demoWorkspace ? demoWorkspace.organization.id : prodParams.organizationId
  const projectId = demoWorkspace ? demoWorkspace.currentProject.id : prodParams.projectId

  const createTaskMutation = useMutation({
    mutationFn: (task: CreateTaskPayload) =>
      createTask(apiClient, organizationId, projectId, task),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.board(organizationId, projectId),
      })
      setIsAdding(false)
    },
  })

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!newTask.title.trim()) return

    if (demoWorkspace) {
      // Demo mode: create task locally
      setIsCreating(true)
      try {
        const newDemoTask: Task = {
          id: `task-${Date.now()}`,
          title: newTask.title,
          description: newTask.description || null,
          status: Statuses.TODO,
          priority: Priorities.MEDIUM,
          position: demoWorkspace.board[Statuses.TODO]?.length || 0,
          projectId,
          assigneeId: null,
          assignee: null,
          labels: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        demoWorkspace.addTask(newDemoTask)
        setIsAdding(false)
      } finally {
        setIsCreating(false)
      }
    } else {
      // Production mode: use mutation
      createTaskMutation.mutate(newTask)
    }
  }

  return (
    <ModalShell
      title="New task"
      onClose={() => setIsAdding(false)}
      onSubmit={addTask}
      footer={
        <>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className={btnGhost}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={demoWorkspace ? isCreating : createTaskMutation.isPending}
            className={btnPrimary}
          >
            {demoWorkspace ? (isCreating ? 'Creating…' : 'Add task') : createTaskMutation.isPending ? 'Creating…' : 'Add task'}
          </button>
        </>
      }
    >
      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Title</span>
        <input
          autoFocus
          value={newTask.title}
          onChange={(e) => setNewTask((s) => ({ ...s, title: e.target.value }))}
          placeholder="Task title"
          className={fieldInput}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Description</span>
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask((s) => ({ ...s, description: e.target.value }))
          }
          placeholder="Short description"
          rows={3}
          className={`${fieldInput} resize-none`}
        />
      </label>
    </ModalShell>
  )
}

export default AddTaskModal
