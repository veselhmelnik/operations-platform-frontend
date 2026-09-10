'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { Board, OrganizationMember, Task } from '@/app/types'
import { TaskLabel } from '@/app/types/task'
import {
  DEMO_BOARD,
  DEMO_MEMBERS,
  DEMO_LABELS,
  DEMO_ORGANIZATION,
  DEMO_PROJECT,
} from './mock-data'

type DemoContextType = {
  isDemo: true
  board: Board
  members: OrganizationMember[]
  labels: TaskLabel[]
  updateBoard: (board: Board) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  deleteTask: (taskId: string) => void
  addTask: (task: Task) => void
  reset: () => void
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [board, setBoard] = useState<Board>(
    JSON.parse(JSON.stringify(DEMO_BOARD)),
  )
  const [members] = useState<OrganizationMember[]>(DEMO_MEMBERS)
  const [labels] = useState<TaskLabel[]>(DEMO_LABELS)

  const updateBoard = useCallback((newBoard: Board) => {
    setBoard(JSON.parse(JSON.stringify(newBoard)))
  }, [])

  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setBoard((prev) => {
        const newBoard = JSON.parse(JSON.stringify(prev)) as Board
        for (const status in newBoard) {
          const tasks = newBoard[status as keyof Board]
          const taskIndex = tasks.findIndex((t) => t.id === taskId)
          if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
            return newBoard
          }
        }
        return prev
      })
    },
    [],
  )

  const deleteTask = useCallback((taskId: string) => {
    setBoard((prev) => {
      const newBoard = JSON.parse(JSON.stringify(prev)) as Board
      for (const status in newBoard) {
        const tasks = newBoard[status as keyof Board]
        const taskIndex = tasks.findIndex((t) => t.id === taskId)
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1)
          return newBoard
        }
      }
      return prev
    })
  }, [])

  const addTask = useCallback((task: Task) => {
    setBoard((prev) => {
      const newBoard = JSON.parse(JSON.stringify(prev)) as Board
      const status = task.status as keyof Board
      newBoard[status].push(task)
      return newBoard
    })
  }, [])

  const reset = useCallback(() => {
    setBoard(JSON.parse(JSON.stringify(DEMO_BOARD)))
  }, [])

  return (
    <DemoContext.Provider
      value={{
        isDemo: true,
        board,
        members,
        labels,
        updateBoard,
        updateTask,
        deleteTask,
        addTask,
        reset,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemoMode(): DemoContextType {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error('useDemoMode must be used within DemoModeProvider')
  }
  return context
}

export function useDemoModeOptional(): DemoContextType | undefined {
  return useContext(DemoContext)
}
