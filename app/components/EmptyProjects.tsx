'use client'

import { FolderKanban } from 'lucide-react'
import { useState } from 'react'
import AddProjectModal from './Modals/AddProjectModal'
import { btnPrimary } from '../utils/tailwind-constants'

function EmptyProjects() {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="flex flex-1 items-center justify-center py-16">
      <div className="animate-fade-up max-w-md text-center">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl border border-dashed border-border text-primary">
          <FolderKanban className="size-5" />
        </div>

        <h2 className="text-lg font-semibold tracking-[-0.015em]">
          No projects yet
        </h2>

        <p className="mt-2 text-xs text-muted-foreground">
          Create your first project to start organizing tasks with your team.
        </p>

        <button onClick={() => setIsAdding(true)} className={`${btnPrimary} mt-5`}>
          Create project
        </button>
      </div>

      {isAdding && <AddProjectModal setIsAdding={setIsAdding} />}
    </div>
  )
}

export default EmptyProjects
