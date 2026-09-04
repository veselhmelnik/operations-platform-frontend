'use client'
import { useProjectParams } from '@/app/hooks/useProjectParams'
import { apiClient } from '@/app/lib/api/api-client'
import { createProject } from '@/app/lib/api/projects'
import { queryKeys } from '@/app/lib/queryKeys'
import { routes } from '@/app/lib/routes'
import { Project } from '@/app/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'

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
      setIsAdding(false)

      router.push(routes.project(organizationId, project.id))
    },
  })

  function addOrganization(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!newProject.name.trim()) {
      return
    }

    createProjectMutation.mutate()
  }

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            New Project
          </h2>
          <button
            onClick={() => setIsAdding(false)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={addOrganization} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-card-foreground">
              Title
            </label>
            <input
              autoFocus
              value={newProject.name}
              onChange={(e) =>
                setNewProject((s) => ({ ...s, name: e.target.value }))
              }
              placeholder="Project title"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </div>
          <label className="mb-1 block text-sm font-medium text-card-foreground">
            Description
          </label>
          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject((s) => ({ ...s, description: e.target.value }))
            }
            placeholder="Short description"
            rows={3}
            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
          />
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
              disabled={createProjectMutation.isPending}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {createProjectMutation.isPending ? 'Creating...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}

export default AddProjectModal
