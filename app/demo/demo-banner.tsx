'use client'

import { useDemoWorkspaceOptional } from './demo-workspace-context'
import { RotateCcw } from 'lucide-react'

export function DemoBanner() {
  const workspace = useDemoWorkspaceOptional()

  if (!workspace) return null

  return (
    <div className="flex items-center justify-between gap-3 border-b border-warning bg-warning/10 px-5 py-2.5 text-sm text-warning">
      <span>
        🎭 Demo workspace — changes are stored locally and do not affect real
        data.
      </span>
      <button
        onClick={workspace.resetDemo}
        className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-warning hover:bg-warning/20 transition-colors"
      >
        <RotateCcw className="size-3.5" />
        Reset
      </button>
    </div>
  )
}
