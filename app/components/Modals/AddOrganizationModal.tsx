'use client'
import { apiClient } from '@/app/lib/api/api-client'
import { createOrganization } from '@/app/lib/api/organizations'
import { queryKeys } from '@/app/lib/queryKeys'
import { routes } from '@/app/lib/routes'
import { Organization } from '@/app/types'
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

type AddOrganizationModalProps = {
  setIsAdding: (v: boolean) => void
}

const AddOrganizationModal = ({ setIsAdding }: AddOrganizationModalProps) => {
  const [name, setName] = useState('')
  const queryClient = useQueryClient()
  const router = useRouter()

  const createOrganizationMutation = useMutation({
    mutationFn: () => createOrganization(apiClient, { name }),

    onSuccess: (organization: Organization) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations })
      setIsAdding(false)

      router.push(routes.organization(organization.id))
    },
  })

  function addOrganization(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim()) {
      return
    }

    createOrganizationMutation.mutate()
  }

  return (
    <ModalShell
      title="New organization"
      onClose={() => setIsAdding(false)}
      onSubmit={addOrganization}
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
            disabled={createOrganizationMutation.isPending}
            className={btnPrimary}
          >
            {createOrganizationMutation.isPending
              ? 'Creating…'
              : 'Add organization'}
          </button>
        </>
      }
    >
      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>Name</span>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Organization name"
          className={fieldInput}
        />
      </label>
    </ModalShell>
  )
}

export default AddOrganizationModal
