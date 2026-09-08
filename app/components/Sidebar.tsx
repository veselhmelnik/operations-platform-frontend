'use client'

import Link from 'next/link'
import OrganizationSelector from './OrganizationSelector'
import ProjectSelector from './ProjectSelector'
import SidebarMenu from './SidebarMenu'
import SubscriptionCard from './SubscriptionCard'
import SidebarUser from './SidebarUser'
import LogoMark from './LogoMark'

const Sidebar = () => {
  return (
    <aside className="flex w-65.5 shrink-0 flex-col justify-between overflow-x-hidden overflow-y-auto border-r border-border-soft bg-card">
      <div className="flex flex-col gap-4.5 px-3.5 py-4">
        <Link
          href="/"
          className="animate-slide-right flex items-center gap-2.25 px-1 py-0.5 transition-opacity hover:opacity-80"
        >
          <LogoMark />
          <span className="text-base font-bold tracking-[-0.035em] text-primary">
            TaskFlow
          </span>
        </Link>

        <div className="animate-slide-right [animation-delay:50ms]">
          <OrganizationSelector />
        </div>

        <div className="animate-slide-right flex flex-col gap-2.5 [animation-delay:100ms]">
          <span className="px-1 text-3xs font-semibold tracking-[0.13em] uppercase text-faint">
            Workspace
          </span>
          <ProjectSelector />
          <SidebarMenu />
        </div>

        <div className="animate-slide-right border-t border-border-soft pt-4 [animation-delay:160ms]">
          <SubscriptionCard />
        </div>
      </div>

      <SidebarUser />
    </aside>
  )
}

export default Sidebar
