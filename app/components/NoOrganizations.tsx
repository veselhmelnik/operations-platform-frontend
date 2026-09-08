'use client'

import { Building2 } from 'lucide-react'
import { useState } from 'react'
import AddOrganizationModal from './Modals/AddOrganizationModal'
import LogoMark from './LogoMark'
import { btnPrimary } from '../utils/tailwind-constants'

const NoOrganizations = () => {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="animate-fade-up w-full max-w-sm text-center">
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <LogoMark />
          <span className="text-base font-bold tracking-[-0.035em] text-primary">
            TaskFlow
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl border border-dashed border-border text-primary">
            <Building2 className="size-5" />
          </div>

          <h2 className="text-lg font-semibold tracking-[-0.015em]">
            Create your first organization
          </h2>

          <p className="mt-2 text-xs text-muted-foreground">
            Organizations hold your projects, boards and teammates.
          </p>

          <button
            onClick={() => setIsAdding(true)}
            className={`${btnPrimary} mt-5 w-full`}
          >
            Create organization
          </button>
        </div>
      </div>

      {isAdding && <AddOrganizationModal setIsAdding={setIsAdding} />}
    </div>
  )
}

export default NoOrganizations
