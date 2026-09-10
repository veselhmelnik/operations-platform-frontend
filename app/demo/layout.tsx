import React from 'react'
import DashboardShell from '@/app/components/DashboardShell'
import { DemoWorkspaceProvider } from './demo-workspace-context'
import { DemoBanner } from './demo-banner'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DemoWorkspaceProvider>
      <DemoBanner />
      <DashboardShell demoMode={true}>{children}</DashboardShell>
    </DemoWorkspaceProvider>
  )
}
