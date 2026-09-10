'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardShell({
  children,
  demoMode=false
}: {
  children: React.ReactNode
  demoMode?: boolean
}) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const pathname = usePathname()
  const [lastPathname, setLastPathname] = useState(pathname)

  /* Close the drawer on navigation. Adjusting state during render is React's
     documented pattern for this — an effect here would be a cascading render. */
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setIsNavOpen(false)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsNavOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} demoMode/>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setIsNavOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto px-3 pt-3 pb-5 md:px-5 md:pt-4 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  )
}
