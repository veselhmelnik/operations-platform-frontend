'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import OrganizationSelector from './OrganizationSelector'
import ProjectSelector from './ProjectSelector'
import SidebarMenu from './SidebarMenu'
import SubscriptionCard from './SubscriptionCard'
import SidebarUser from './SidebarUser'
import LogoMark from './LogoMark'
import { useOrganizationParams } from '../hooks/useParams'
import { routes } from '../lib/routes'

type SidebarProps = {
  isOpen?: boolean
  onClose?: () => void
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const { organizationId } = useOrganizationParams()
  const dashboardHref = routes.organization(organizationId)
  return (
    <>
      {/* Scrim — mobile only, and never intercepts clicks while closed */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-scrim transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-65.5 shrink-0 flex-col justify-between overflow-x-hidden overflow-y-auto border-r border-border-soft bg-card transition-transform duration-300 md:static md:visible md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full max-md:invisible'
        }`}
      >
        <div className="flex flex-col gap-4.5 px-3.5 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={dashboardHref}
              className="animate-slide-right flex items-center gap-2.25 px-1 py-0.5 transition-opacity hover:opacity-80"
            >
              <LogoMark />
              <span className="text-base font-bold tracking-[-0.035em] text-primary">
                TaskFlow
              </span>
            </Link>

            {/* Drawer close — mobile only */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="grid size-9 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            >
              <X className="size-4" />
            </button>
          </div>

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
        </div>

        <div>
          <div className="m-3 animate-slide-right border-border-soft pt-4 [animation-delay:160ms]">
            <SubscriptionCard />
          </div>
          <SidebarUser />
        </div>
      </aside>
    </>
  )
}

export default Sidebar
