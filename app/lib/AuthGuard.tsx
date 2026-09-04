'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getCurrentUser, logout } from './api/auth'
import { apiClient } from './api/api-client'

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

  if (isChecking) return <div>Loading</div>

  return children
}
