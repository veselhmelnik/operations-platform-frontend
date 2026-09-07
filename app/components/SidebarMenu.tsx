'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/app/lib/routes'
import { RiTeamLine } from 'react-icons/ri'
import { useOrganizationParams } from '../hooks/useParams'

const menuItems = [
  {
    label: 'Members',
    icon: RiTeamLine,
    getHref: (organizationId: string) => routes.members(organizationId),
  },
]

export default function SidebarMenu() {
  const pathname = usePathname()
  const { organizationId } = useOrganizationParams()

  if (!organizationId) {
    return null
  }

  return (
    <nav className="flex flex-col gap-2">
      {menuItems.map((item) => {
        const href = item.getHref(organizationId)
        const isActive = pathname === href

        return (
          <Link
            key={item.label}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
