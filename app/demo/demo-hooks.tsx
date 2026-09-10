'use client'

import { useDemoWorkspaceOptional } from './demo-workspace-context'
import type { Board, Task } from '@/app/types'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/app/lib/queryKeys'

/**
 * Hook that provides demo-aware board data.
 * Returns demo workspace board when in demo mode, otherwise undefined.
 */
export function useDemoAwareBoard(): Board | undefined {
  const workspace = useDemoWorkspaceOptional()
  return workspace?.board
}

/**
 * Hook that performs a demo-aware task move.
 * In demo mode, updates the workspace directly.
 * In production mode, this returns undefined (caller must use production mutation).
 */
export function useDemoAwareMoveTask() {
  const workspace = useDemoWorkspaceOptional()
  const queryClient = useQueryClient()

  return {
    isDemo: !!workspace,
    moveTask: workspace
      ? (
          taskId: string,
          targetStatus: string,
          position?: number,
          organizationId?: string,
          projectId?: string,
        ) => {
          workspace.moveTask(taskId, targetStatus as keyof Board, position)
        }
      : null,
  }
}

/**
 * Hook that provides demo-aware organization/project params.
 */
export function useDemoAwareParams() {
  const workspace = useDemoWorkspaceOptional()
  return workspace
    ? {
        organizationId: workspace.organization.id,
        projectId: workspace.currentProject.id,
      }
    : null
}
