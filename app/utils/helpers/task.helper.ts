import { TaskPriority } from '@/app/types/enums'

export const PRIORITIES: {
  id: TaskPriority
  title: string
  color: string
}[] = [
  { id: 'LOW', title: 'Low', color: 'var(--neutral)' },
  { id: 'MEDIUM', title: 'Medium', color: 'var(--primary-priority)' },
  { id: 'HIGH', title: 'High', color: 'var(--warning)' },
  { id: 'URGENT', title: 'Urgent', color: 'var(--destructive)' },
]

export function getPriority(priority: TaskPriority) {
  return PRIORITIES.find((p) => p.id === priority) ?? PRIORITIES[0]
}

export function labelChipStyle(color: string) {
  return {
    background: `color-mix(in oklab, ${color} 16%, transparent)`,
    borderColor: `color-mix(in oklab, ${color} 78%, transparent)`,
  }
}
