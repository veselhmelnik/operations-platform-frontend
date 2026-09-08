'use client'
import { useUpdateTask } from '@/app/hooks/tasks/useUpdateTask'
import { useProjectParams } from '@/app/hooks/useParams'
import { apiClient } from '@/app/lib/api/api-client'
import { UpdateTaskPayload } from '@/app/lib/api/dto/update-task.dto'
import { getOrganizationMembers } from '@/app/lib/api/members'
import { queryKeys } from '@/app/lib/queryKeys'
import { Task } from '@/app/types'
import { TaskStatus } from '@/app/types/enums'
import { COLUMNS } from '@/app/utils/constants'
import {
  btnGhost,
  btnPrimary,
  fieldInput,
  fieldLabel,
} from '@/app/utils/tailwind-constants'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import ModalShell from './ModalShell'
import SelectField from '../SelectField'

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

  const updateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateTaskMutation.mutate({ taskId: task.id, data: updatedTask })
    setIsAdding(false)
  }

  return (
    <ModalShell
      title="Update task"
      onClose={() => setIsAdding(false)}
      onSubmit={updateTask}
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
            disabled={updateTaskMutation.isPending}
            className={btnPrimary}
          >
            {updateTaskMutation.isPending ? 'Saving…' : 'Save changes'}
          </button>
        </>
      }
    >
      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Title</span>
        <input
          autoFocus
          value={updatedTask.title}
          onChange={(e) =>
            setUpdatedTask((s) => ({ ...s, title: e.target.value }))
          }
          placeholder="Task title"
          className={fieldInput}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Description</span>
        <textarea
          value={updatedTask.description ?? ''}
          onChange={(e) =>
            setUpdatedTask((s) => ({ ...s, description: e.target.value }))
          }
          placeholder="Short description"
          rows={3}
          className={`${fieldInput} resize-none`}
        />
      </label>

      <div className="grid grid-cols-2 gap-2.5">
        <SelectField
          label="Status"
          value={updatedTask.status ?? task.status}
          onChange={(value) =>
            setUpdatedTask((s) => ({ ...s, status: value as TaskStatus }))
          }
        >
          {COLUMNS.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Assignee"
          value={updatedTask.assigneeId ?? ''}
          onChange={(value) =>
            setUpdatedTask((s) => ({ ...s, assigneeId: value || null }))
          }
        >
          <option value="">Unassigned</option>
          {members.map((member) => (
            <option key={member.id} value={member.user.id}>
              {member.user.name}
            </option>
          ))}
        </SelectField>
      </div>
    </ModalShell>
  )
}

export default UpdateTaskModal
