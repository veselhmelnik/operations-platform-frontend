import type { Activity } from '@/app/types'
import { COLUMNS } from '@/app/utils/constants'

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatStatus(status?: string): string {
  if (!status) return 'Unknown'
  return COLUMNS.find((column) => column.id === status)?.title ?? toTitleCase(status)
}

export function formatActivityMessage(activity: Activity): string {
  const actor = activity.user?.name ?? 'System'
  const metadata = activity.metadata ?? {}

  switch (activity.action) {
    case 'ORGANIZATION_CREATED':
      return `${actor} created the organization "${metadata.name}"`

    case 'MEMBER_INVITED':
      return `${actor} invited ${metadata.email} as ${toTitleCase(metadata.role ?? '')}`

    case 'MEMBER_JOINED':
      return `${metadata.memberName ?? actor} joined the organization`

    case 'MEMBER_ROLE_CHANGED':
      return `${actor} changed ${metadata.memberName}'s role from ${toTitleCase(metadata.oldRole ?? '')} to ${toTitleCase(metadata.newRole ?? '')}`

    case 'MEMBER_REMOVED':
      return `${actor} removed ${metadata.memberName} from the organization`

    case 'PROJECT_CREATED':
      return `${actor} created the project "${metadata.name}"`

    case 'TASK_CREATED':
      return `${actor} created the task "${metadata.title}"`

    case 'TASK_UPDATED':
      return `${actor} updated the task "${metadata.title}"`

    case 'TASK_MOVED':
      return `${actor} moved the task "${metadata.title}" from ${formatStatus(metadata.fromStatus)} to ${formatStatus(metadata.toStatus)}`

    case 'TASK_DELETED':
      return `${actor} deleted the task "${metadata.title}"`

    default:
      return `${actor} ${toTitleCase(activity.action).toLowerCase()} a ${toTitleCase(activity.entityType).toLowerCase()}`
  }
}
