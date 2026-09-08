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
import SelectField from './SelectField'

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
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-medium text-muted-foreground">
          Projects
        </span>
        {canAddProject && (
          <button
            onClick={() => setIsAddingProject(true)}
            aria-label="Add project"
            className="grid size-5 cursor-pointer place-items-center rounded-sm text-muted-foreground transition-[background-color,color,transform] duration-300 hover:rotate-90 hover:bg-primary-soft hover:text-primary"
          >
            <Plus className="size-3" />
          </button>
        )}
      </div>

      {projects.length > 0 && (
        <SelectField value={projectId} onChange={changeProject}>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </SelectField>
      )}

      {isAddingProject && <AddProjectModal setIsAdding={setIsAddingProject} />}
    </div>
  )
}

export default ProjectSelector
