import { TaskPriority } from '@/app/types/enums'

export const PRIORITIES: {
  id: TaskPriority
  title: string
  color: string
}[] = [
  { id: 'LOW', title: 'Low', color: 'var(--neutral)' },
  { id: 'MEDIUM', title: 'Medium', color: 'var(--primary)' },
  { id: 'HIGH', title: 'High', color: 'var(--warning)' },
  { id: 'URGENT', title: 'Urgent', color: 'var(--destructive)' },
]

export function getPriority(priority: TaskPriority) {
  return PRIORITIES.find((p) => p.id === priority) ?? PRIORITIES[0]
}

/* Label colours come from the backend, so they could be anything — including
   values that would be unreadable as text on one of the two themes. Using the
   colour only as a tint and border, with `text-foreground` on top, keeps every
   chip legible in both. */
export function labelChipStyle(color: string) {
  return {
    background: `color-mix(in oklab, ${color} 16%, transparent)`,
    borderColor: `color-mix(in oklab, ${color} 38%, transparent)`,
  }
}
