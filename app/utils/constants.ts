import { TaskStatus } from '../types/enums';

export enum Statuses {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}
export enum Priorities {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface Column {
  id: TaskStatus
  title: string
  dot: string
}

export const COLUMNS: Column[] = [
  { id: Statuses.TODO, title: 'To Do', dot: 'var(--neutral)' },
  { id: Statuses.IN_PROGRESS, title: 'In Progress', dot: 'var(--primary)' },
  { id: Statuses.REVIEW, title: 'Preview', dot: 'var(--neutral)' },
  { id: Statuses.DONE, title: 'Done', dot: 'var(--success)' },
]

export const TASK_PRIORITIES = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
] as const
