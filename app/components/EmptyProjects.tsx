import { FolderKanban } from 'lucide-react'
import React from 'react'

function EmptyProjects() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg border">
          <FolderKanban className="size-6" />
        </div>

        <h2 className="text-xl font-semibold">No projects yet</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first project to start organizing tasks with your team.
        </p>

        <button className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Create project
        </button>
      </div>
    </div>
  )
}

export default EmptyProjects
