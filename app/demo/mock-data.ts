import { Board, User, OrganizationMember } from "../types"
import { OrganizationRole } from "../types/enums"
import { Statuses, Priorities } from "../utils/constants"

export const DEMO_USER: User = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@taskflow.local',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const DEMO_ORGANIZATION = {
  id: 'demo-org',
  name: 'TaskFlow Demo',
}

export const DEMO_PROJECT = {
  id: 'demo-project',
  name: 'Website Launch',
  description: 'Demo workspace for exploring TaskFlow',
}

export const DEMO_LABELS = [
  {
    id: 'label-frontend',
    name: 'Frontend',
    color: '#8b5cf6',
  },
  {
    id: 'label-backend',
    name: 'Backend',
    color: '#3b82f6',
  },
  {
    id: 'label-design',
    name: 'Design',
    color: '#ec4899',
  },
  {
    id: 'label-billing',
    name: 'Billing',
    color: '#22c55e',
  },
]

export const DEMO_USER_1: User = {
  id: 'user-1',
  name: 'Alex Morgan',
  email: 'alex@example.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const DEMO_USER_2: User = {
  id: 'user-2',
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const DEMO_MEMBERS: OrganizationMember[] = [
  {
    id: 'member-1',
    user: {
      id: DEMO_USER_1.id,
      name: DEMO_USER_1.name,
      email: DEMO_USER_1.email,
    },
    role: 'OWNER' as OrganizationRole,
  },
  {
    id: 'member-2',
    user: {
      id: DEMO_USER_2.id,
      name: DEMO_USER_2.name,
      email: DEMO_USER_2.email,
    },
    role: 'MEMBER' as OrganizationRole,
  },
]

export const DEMO_BOARD: Board = {
  [Statuses.TODO]: [
    {
      id: 'task-1',
      title: 'Prepare pricing page',
      description: 'Add Free and Pro plan comparison',
      status: Statuses.TODO,
      priority: Priorities.MEDIUM,
      position: 0,
      projectId: DEMO_PROJECT.id,
      assigneeId: 'user-1',
      assignee: DEMO_USER_1,
      updatedAt: Date.now().toString(),
      createdAt: Date.now().toString(),
      labels: [
        {
          label: DEMO_LABELS[2],
        },
      ],
    },
    {
      id: 'task-2',
      title: 'Write onboarding emails',
      description: 'Prepare welcome sequence for new users',
      status: Statuses.TODO,
      priority: Priorities.MEDIUM,
      position: 1,
      projectId: DEMO_PROJECT.id,
      assigneeId: null,
      assignee: null,
      updatedAt: Date.now().toString(),
      createdAt: Date.now().toString(),
      labels: [
        {
          label: DEMO_LABELS[0],
        },
      ],
    },
  ],

  [Statuses.IN_PROGRESS]: [
    {
      id: 'task-3',
      title: 'Implement Stripe checkout',
      description: 'Finish subscription checkout flow',
      status: Statuses.IN_PROGRESS,
      priority: Priorities.URGENT,
      position: 0,
      projectId: DEMO_PROJECT.id,
      assigneeId: 'user-1',
      assignee: DEMO_USER_1,
      updatedAt: Date.now().toString(),
      createdAt: Date.now().toString(),
      labels: [
        {
          label: DEMO_LABELS[1],
        },
        {
          label: DEMO_LABELS[3],
        },
      ],
    },
  ],

  [Statuses.REVIEW]: [
    {
      id: 'task-4',
      title: 'Landing page redesign',
      description: 'Review spacing and mobile layout',
      status: Statuses.REVIEW,
      priority: Priorities.HIGH,
      position: 0,
      projectId: DEMO_PROJECT.id,
      assigneeId: 'user-2',
      assignee: DEMO_USER_2,
      updatedAt: Date.now().toString(),
      createdAt: Date.now().toString(),
      labels: [
        {
          label: DEMO_LABELS[2],
        },
      ],
    },
  ],

  [Statuses.DONE]: [
    {
      id: 'task-5',
      title: 'Authentication flow',
      description: 'JWT auth and protected routes',
      status: Statuses.DONE,
      priority: Priorities.MEDIUM,
      position: 0,
      projectId: DEMO_PROJECT.id,
      assigneeId: 'user-1',
      assignee: DEMO_USER_1,
      updatedAt: Date.now().toString(),
      createdAt: Date.now().toString(),
      labels: [
        {
          label: DEMO_LABELS[1],
        },
      ],
    },
  ],
}