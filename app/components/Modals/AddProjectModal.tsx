'use client'
import { useProjectParams } from '@/app/hooks/useParams'
import { apiClient } from '@/app/lib/api/api-client'
import { createProject } from '@/app/lib/api/projects'
import { queryKeys } from '@/app/lib/queryKeys'
import { routes } from '@/app/lib/routes'
import { Project } from '@/app/types'
import {
  btnGhost,
  btnPrimary,
  fieldInput,
  fieldLabel,
} from '@/app/utils/tailwind-constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ModalShell from './ModalShell'

type AddProjectModalProps = {
  setIsAdding: (v: boolean) => void
}

const AddProjectModal = ({ setIsAdding }: AddProjectModalProps) => {
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
  })
  const queryClient = useQueryClient()
  const router = useRouter()
  const { organizationId } = useProjectParams()

  const createProjectMutation = useMutation({
    mutationFn: () => createProject(apiClient, organizationId, newProject),

    onSuccess: (project: Project) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations })
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects(organizationId),
      })
      setIsAdding(false)

      router.push(routes.project(organizationId, project.id))
    },
  })

  function addProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!newProject.name.trim()) {
      return
    }

    createProjectMutation.mutate()
  }

  return (
    <ModalShell
      title="New project"
      onClose={() => setIsAdding(false)}
      onSubmit={addProject}
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
            disabled={createProjectMutation.isPending}
            className={btnPrimary}
          >
            {createProjectMutation.isPending ? 'Creating…' : 'Add project'}
          </button>
        </>
      }
    >
      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Name</span>
        <input
          autoFocus
          value={newProject.name}
          onChange={(e) =>
            setNewProject((s) => ({ ...s, name: e.target.value }))
          }
          placeholder="Project name"
          className={fieldInput}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Description</span>
        <textarea
          value={newProject.description}
          onChange={(e) =>
            setNewProject((s) => ({ ...s, description: e.target.value }))
          }
          placeholder="Short description"
          rows={3}
          className={`${fieldInput} resize-none`}
        />
      </label>
    </ModalShell>
  )
}

export default AddProjectModal
