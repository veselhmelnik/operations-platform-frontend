'use client'
import { useUpdateTask } from '@/app/hooks/tasks/useUpdateTask'
import { useProjectParams } from '@/app/hooks/useParams'
import { useOrganizationLabels } from '@/app/hooks/useOrganizationLabels'
import { useCreateLabel } from '@/app/hooks/useCreateLabel'
import { apiClient } from '@/app/lib/api/api-client'
import { UpdateTaskPayload } from '@/app/lib/api/dto/update-task.dto'
import { getOrganizationMembers } from '@/app/lib/api/members'
import { queryKeys } from '@/app/lib/queryKeys'
import { Task } from '@/app/types'
import { TaskPriority, TaskStatus } from '@/app/types/enums'
import { COLUMNS } from '@/app/utils/constants'
import { PRIORITIES } from '@/app/utils/helpers/task.helper'
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
import { LabelPicker } from '../LabelPicker'

type UpdateTaskModalProps = {
  setIsAdding: (v: boolean) => void
  task: Task
}

const UpdateTaskModal = ({ setIsAdding, task }: UpdateTaskModalProps) => {
  const [updatedTask, setUpdatedTask] = useState<UpdateTaskPayload>({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assigneeId: task.assigneeId,
    labelIds: (task.labels ?? []).map(({ label }) => label.id),
  })
  const { organizationId } = useProjectParams()
  const updateTaskMutation = useUpdateTask()
  const createLabelMutation = useCreateLabel(organizationId)
  const { data: members = [] } = useQuery({
    queryKey: queryKeys.organizationMembers(organizationId),
    queryFn: () => getOrganizationMembers(apiClient, organizationId),
  })

  const { data: availableLabels = [] } = useOrganizationLabels()

  const selectedLabelIds = updatedTask.labelIds ?? []

  const toggleLabel = (labelId: string) => {
    setUpdatedTask((s) => {
      const current = s.labelIds ?? []
      return {
        ...s,
        labelIds: current.includes(labelId)
          ? current.filter((id) => id !== labelId)
          : [...current, labelId],
      }
    })
  }

  const handleCreateLabel = async (name: string, color: string) => {
    await createLabelMutation.mutateAsync({ name, color })
  }

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
          label="Priority"
          value={updatedTask.priority ?? task.priority}
          onChange={(value) =>
            setUpdatedTask((s) => ({ ...s, priority: value as TaskPriority }))
          }
        >
          {PRIORITIES.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.title}
            </option>
          ))}
        </SelectField>
      </div>

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

      <LabelPicker
        selectedIds={selectedLabelIds}
        availableLabels={availableLabels}
        onToggle={toggleLabel}
        onCreateLabel={handleCreateLabel}
        isLoading={createLabelMutation.isPending}
      />
    </ModalShell>
  )
}

export default UpdateTaskModal
