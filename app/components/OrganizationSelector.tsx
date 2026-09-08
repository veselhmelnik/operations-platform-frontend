'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { getOrganizations } from '../lib/api/organizations'
import { apiClient } from '../lib/api/api-client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import AddOrganizationModal from './Modals/AddOrganizationModal'
import { routes } from '../lib/routes'
import { useProjectParams } from '../hooks/useParams'
import { queryKeys } from '../lib/queryKeys'
import SelectField from './SelectField'

const OrganizationSelector = () => {
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)

  const { organizationId } = useProjectParams()

  const { data: organizations = [] } = useQuery({
    queryKey: queryKeys.organizations,
    queryFn: () => getOrganizations(apiClient),
  })

  const changeOrganization = (newOrganizationId: string) => {
    router.push(routes.organization(newOrganizationId))
  }

  if (!organizations.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-1.5">
      <SelectField
        label="Organization"
        value={organizationId}
        onChange={changeOrganization}
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </SelectField>

      <button
        onClick={() => setIsAdding(true)}
        className="group flex cursor-pointer items-center gap-1.75 rounded-lg border border-dashed border-border bg-transparent px-2.5 py-1.75 text-xs font-medium text-muted-foreground transition-colors hover:border-primary-line hover:bg-primary-soft hover:text-primary"
      >
        <Plus className="size-3 transition-transform duration-300 group-hover:rotate-90" />
        Add organization
      </button>

      {isAdding && <AddOrganizationModal setIsAdding={setIsAdding} />}
    </div>
  )
}

export default OrganizationSelector
