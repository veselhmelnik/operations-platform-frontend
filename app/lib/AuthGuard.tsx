'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getCurrentUser, logout } from './api/auth'
import { apiClient } from './api/api-client'

function DashboardSkeleton() {
  return (
    <div className="flex h-dvh flex-col gap-3.5 overflow-hidden bg-background px-3 pt-3 md:px-5 md:pt-4">
      <div className="relative h-0.5 overflow-hidden rounded-sm bg-border-soft">
        <div className="animate-drift-line absolute inset-y-0 w-[30%] rounded-sm bg-linear-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:gap-2.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2.5 rounded-xl border border-border-soft bg-card p-3"
          >
            <div className="skeleton h-2 w-[44%] rounded-sm" />
            <div className="skeleton h-6 w-[30%] rounded-sm" />
            <div className="skeleton h-2 w-[66%] rounded-sm" />
          </div>
        ))}
      </div>

      <div className="flex gap-2.5">
        <div className="skeleton h-7.5 w-26 rounded-lg" />
        <div className="skeleton h-7.5 w-20 rounded-lg" />
      </div>

      <div className="grid auto-cols-[minmax(236px,1fr)] grid-flow-col items-start gap-2.5 overflow-hidden">
        {Array.from({ length: 4 }).map((_, col) => (
          <div
            key={col}
            className="flex flex-col gap-2 rounded-xl border border-border-soft bg-card p-2.5"
          >
            <div className="mb-0.5 flex items-center justify-between">
              <div className="skeleton h-2 w-13 rounded-sm" />
              <div className="h-3.5 w-5 rounded-full bg-elevated" />
            </div>
            {Array.from({ length: 3 }).map((_, row) => (
              <div
                key={row}
                className="flex flex-col gap-1.75 rounded-[10px] border border-border-soft bg-muted p-2.5"
              >
                <div className="skeleton h-2 w-[82%] rounded-sm" />
                <div className="skeleton h-1.5 w-[58%] rounded-sm" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    getCurrentUser(apiClient)
      .then(() => setIsChecking(false))
      .catch(async () => {
        await logout(apiClient)
        router.replace('/login')
      })
  }, [router])

  if (isChecking) return <DashboardSkeleton />

  return children
}
