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
      <div>
        <div className='flex'>
          <Sidebar />
          <div className='w-full'>
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
