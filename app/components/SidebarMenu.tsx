'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/app/lib/routes'
import { RiTeamLine, RiHistoryLine, RiLayoutColumnLine } from 'react-icons/ri'
import { useProjectParams } from '../hooks/useParams'

export default function SidebarMenu() {
  const pathname = usePathname()
  const { organizationId, projectId } = useProjectParams()

  if (!organizationId) {
    return null
  }

  const menuItems = [
    ...(projectId
      ? [
          {
            label: 'Board',
            icon: RiLayoutColumnLine,
            href: routes.project(organizationId, projectId),
          },
        ]
      : []),
    {
      label: 'Members',
      icon: RiTeamLine,
      href: routes.members(organizationId),
    },
    {
      label: 'Activity',
      icon: RiHistoryLine,
      href: routes.activity(organizationId),
    },
  ]

  return (
    <nav className="flex flex-col gap-0.75">
      {menuItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-2.25 rounded-lg px-2.5 py-2 text-sm transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 ${
              isActive
                ? 'bg-primary font-semibold text-primary-foreground'
                : 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <item.icon size={14} />
            <span className={isActive ? 'text-white' : ''}>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
