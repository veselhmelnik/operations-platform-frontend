'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Menu } from 'lucide-react'
import LogoutButton from './LogoutButton'
import ThemeToggle from './ThemeToggle'
import { apiClient } from '../lib/api/api-client'
import { getOrganizations } from '../lib/api/organizations'
import { getProjects } from '../lib/api/projects'
import { queryKeys } from '../lib/queryKeys'
import { useProjectParams } from '../hooks/useParams'
import { useDemoWorkspaceOptional } from '@/app/demo/demo-workspace-context'

const Header = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const demoWorkspace = useDemoWorkspaceOptional()
  const prodParams = useProjectParams()

  const organizationId = demoWorkspace ? demoWorkspace.organization.id : prodParams.organizationId
  const projectId = demoWorkspace ? demoWorkspace.currentProject.id : prodParams.projectId

  const { data: organizations = [] } = useQuery({
    queryKey: queryKeys.organizations,
    queryFn: () => getOrganizations(apiClient),
    enabled: !demoWorkspace,
  })

  const { data: projects = [] } = useQuery({
    queryKey: queryKeys.projects(organizationId),
    queryFn: () => getProjects(apiClient, organizationId),
    enabled: !demoWorkspace && !!organizationId,
  })

  const organization = demoWorkspace
    ? demoWorkspace.organization
    : organizations.find((org) => org.id === organizationId)
  const project = demoWorkspace
    ? demoWorkspace.currentProject
    : projects.find((proj) => proj.id === projectId)

  return (
    <header className="flex h-14.5 shrink-0 items-center gap-2 border-b border-border-soft bg-card px-3 md:gap-3.5 md:px-5">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="-ml-1 grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
      >
        <Menu className="size-4.5" />
      </button>

      <div className="flex min-w-0 items-center gap-1.75 text-xs text-faint">
        {organization && (
          <span className="hidden truncate sm:inline">{organization.name}</span>
        )}
        {organization && project && (
          <ChevronRight className="hidden size-2.5 shrink-0 sm:block" />
        )}
        {project && (
          <span className="truncate font-semibold text-foreground">
            {project.name}
          </span>
        )}
      </div>

      <div className="flex-1" />

      <ThemeToggle />
      <LogoutButton />
    </header>
  )
}

export default Header
