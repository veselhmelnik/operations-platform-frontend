'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { getOrganizations } from '../lib/api/organizations'
import { apiClient } from '../lib/api/api-client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import AddOrganizationModal from './Modals/AddOrganizationModal'

const OrganizationSelector = () => {
  const params = useParams()
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)

  const organizationId = params.organizationId as string

  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizations(apiClient),
  })

  const changeOrganization = (newOrganizationId: string) => {
    router.push(`/organizations/${newOrganizationId}`)
  }

  if (!organizations.length) {
    return null
  }

  return (
    <div>
      <div>Organizations</div>

      <select
        value={organizationId}
        onChange={(e) => changeOrganization(e.target.value)}
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => setIsAdding(true)}
        className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" />
        Add organization
      </button>
        {isAdding && <AddOrganizationModal setIsAdding={setIsAdding} />}
    </div>
  )
}

export default OrganizationSelector
