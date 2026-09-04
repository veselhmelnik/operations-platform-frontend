import { FaFolder } from 'react-icons/fa';
import { IoMdHome } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { TaskStatus } from '../types/enums';

export enum Statuses {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export interface Column {
  id: TaskStatus
  title: string
}

export const COLUMNS: Column[] = [
  { id: Statuses.TODO, title: 'To Do' },
  { id: Statuses.IN_PROGRESS, title: 'In Progress' },
  { id: Statuses.REVIEW, title: 'Preview' },
  { id: Statuses.DONE, title: 'Done' },
]

export const MENU_ITEMS = [
    {
        id: 1,
        icon: IoMdHome,
        href: '/',
        name: 'Dashboard',
    },
    {
        id: 2,
        icon: FaFolder,
        href: '/projects',
        name: 'Projects',
    },
    {
        id: 3,
        icon: FaTasks,
        href: '/tasks',
        name: 'Tasks',
    },
]

export const TASK_STATS_ITEMS = [
    {
        id: 1,
        label: 'Total Task',
        count: 12,
        footer: '3+ New Task Today'
    },
    {
        id: 2,
        label: 'In Progress',
        count: 12,
        footer: 'Harvest progress'
    },
    {
        id: 3,
        label: 'Review Task',
        count: 4,
        footer: '1+ New Review Today'
    },
    {
        id: 4,
        label: 'Completed',
        count: 30,
        footer: 'Manage workers'
    }
]