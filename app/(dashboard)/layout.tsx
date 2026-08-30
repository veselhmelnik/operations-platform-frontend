import React from 'react'
import Header from '../components/Header'
import AuthGuard from '../lib/AuthGuard'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <AuthGuard>
      <div className="min-h-full flex flex-col">
        <Header />
        <div className="flex flex-1">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
