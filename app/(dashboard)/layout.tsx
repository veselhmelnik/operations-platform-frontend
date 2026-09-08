import React from 'react'
import Header from '../components/Header'
import AuthGuard from '../lib/AuthGuard'
import Sidebar from '../components/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex h-dvh overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header />
          <main className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
