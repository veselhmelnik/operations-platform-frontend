'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { apiClient } from '@/app/lib/api/api-client'
import { getProjects } from '@/app/lib/api/projects'
import { queryKeys } from '@/app/lib/queryKeys'
import { routes } from '@/app/lib/routes'
import { useProjectParams } from '@/app/hooks/useParams'
import { useCurrentMember } from '@/app/hooks/useCurrentMember'
import { canManageWorkspace } from '@/app/utils/helpers/role.helper'
import AddProjectModal from './Modals/AddProjectModal'

const ProjectSelector = () => {
  const router = useRouter()
  const { organizationId, projectId } = useProjectParams()
  const currentMember = useCurrentMember(organizationId)
  const canAddProject = canManageWorkspace(currentMember?.role)
  const [isAddingProject, setIsAddingProject] = useState(false)

  const { data: projects = [] } = useQuery({
    queryKey: queryKeys.projects(organizationId),
    queryFn: () => getProjects(apiClient, organizationId),
    enabled: !!organizationId,
  })

  if (!organizationId) {
    return null
  }

  const changeProject = (newProjectId: string) => {
    router.push(routes.project(organizationId, newProjectId))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-4">
        <span className="text-sm font-medium">Projects</span>
        {canAddProject && (
          <button
            onClick={() => setIsAddingProject(true)}
            aria-label="Add project"
            className="cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      {projects.length > 0 && (
        <select
          value={projectId}
          onChange={(e) => changeProject(e.target.value)}
          className="mx-4 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      )}

      {isAddingProject && <AddProjectModal setIsAdding={setIsAddingProject} />}
    </div>
  )
}

export default ProjectSelector
