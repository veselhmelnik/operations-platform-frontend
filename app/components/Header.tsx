'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import LogoutButton from './LogoutButton'
import ThemeToggle from './ThemeToggle'
import { apiClient } from '../lib/api/api-client'
import { getOrganizations } from '../lib/api/organizations'
import { getProjects } from '../lib/api/projects'
import { queryKeys } from '../lib/queryKeys'
import { useProjectParams } from '../hooks/useParams'

const Header = () => {
  const { organizationId, projectId } = useProjectParams()

  const { data: organizations = [] } = useQuery({
    queryKey: queryKeys.organizations,
    queryFn: () => getOrganizations(apiClient),
  })

  const { data: projects = [] } = useQuery({
    queryKey: queryKeys.projects(organizationId),
    queryFn: () => getProjects(apiClient, organizationId),
    enabled: !!organizationId,
  })

  const organization = organizations.find((org) => org.id === organizationId)
  const project = projects.find((proj) => proj.id === projectId)

  return (
    <header className="flex h-14.5 shrink-0 items-center gap-3.5 border-b border-border-soft bg-card px-5">
      <div className="flex min-w-0 items-center gap-1.75 text-xs text-faint">
        {organization && <span className="truncate">{organization.name}</span>}
        {organization && project && (
          <ChevronRight className="size-2.5 shrink-0" />
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
