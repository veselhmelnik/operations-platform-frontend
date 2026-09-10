'use client'

import React, { createContext, useContext } from 'react'
import { DEMO_ORGANIZATION, DEMO_PROJECT } from './mock-data'

type DemoParamsContextType = {
  organizationId: string
  projectId: string
}

const DemoParamsContext = createContext<DemoParamsContextType | undefined>(
  undefined,
)

export function DemoProjectParamsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DemoParamsContext.Provider
      value={{
        organizationId: DEMO_ORGANIZATION.id,
        projectId: DEMO_PROJECT.id,
      }}
    >
      {children}
    </DemoParamsContext.Provider>
  )
}

export function useDemoProjectParams(): DemoParamsContextType | undefined {
  return useContext(DemoParamsContext)
}
