'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Organization, Project, Board, OrganizationMember, Task } from '@/app/types'
import { TaskLabel } from '@/app/types/task'
import { Statuses } from '@/app/utils/constants'
import {
  DEMO_BOARD,
  DEMO_MEMBERS,
  DEMO_LABELS,
  DEMO_ORGANIZATION,
  DEMO_PROJECT,
} from './mock-data'

const DEMO_STORAGE_KEY = 'taskflow-demo-workspace'

type DemoWorkspaceState = {
  organization: Organization
  projects: Project[]
  currentProject: Project
  board: Board
  labels: TaskLabel[]
  members: OrganizationMember[]
  activity: any[]
}

type DemoWorkspaceContextValue = {
  organization: Organization
  projects: Project[]
  currentProject: Project
  board: Board
  labels: TaskLabel[]
  members: OrganizationMember[]
  activity: any[]

  updateTask: (taskId: string, updates: Partial<Task>) => void
  deleteTask: (taskId: string) => void
  addTask: (task: Task) => void
  moveTask: (taskId: string, targetStatus: keyof Board, position?: number) => void
  createLabel: (label: TaskLabel) => void
  resetDemo: () => void
}

const DemoWorkspaceContext = createContext<DemoWorkspaceContextValue | undefined>(undefined)

function createInitialState(): DemoWorkspaceState {
  const org: Organization = {
    id: DEMO_ORGANIZATION.id,
    name: DEMO_ORGANIZATION.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const project: Project = {
    id: DEMO_PROJECT.id,
    name: DEMO_PROJECT.name,
    description: DEMO_PROJECT.description,
    organizationId: org.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return {
    organization: org,
    projects: [project],
    currentProject: project,
    board: JSON.parse(JSON.stringify(DEMO_BOARD)),
    labels: DEMO_LABELS,
    members: DEMO_MEMBERS,
    activity: [],
  }
}

export function DemoWorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoWorkspaceState>(createInitialState())
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setState(parsed)
      }
    } catch (e) {
      console.error('Failed to load demo workspace from storage:', e)
    } finally {
      setHydrated(true)
    }
  }, [])

  // Persist state to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error('Failed to save demo workspace to storage:', e)
    }
  }, [state, hydrated])

  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setState((prev) => {
        const newState = JSON.parse(JSON.stringify(prev)) as DemoWorkspaceState
        let found = false

        for (const status in newState.board) {
          const tasks = newState.board[status as keyof Board]
          const taskIndex = tasks.findIndex((t) => t.id === taskId)
          if (taskIndex !== -1) {
            newState.board[status as keyof Board][taskIndex] = {
              ...newState.board[status as keyof Board][taskIndex],
              ...updates,
              updatedAt: new Date().toISOString(),
            }
            found = true
            break
          }
        }

        return found ? newState : prev
      })
    },
    [],
  )

  const deleteTask = useCallback((taskId: string) => {
    setState((prev) => {
      const newState = JSON.parse(JSON.stringify(prev)) as DemoWorkspaceState
      let found = false

      for (const status in newState.board) {
        const tasks = newState.board[status as keyof Board]
        const taskIndex = tasks.findIndex((t) => t.id === taskId)
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1)
          found = true
          break
        }
      }

      return found ? newState : prev
    })
  }, [])

  const addTask = useCallback((task: Task) => {
    setState((prev) => {
      const newState = JSON.parse(JSON.stringify(prev)) as DemoWorkspaceState
      const status = task.status as keyof Board
      newState.board[status].push(task)
      return newState
    })
  }, [])

  const moveTask = useCallback(
    (taskId: string, targetStatus: keyof Board, position?: number) => {
      setState((prev) => {
        const newState = JSON.parse(JSON.stringify(prev)) as DemoWorkspaceState
        let task: Task | null = null

        // Find and remove from current column
        for (const status in newState.board) {
          const tasks = newState.board[status as keyof Board]
          const taskIndex = tasks.findIndex((t) => t.id === taskId)
          if (taskIndex !== -1) {
            task = tasks[taskIndex]
            tasks.splice(taskIndex, 1)
            break
          }
        }

        if (!task) return prev

        // Update status and add to target column
        task.status = targetStatus as any
        const targetTasks = newState.board[targetStatus]
        if (position !== undefined) {
          targetTasks.splice(position, 0, task)
        } else {
          targetTasks.push(task)
        }

        // Re-normalize positions
        for (const status in newState.board) {
          newState.board[status as keyof Board].forEach((t, idx) => {
            t.position = idx
          })
        }

        return newState
      })
    },
    [],
  )

  const createLabel = useCallback((label: TaskLabel) => {
    setState((prev) => ({
      ...prev,
      labels: [...prev.labels, label],
    }))
  }, [])

  const resetDemo = useCallback(() => {
    const org: Organization = {
      id: DEMO_ORGANIZATION.id,
      name: DEMO_ORGANIZATION.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const project: Project = {
      id: DEMO_PROJECT.id,
      name: DEMO_PROJECT.name,
      description: DEMO_PROJECT.description,
      organizationId: org.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setState({
      organization: org,
      projects: [project],
      currentProject: project,
      board: JSON.parse(JSON.stringify(DEMO_BOARD)),
      labels: DEMO_LABELS,
      members: DEMO_MEMBERS,
      activity: [],
    })

    localStorage.removeItem(DEMO_STORAGE_KEY)
  }, [])

  return (
    <DemoWorkspaceContext.Provider
      value={{
        organization: state.organization,
        projects: state.projects,
        currentProject: state.currentProject,
        board: state.board,
        labels: state.labels,
        members: state.members,
        activity: state.activity,
        updateTask,
        deleteTask,
        addTask,
        moveTask,
        createLabel,
        resetDemo,
      }}
    >
      {children}
    </DemoWorkspaceContext.Provider>
  )
}

export function useDemoWorkspace(): DemoWorkspaceContextValue {
  const context = useContext(DemoWorkspaceContext)
  if (!context) {
    throw new Error('useDemoWorkspace must be used within DemoWorkspaceProvider')
  }
  return context
}

export function useDemoWorkspaceOptional(): DemoWorkspaceContextValue | undefined {
  return useContext(DemoWorkspaceContext)
}
