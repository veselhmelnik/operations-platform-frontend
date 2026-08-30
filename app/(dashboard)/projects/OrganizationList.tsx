'use client'

import { getOrganizations } from '@/app/lib/api/organizations'
import { useQuery } from '@tanstack/react-query'

const OrganizationList = () => {
  const {
    data: organizations,
    isLoading,
    error,
  } = useQuery({ queryKey: ['organizations'], queryFn: getOrganizations })

  if (isLoading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6">{error.message}</div>
  return (
    <div className="p-6">
      {organizations?.map((org) => {
        return <div key={org.id}>{org.name}</div>
      })}
    </div>
  )
}

export default OrganizationList
