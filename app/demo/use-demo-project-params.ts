'use client'

import { useProjectParams } from '@/app/hooks/useParams'
import { useDemoModeOptional } from './demo-context'
import { useDemoProjectParams } from './demo-params-context'
import { DEMO_ORGANIZATION, DEMO_PROJECT } from './mock-data'

/* Override useProjectParams to return demo values when in demo mode. */
export function useDemoAwareProjectParams() {
  const demo = useDemoModeOptional()
  const demoParams = useDemoProjectParams()
  const prodParams = useProjectParams()

  if (demo && demoParams) {
    return {
      organizationId: DEMO_ORGANIZATION.id,
      projectId: DEMO_PROJECT.id,
    }
  }

  return prodParams
}
