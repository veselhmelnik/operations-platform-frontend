'use client'
import { getProjects } from '@/app/lib/api/projects'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/app/lib/api/api-client'
import AddTaskModal from '../Modals/AddTaskModal'
import AddProjectModal from '../Modals/AddProjectModal'

type KanbanHeaderProps = {
  organizationId: string
  projectId: string
}

const KanbanHeader = ({ organizationId, projectId }: KanbanHeaderProps) => {
  const router = useRouter()
  const { data: projects } = useQuery({
    queryKey: ['projects', organizationId],
    queryFn: () => getProjects(apiClient, organizationId),
  })
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const changeProject = (newProjectId: string) => {
    router.push(`/organizations/${organizationId}/projects/${newProjectId}`)
  }
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddingTask(true)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add task
          </button>
        </div>
      </div>
      <div className='flex gap-2'>
        <select
          value={projectId}
          onChange={(e) => changeProject(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2"
        >
          {projects?.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsAddingProject(true)}
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>
      {isAddingTask && <AddTaskModal setIsAdding={setIsAddingTask} />}
      {isAddingProject && <AddProjectModal setIsAdding={setIsAddingProject} />}
    </div>
  )
}

export default KanbanHeader
